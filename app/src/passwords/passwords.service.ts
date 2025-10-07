import {BadRequestException, Injectable, Inject, NotFoundException} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm'
import { Credential } from './entities/passwords.entity'
import { AddCredentialDTO, UpdateCredentialDTO } from './schemas/passwords.dto'
import { CryptoService } from "../common/crypto/crypto.service";
import { CRYPTO_KEY } from "../common/crypto/crypto.constants";

@Injectable()
export class PasswordsService {

    constructor(
        @InjectRepository(Credential)
        private CredRepository: Repository<Credential>,
        private readonly crypto: CryptoService,
        @Inject(CRYPTO_KEY) private readonly key: Buffer
    ) {}

    async findAll(filters?: { application?: string; }): Promise<Credential[] | null> {
        const where: any = {}

        if (filters?.application) {
            where.application = filters.application;
        }

        const credentials = await this.CredRepository.find(where);

        for (let c of credentials) {
            c.password = this.crypto.decryptData(c.password, this.key)
        }

        return credentials;
    }

    async findOne(app: string): Promise<Credential | null> {
        return this.CredRepository.findOneBy({ application: app})
    }

    async create(createCredential: AddCredentialDTO): Promise<Credential> {
        const alreadyExist = await this.findOne(createCredential.application);

        if (alreadyExist !== null) {
            throw new BadRequestException(`A password already exists for this application.`)
        }

        createCredential.password = this.crypto.encryptData(createCredential.password, this.key)

        const credential = this.CredRepository.create(createCredential)
        return await this.CredRepository.save(credential)
    }

    async update(app: string, updateCredential: UpdateCredentialDTO): Promise<Credential> {
        const credential = await this.findOne(app);

        if (credential === null) {
            throw new NotFoundException('Password not found.')
        }

        if (updateCredential.password !== undefined) {
            updateCredential.password = this.crypto.encryptData(updateCredential.password, this.key)
        }

        console.log(`fields: ${JSON.stringify(updateCredential)}`)
        Object.assign(credential, updateCredential)
        return await this.CredRepository.save(credential)

    }

    async delete(app: string) {
        await this.CredRepository.delete({application: app})
        return {status: 'success', message: 'Password deleted successfully.'};
    }

}
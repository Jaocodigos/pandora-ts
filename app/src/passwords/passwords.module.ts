import { Module } from '@nestjs/common';
import { PasswordsController } from './passwords.controller';
import { PasswordsService } from './passwords.service';
import {TypeOrmModule} from "@nestjs/typeorm";
import { Credential } from './entities/passwords.entity';

@Module({
    imports: [TypeOrmModule.forFeature([Credential])],
    controllers: [PasswordsController],
    providers: [PasswordsService],
})
export class PasswordsModule {}
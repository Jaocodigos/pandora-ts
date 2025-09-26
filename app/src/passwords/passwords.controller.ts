import {Controller, Get, Post, Body, Query, Put, Delete, Param} from '@nestjs/common';
import { PasswordsService } from './passwords.service'


import {AddCredentialDTO, UpdateCredentialDTO} from './schemas/passwords.dto'

@Controller('api/passwords')
export class PasswordsController {
    constructor(private readonly passwordService: PasswordsService) {}


    @Get()
    getCredentials(@Query('app') app: string) {
        return this.passwordService.findAll();
    }

    @Get(':app')
    getOne(@Param('app') app: string) {
        return this.passwordService.findOne(app)
    }

    @Post()
    newCredential(@Body() credentialDTO: AddCredentialDTO) {
        return this.passwordService.create(credentialDTO)
    }

    @Put(':app')
    updateCredential(@Param('app') app: string, @Body() credentialDTO: UpdateCredentialDTO) {
        return this.passwordService.update(app, credentialDTO)
    }

    @Delete(':app')
    eraseCredential(@Param('app') app: string) {
        return this.passwordService.delete(app)
    }

}

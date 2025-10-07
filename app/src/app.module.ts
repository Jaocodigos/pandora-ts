import {Module} from '@nestjs/common';
import {PasswordsModule} from './passwords/passwords.module';
import {TypeOrmModule} from '@nestjs/typeorm';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { CryptoModule} from "./common/crypto/crypto.module";


@Module({
    imports: [
        ConfigModule.forRoot({
            isGlobal: true,
        }),
        TypeOrmModule.forRootAsync({
            imports: [ConfigModule],
            inject: [ConfigService],
            useFactory: (configService: ConfigService) => ({
                type: configService.get<'postgres' | 'mysql'>('DB_TYPE', 'postgres'),
                host: configService.get<string>('DB_HOST', '127.0.0.1'),
                port: configService.get<number>('DB_PORT', 5432),
                username: configService.get<string>('DB_USER', 'admin'),
                password: configService.get<string>('DB_PASSWORD', 'admin'),
                database: configService.get<string>('DB_NAME', 'pandora'),
                entities: [__dirname + '/**/*.entity{.ts,.js}'],
                synchronize: true,
            }),
        }),
        PasswordsModule,
        CryptoModule,
    ],
})

export class AppModule {}

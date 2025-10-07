
import { Provider } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { CRYPTO_KEY } from "./crypto.constants";

export const CryptoProviders: Provider[] = [
    {
        provide: CRYPTO_KEY,
        inject: [ConfigService],
        useFactory: (config: ConfigService) => {
            const keyHex = config.get<string>('CRYPTO_KEY_HEX');
            if (!keyHex) throw new Error('CRYPTO_KEY_HEX must be defined.');
            const key = Buffer.from(keyHex, 'hex');
            console.log(`KEY: ${key} --- LENGTH: ${key.length}`)
            if (key.length !== 32) throw new Error('CRYPTO_KEY_HEX must contain 32 chars (64 hex chars) for AES-256.');
            return key;
        },
    },
];
import { Injectable, Inject, Optional } from '@nestjs/common';
import * as crypto from 'node:crypto';
import { CRYPTO_KEY } from "./crypto.constants";

const IV_LEN = 12;      // 96 bits
const TAG_LEN = 16;     // 128 bits

@Injectable()
export class CryptoService {
    constructor(
        @Optional() @Inject(CRYPTO_KEY) private readonly key?: Buffer,
    ) {}



    randomBytes(size = 32): Buffer {
        return crypto.randomBytes(size);
    }

    encryptData(plaintext: string, key: Buffer): string {
        if (key.length !== 32) throw new Error('key must be 32 bytes (AES-256)');
        const iv = crypto.randomBytes(IV_LEN);
        const cipher = crypto.createCipheriv('aes-256-gcm', key, iv);
        const ciphertext = Buffer.concat([cipher.update(plaintext, 'utf8'), cipher.final()]);
        const authTag = cipher.getAuthTag();
        const payload = Buffer.concat([iv, authTag, ciphertext]); // 12 + 16 + N
        return payload.toString('base64');
    }

    decryptData(compactB64: string, key: Buffer): string {
        if (key.length !== 32) throw new Error('key must be 32 bytes (AES-256)');
        const payload = Buffer.from(compactB64, 'base64');
        if (payload.length < IV_LEN + TAG_LEN) throw new Error('payload too short');
        const iv = payload.subarray(0, IV_LEN);
        const authTag = payload.subarray(IV_LEN, IV_LEN + TAG_LEN);
        const ciphertext = payload.subarray(IV_LEN + TAG_LEN);
        const decipher = crypto.createDecipheriv('aes-256-gcm', key, iv);
        decipher.setAuthTag(authTag);
        const plaintext = Buffer.concat([decipher.update(ciphertext), decipher.final()]);
        return plaintext.toString('utf8');
    }
}
import { Global, Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { CryptoService } from './crypto.service';
import { CryptoProviders} from "./crypto.providers";

@Global()
@Module({
    imports: [
        ConfigModule, // for envs
    ],
    providers: [
        CryptoService, ...CryptoProviders
    ],
    exports: [
        CryptoService, ...CryptoProviders
    ],
})
export class CryptoModule {}
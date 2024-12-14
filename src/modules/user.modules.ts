import { Module } from '@nestjs/common';
import { UsersController } from '../controllers/Users';

@Module({
    controllers: [UsersController],
})
export class UserModule {}
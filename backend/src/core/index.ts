import { UsersModule } from '@/core/users/users.module';
import { AuthModule } from '@/core/auth/auth.module';
import { Module } from '@nestjs/common';

@Module({
  imports: [UsersModule, AuthModule],
})
export class CoreModule {}

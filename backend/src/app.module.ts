import { Module } from '@nestjs/common';
import { MatchesModule } from './matches/matches.module';
import { UsersModule } from './users/users.module';

@Module({
  imports: [MatchesModule, UsersModule],
})
export class AppModule {}

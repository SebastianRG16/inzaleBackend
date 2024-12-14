import { Module } from '@nestjs/common';
import { UserService } from './services/users.services';
import { AuthService } from './services/auth.services';
import { UsersController } from './controllers/Users';
import { firebaseAdmin } from './config/firebase.setup';
import { MoviesController } from './controllers/tmdb.controllers';
import { TMDBService } from './services/tmdb.services';
import { TMDBModule } from './modules/tmdb.modules';

@Module({
  imports: [
    TMDBModule,
  ],
  controllers: [UsersController, MoviesController],
  providers: [UserService, AuthService, firebaseAdmin, TMDBService],
})
export class AppModule {}

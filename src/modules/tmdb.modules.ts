import { Module } from '@nestjs/common';
import { HttpModule} from '@nestjs/axios';
import { TMDBService } from '../services/tmdb.services';

@Module({
  imports: [HttpModule.registerAsync({
    useFactory: () => ({
      baseURL: 'https://api.themoviedb.org/3',
      params: {
        api_key: "7cfa7c89b397a4317267fdff6c61f975",
      },
    }),
  })],
  providers: [TMDBService],
  exports: [TMDBService, HttpModule],
})
export class TMDBModule {}

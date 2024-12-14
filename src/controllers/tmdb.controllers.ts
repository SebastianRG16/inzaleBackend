import { Controller, Get, Query } from '@nestjs/common';
import { TMDBService } from '../services/tmdb.services';

@Controller('movies')
export class MoviesController {
  constructor(private readonly tmdbService: TMDBService) {}

  @Get('popular')
  async getPopularMovies() {
    try {
      return await this.tmdbService.getPopularMovies();
    } catch (error) {
      return { error: 'Error fetching popular movies', details: error.message };
    }
  }
  
  @Get('id')
  async getMovieById(@Query('movieId') movieId?: string) {
    try {
      const id = Number(movieId); // Convertir a número
      if (isNaN(id)) {
        throw new Error('Invalid movieId');
      }
      return await this.tmdbService.getMovieById(id);
    } catch (error) {
      return { error: 'Error fetching movie by ID', details: error.message };
    }
  }

  @Get('popular/random')
  async getRandomPopularMovie() {
    return this.tmdbService.getRandomPopularMovie();
  }

  @Get('search')
  async searchMovies(
    @Query('title') title?: string,
    @Query('genre') genre?: string,
    @Query('category') category?: string,
  ) {
    console.log('Search criteria:', { title, genre, category });
    try {
      return await this.tmdbService.searchMovies({ title, genre, category });
    } catch (error) {
      return { error: 'Error searching movies', details: error.message };
    }
  }
}

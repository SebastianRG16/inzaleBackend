import { Injectable } from '@nestjs/common';
import { HttpService } from '@nestjs/axios';
import { firstValueFrom } from 'rxjs';

@Injectable()
export class TMDBService {
  constructor(private readonly httpService: HttpService) {}

  async getPopularMovies(): Promise<any> {
    try {
      const response = await firstValueFrom(
        this.httpService.get('/movie/popular'),
      );
      return response.data;
    } catch (error) {
      console.error('TMDB API Error:', error.response?.data || error.message);
      throw new Error('Error fetching popular movies');
    }
  }
  
  async getMovieById(movieId: number): Promise<any> {
    try {
      const response = await firstValueFrom(
        this.httpService.get(`/movie/${movieId}`)
      );
      return response.data;
    } catch (error) {
      console.error('TMDB API Error:', error.response?.data || error.message);
      throw new Error(`Error fetching movie with ID: ${movieId}`);
    }
  }

  async getRandomPopularMovie(): Promise<any> {
    try {
      const popularMovies = await this.getPopularMovies();
      const movies = popularMovies?.results || [];
      if (movies.length === 0) {
        throw new Error('No popular movies found');
      }
      const randomIndex = Math.floor(Math.random() * movies.length);
      return movies[randomIndex];
    } catch (error) {
      console.error('TMDB API Error:', error.response?.data || error.message);
      throw new Error('Error fetching a random popular movie');
    }
  }

  async searchMovies(criteria: { title?: string; genre?: string; category?: string }): Promise<any> {
    try {
      const params: any = {};

      if (criteria.genre) params.with_genres = criteria.genre;
      if (criteria.title) params.query = criteria.title;

      let endpoint = '/discover/movie'; // Default to discovery

      if (criteria.category) {
        switch (criteria.category) {
          case 'popular':
            endpoint = '/movie/popular?language=en-US&page=1';
            break;
          case 'top_rated':
            endpoint = '/movie/top_rated?language=en-US&page=1';
            break;
          case 'upcoming':
            endpoint = '/movie/upcoming?language=en-US&page=1';
            break;
          case 'now_playing':
            endpoint = '/movie/now_playing?language=en-US&page=1';
            break;
          default:
            throw new Error('Invalid category');
        }
      }

      const response = await firstValueFrom(
        this.httpService.get(endpoint, { params }),
      );
      return response.data;
    } catch (error) {
      console.error('TMDB API Error:', error.response?.data || error.message);
      throw new Error('Error fetching movies by criteria');
    }
  }
  
}

import { Injectable } from '@nestjs/common';
import { SwapiService } from './swapi.service';
import { TranslatorService } from '../translator.service';

@Injectable()
export class FilmService {
  constructor(
    private readonly swapiService: SwapiService,
    private readonly translatorService: TranslatorService,
  ) {}

  async getFilm(filmId: string) {
    try {
      const response = await this.swapiService.getFilm(filmId);
      if (response && response.data) {
        return this.translatorService.translate(response.data);
      }
    } catch (error) {
      console.error(error);
    }
    return null;
  }

  async getFilms() {
    let response;
    try {
      response = await this.swapiService.getFilms();
    } catch (error) {
      response = { data: error.response.data };
    }
    return response.data;
  }
}

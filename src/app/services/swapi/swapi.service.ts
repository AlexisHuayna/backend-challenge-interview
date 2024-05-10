import { Injectable } from '@nestjs/common';
import axios from 'axios';

@Injectable()
export class SwapiService {
  private host = 'http://swapi.dev';

  constructor() {
    this.host = process.env.SWAPI_HOST || this.host;
  }

  async getFilm(filmId: string) {
    const url = `${this.host}/api/films/${filmId}`;

    return await axios.get(url);
  }

  async getFilms() {
    const url = `${this.host}/api/films`;

    return await axios.get(url);
  }
}

import { Module } from '@nestjs/common';
import * as path from 'path';
import { I18nModule } from 'nestjs-i18n';
import { TranslatorService } from './app/services/translator.service';
import { FilmService } from './app/services/swapi/film.service';
import { SwapiService } from './app/services/swapi/swapi.service';
import { CustomerService } from './app/services/customer/customer.service';

@Module({
  imports: [
    I18nModule.forRoot({
      fallbackLanguage: 'es',
      loaderOptions: {
        path: path.join(__dirname, '/i18n/'),
        watch: true,
      },
    }),
  ],
  controllers: [],
  providers: [
    TranslatorService,
    FilmService,
    SwapiService,
    CustomerService,
  ],
})
export class AppModule {}

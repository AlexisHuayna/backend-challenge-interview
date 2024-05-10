import { NestFactory } from '@nestjs/core';
import { Handler, Context, APIGatewayProxyEvent } from 'aws-lambda';
import { AppModule } from 'src/app.module';
import { FilmService } from 'src/app/services/swapi/film.service';
import { TranslatorService } from 'src/app/services/translator.service';

export const handler: Handler = async (event: APIGatewayProxyEvent, context: Context) => {
   const appContext = await NestFactory.createApplicationContext(AppModule);
   const translator = appContext.get(TranslatorService);
 
   const film = await appContext.get(FilmService).getFilms();
 
   return {
     isBase64Encoded: false,
     statusCode: 400,
     headers: {},
     body: JSON.stringify(translator.translate(film)),
   };
};

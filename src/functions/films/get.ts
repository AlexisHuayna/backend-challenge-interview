import { NestFactory } from '@nestjs/core';
import { Handler, Context, APIGatewayProxyEvent } from 'aws-lambda';
import { AppModule } from 'src/app.module';
import { transformHttpResponse } from 'src/app/utils/transformers';
import { FilmService } from 'src/app/services/swapi/film.service';
import { TranslatorService } from 'src/app/services/translator.service';
import { DEFAULT_NOT_FOUND_OBJECT, DEFAULT_NOT_FOUND_STATUS } from 'src/app/utils/constants';

export const handler: Handler = async (
  event: APIGatewayProxyEvent,
  context: Context,
) => {
  let data: Record<string,any> = DEFAULT_NOT_FOUND_OBJECT;
  let statusCode: number = DEFAULT_NOT_FOUND_STATUS;

  const { id } = event.pathParameters;
  const appContext = await NestFactory.createApplicationContext(AppModule);
  const translator = appContext.get(TranslatorService);

  const film = await appContext.get(FilmService).getFilm(id);

  if(film) {
    statusCode = 200;
    data = film;
  }

  return transformHttpResponse(statusCode ,data);
};

import { Injectable } from '@nestjs/common';
import { I18nService } from 'nestjs-i18n';

@Injectable()
export class TranslatorService {
  constructor(private readonly i18n: I18nService) {}

  translate(object: Record<string, any>): Record<string, any> {
    const objectParsed: Record<string, any> = {};

    Object.keys(object).forEach((key: string) => {
      const keyParsed = this.i18n.translate(key, { lang: 'es' }) as string;
      objectParsed[keyParsed] = object[key];
    });

    return objectParsed;
  }
}

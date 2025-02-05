import { Injectable } from '@nestjs/common';
import { I18nService } from 'nestjs-i18n';

@Injectable()
export class AppService {
  constructor(private readonly i18n: I18nService) {}
  getHello(data: any): any {
    return this.i18n.translate(data, { lang: 'es' });
  }
}

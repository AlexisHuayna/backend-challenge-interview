import { NestFactory } from '@nestjs/core';
import { Handler, Context, APIGatewayProxyEvent } from 'aws-lambda';
import { AppModule } from 'src/app.module';
import { CustomerDto } from 'src/app/models/customer.dto';
import { CustomerService } from 'src/app/services/customer/customer.service';
import { CustomerValidator } from 'src/app/services/customer/customer.validator';
import { ERROR_STATUS, SUCCESS_STATUS } from 'src/app/utils/constants';
import { transformHttpResponse } from 'src/app/utils/transformers';

export const handler: Handler = async (event: APIGatewayProxyEvent, context: Context) => {
   let statusCode = SUCCESS_STATUS;
   let data: Record<string,any> = {};

   try {
      const appContext = await NestFactory.createApplicationContext(AppModule);

      const customer = JSON.parse(event.body);
      const customerService = appContext.get(CustomerService);

      await customerService.createCustomer(customer);
   } catch (error) {
      statusCode = ERROR_STATUS;
      data = { error: error.message };
   }

   return transformHttpResponse(statusCode, data);
};

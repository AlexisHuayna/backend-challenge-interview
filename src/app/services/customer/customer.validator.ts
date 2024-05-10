import { Injectable } from '@nestjs/common';
import { CustomerDto } from 'src/app/models/customer.dto';
import { validate } from 'class-validator';

@Injectable()
export class CustomerValidator {
  async validateCustomer(customer: CustomerDto): Promise<void> {
    console.log("here");
    console.log(customer);
    const errors = await validate(customer);
    if (errors.length > 0) {
      const errorMessage = this.buildErrorMessage(errors);
      throw new Error(errorMessage);
    }
  }

  private buildErrorMessage(errors: any[]): string {
    const errorMessages = errors.map((error) => {
      const constraints = error.constraints;
      const property = error.property;
      const messages = Object.values(constraints).join(', ');
      return `${property}: ${messages}`;
    });
    return errorMessages.join('; ');
  }
}

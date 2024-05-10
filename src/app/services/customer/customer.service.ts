import { Injectable } from '@nestjs/common';
import { v4 as uuidv4 } from 'uuid';
import * as AWS from 'aws-sdk';
import { unmarshall } from '@aws-sdk/util-dynamodb';
import { CustomerDto } from 'src/app/models/customer.dto';

const dynamoDB = new AWS.DynamoDB.DocumentClient();

@Injectable()
export class CustomerService {
    private customersTable = process.env.CUSTOMER_TABLE_NAME ?? 'customers';

  constructor(
  ) {}

  async createCustomer(customer: any) {
    customer.id = uuidv4();
    try {
        await dynamoDB.put({
            TableName: this.customersTable,
            Item: customer
        }).promise();
    } catch (error) {
        console.error(error);
    }

    return customer;;
  }

  async getCustomers() {
    let customers = [];
    try {
      const params = {
        TableName: this.customersTable,
      };

      const response = await dynamoDB.scan(params).promise();
      if (response.Items) {
        customers = response.Items.map((item) => unmarshall(item));
      }
    } catch (error) {
      console.error(error);
    }
    return customers;
  }
}

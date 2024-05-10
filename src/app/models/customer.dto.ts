
import { IsString, IsNotEmpty, IsEmail, IsDate, IsIn } from 'class-validator';

export class CustomerDto {
  @IsString()
  @IsNotEmpty()
  name: string;

  @IsString()
  @IsNotEmpty()
  insurance: string;

  @IsDate()
  birthday: Date;

  @IsEmail()
  email: string;

  @IsIn(['male', 'female'])
  gender: 'male' | 'female';
}
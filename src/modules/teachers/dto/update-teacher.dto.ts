import {
  IsEmail,
  IsEnum,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsPhoneNumber,
  IsString,
} from 'class-validator';
import { Status } from 'src/modules/users/dto/create-user.dto';

export class UpdateTeacherDto {
  @IsString()
  @IsNotEmpty()
  fullName?: string;

  @IsString()
  @IsNotEmpty()
  @IsOptional()
  photo?: string;

  @IsString()
  @IsNotEmpty()
  @IsEmail()
  email?: string;

  @IsPhoneNumber()
  phone?: string;

  @IsString()
  @IsNotEmpty()
  password?: string;

  @IsNumber()
  salary?: number;

  @IsString()
  @IsNotEmpty()
  profession?: string;

  @IsNumber()
  branchId?: number;

  @IsEnum(Status)
  status?: Status;
}

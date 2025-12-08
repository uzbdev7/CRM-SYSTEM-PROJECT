import {
  IsEnum,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
} from 'class-validator';
import { Status } from 'src/modules/users/dto/create-user.dto';

export class UpdateBranchDto {
  @IsNumber()
  branchId?: number;

  @IsString()
  @IsNotEmpty()
  name?: string;

  @IsString()
  @IsNotEmpty()
  @IsOptional()
  logoUrl?: string;

  @IsEnum(Status)
  status?: Status;

  @IsString()
  @IsNotEmpty()
  address?: string;
}

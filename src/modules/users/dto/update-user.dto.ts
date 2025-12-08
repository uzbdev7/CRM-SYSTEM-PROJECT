import { IsString, IsNotEmpty, IsOptional, IsEmail, IsPhoneNumber, IsNumber, IsEnum } from 'class-validator';
import { StaffRole, Status } from './create-user.dto'; 

export class UpdateUserDto {
    @IsString()
    @IsNotEmpty()
    @IsOptional()
    fullName?: string;

    @IsString()
    @IsNotEmpty()
    @IsOptional()
    photo?: string;

    @IsString()
    @IsNotEmpty()
    @IsEmail()
    @IsOptional()
    email?: string;

    @IsPhoneNumber()
    @IsOptional()
    phone?: string;

    @IsString()
    @IsNotEmpty()
    @IsOptional()
    password?: string;

    @IsNumber()
    @IsOptional()
    salary?: number;

    @IsEnum(StaffRole)
    @IsOptional()
    role?: StaffRole;

    @IsEnum(Status)
    @IsOptional()
    status?: Status;

    @IsNumber()
    @IsOptional()
    branchId?: number;
}

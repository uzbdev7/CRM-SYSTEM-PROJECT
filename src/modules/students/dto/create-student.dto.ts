import { IsEmail, IsEnum, IsNotEmpty, IsNumber, IsOptional, IsPhoneNumber, IsString } from "class-validator"
import { Status } from "src/modules/users/dto/create-user.dto"

export class CreateStudentDto {
    @IsString()
    @IsNotEmpty()
    fullName : string

    @IsString()
    @IsNotEmpty()
    @IsOptional()
    photo : string

    @IsString()
    @IsNotEmpty()
    @IsEmail()
    email : string

    @IsPhoneNumber()
    phone : string

    @IsString()
    @IsNotEmpty()
    password :string

    @IsEnum(Status)
    status : Status

    @IsNumber()
    branchId: number
    
}

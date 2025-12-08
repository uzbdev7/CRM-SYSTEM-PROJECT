import { IsEmail, IsEnum, IsNotEmpty, IsNumber, IsOptional, IsPhoneNumber, IsString } from "class-validator"

export enum StaffRole {
  ADMIN = 'ADMIN',
  MANAGER = 'MANAGER',
  RECEPTIONIST = 'RECEPTIONIST'
}
export enum Status {
    ACTIVE = 'ACTIVE',
    INACTIVE = 'INACTIVE'  
}



export class CreateUserDto {
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
    
    @IsNumber()
    salary : number
    @IsEnum(StaffRole)
    role : StaffRole
    
    @IsEnum(Status)
    status : Status

    @IsNumber()
    branchId : number

}

import { IsInt, IsNotEmpty, IsOptional, IsString, Min } from 'class-validator';
import { Status } from 'src/modules/users/dto/create-user.dto';


export class CreateRoomDto {
  @IsString()
  @IsNotEmpty()
  name: string;

  @IsInt()
  @Min(1)
  capacity: number;

  @IsInt()
  branchId: number;

  @IsOptional()
  status?: Status; 
}

import { Status } from "src/modules/users/dto/create-user.dto"
import { IsInt, IsString, IsNotEmpty, IsEnum, IsDateString } from 'class-validator';


export class CreateGroupDto {
  @IsInt()
  branchId: number;

  @IsString()
  @IsNotEmpty()
  name: string;

  @IsInt()
  courseId: number;

  @IsInt()
  roomId: number;

  @IsEnum(Status)
  status?: Status;

  @IsDateString()
  startDate: string;

  @IsDateString()
  endDate: string;

  @IsString()
  startLessonTime: string;
}


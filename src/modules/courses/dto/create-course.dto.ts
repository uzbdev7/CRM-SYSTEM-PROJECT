import { IsInt, IsNotEmpty, IsOptional, IsString, IsEnum, IsNumber, Min } from 'class-validator';
import { Status } from 'src/modules/users/dto/create-user.dto';

enum CourseLevel {
  FOUNDATION = 'Foundation',
  INTERMEDIATE = 'INTERMEDIATE',
  ADVANCED = 'ADVANCED'
}

export class CreateCourseDto {
  @IsString()
  @IsNotEmpty()
  name: string;

  @IsNumber()
  @Min(0)
  price: number;

  @IsInt()
  @Min(1)
  durationMonth: number;

  @IsNumber()
  @Min(0)
  durationTime: number;

  @IsEnum(CourseLevel)
  level: CourseLevel;

  @IsInt()
  branchId: number;

  @IsOptional()
  status?: Status;
}

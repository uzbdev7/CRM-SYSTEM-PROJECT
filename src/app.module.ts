import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';

import { UsersModule } from './modules/users/users.module';
import { BranchesModule } from './modules/branches/branches.module';
import { StudentsModule } from './modules/students/students.module';
import { TeachersModule } from './modules/teachers/teachers.module';
import { GroupsModule } from './modules/groups/groups.module';
import { RoomsModule } from './modules/rooms/rooms.module';
import { CoursesModule } from './modules/courses/courses.module';

@Module({
  imports: [
    UsersModule,
    BranchesModule,
    StudentsModule,
    TeachersModule,
    GroupsModule,
    RoomsModule,
    CoursesModule,
  ],
  controllers: [AppController],
  providers: [AppService],

})
export class AppModule {}

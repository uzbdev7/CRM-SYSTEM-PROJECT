import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { CreateGroupDto } from './dto/create-group.dto';
import { UpdateGroupDto } from './dto/update-group.dto';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

@Injectable()
export class GroupsService {
  async create(payload: CreateGroupDto) {
    try {
      const branchExist = await prisma.branch.findUnique({
        where: { id: payload.branchId },
      });

      if (!branchExist) throw new NotFoundException('BranchId not found.');

      const courseExist = await prisma.course.findUnique({
        where: { id: payload.courseId },
      });

      if (!courseExist) throw new NotFoundException('CourseId not found.');

      const roomExist = await prisma.room.findUnique({
        where: { id: payload.roomId },
      });

      if (!roomExist) throw new NotFoundException('RoomId not found.');

      await prisma.group.create({
        data: payload,
      });

      return {
        success: true,
        message: 'Successfully created',
      };
    } catch (error) {
      throw new BadRequestException(error.message || 'failed to create group.');
    }
  }

  async findAll() {
    try {
      return await prisma.group.findMany();
    } catch (error) {
      throw new NotFoundException('Groups not found.');
    }
  }

  async findOne(id: number) {
    try {
      const groupExist = await prisma.group.findUnique({
        where: { id },
      });

      if (!groupExist) throw new NotFoundException('Group not found.');

      return {
        success: true,
        data: groupExist,
      };
    } catch (error) {
      throw new BadRequestException(error.message || 'failed to get group');
    }
  }

  async update(id: number, payload: UpdateGroupDto) {
    try {
      const groupExist = await prisma.group.findUnique({
        where: { id },
      });
      if (!groupExist) throw new NotFoundException('Group not found.');

      if (payload.branchId) {
        const branchExist = await prisma.branch.findUnique({
          where: { id: payload.branchId },
        });
        if (!branchExist) throw new NotFoundException('Branch not found.');
      }

      if (payload.courseId) {
        const courseExist = await prisma.course.findUnique({
          where: { id: payload.courseId },
        });
        if (!courseExist) throw new NotFoundException('Course not found.');
      }

      if (payload.roomId) {
        const roomExist = await prisma.room.findUnique({
          where: { id: payload.roomId },
        });
        if (!roomExist) throw new NotFoundException('Room not found.');
      }

      const updated = await prisma.group.update({
        where: { id },
        data: payload,
      });

      return {
        success: true,
        message: 'Group updated successfully',
        data: updated,
      };
    } catch (error) {
      console.error(error);
      throw new BadRequestException(error.message || 'Failed to update group');
    }
  }

  async remove(id: number) {
    try {
      const groupExist = await prisma.group.findUnique({
        where: { id },
      });

      if (!groupExist) throw new NotFoundException('Group not found.');

      return await prisma.group.delete({
        where: { id },
      });
    } catch (error) {
      throw new BadRequestException(error.message || 'Failed to delete.');
    }
  }
}

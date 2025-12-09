import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient()

@Injectable()
export class UsersService {
  async create(payload: CreateUserDto) {
    try {
      await prisma.staff.create({
        data: payload,
      });
      return 'Staff created successfully';
    } catch (error) {
      throw new BadRequestException(error);
    }
  }

  async findAll() {
    try {
      return await prisma.staff.findMany();
    } catch (error) {
      throw new BadRequestException(error);
    }
  }

  async findOne(id: number) {
    try {
      return await prisma.staff.findUnique({
        where: {id},
        select: {
          id:true,
          fullName:true,
          photo:true,
          phone:true,
          email:true,
          salary:true,
          status:true,
          branchId:true,
        },
      });
      
    } catch (error) {
      throw new BadRequestException('Failed to get user');
    }
  }

  async update(id: number, payload: UpdateUserDto) {
    try {
      const userExist = await prisma.staff.findUnique({
        where: { id },
      });

      if (!userExist) throw new NotFoundException('staff not found');

      const updatedUser = await prisma.staff.update({
        where: { id },
        data: payload,
      });
      
      return { 
        success:true,
        message: 'Staff updated successfully',
        data: updatedUser 
      };

    } catch (error) {
      throw new BadRequestException('Failed to update user');
    }
  }

  async remove(id: number) {
    try {
      const userExist = await prisma.staff.findUnique({ where: { id } });
      if (!userExist) throw new NotFoundException('user not found');
      return await prisma.staff.delete({
        where: { id },
      });
    } catch (error) {
      throw new BadRequestException('Failed to delete user');
    }
  }
}

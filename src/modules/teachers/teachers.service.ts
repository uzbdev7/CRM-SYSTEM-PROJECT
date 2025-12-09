import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { CreateTeacherDto } from './dto/create-teacher.dto';
import { UpdateTeacherDto } from './dto/update-teacher.dto';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient()

@Injectable()
export class TeachersService {
  async create(payload: CreateTeacherDto) {
    try {
      
      await prisma.teacher.create({
        data: payload
      });

      return {message:'Teacher created successfully'}
      
    } catch (error) {
      throw new BadRequestException('Failed to create teacher.')
    }
  }

  async findAll() {
    try {
      return await prisma.teacher.findMany()
    } catch (error) {
      throw new BadRequestException(error)
    }
  }

  async findOne(id: number) {
    try {
      const teacherExist = await prisma.teacher.findUnique({
        where: { id },
        select: {
          id: true,
          fullName: true,
          photo: true,
          phone: true,
          email: true,
          branchId: true,
          profession: true,
          salary: true,
          status: true,
          createdAt:true
        }
      })

      if(!teacherExist) throw new NotFoundException('Teacher not found.')
      
        return {message:"All teachers", data: teacherExist};
    } catch (error) {
      throw new BadRequestException('Failed to get teacher')
    }
  }

  async update(id: number, payload: UpdateTeacherDto) {
    try {
      const teacherExist = await prisma.teacher.findUnique({
        where: { id }
      })

      if(!teacherExist) throw new NotFoundException('Teacher not found')
      
        const updated = await prisma.teacher.update({
          where: { id },
          data: payload
        })

        return {
          success: true,
          message: 'Successfully updated',
          data: updated
        }

    } catch (error) {
      throw new BadRequestException('Failed to update teacher.')
    }
  }

  async remove(id: number) {
    try {
      const teacherExist = await prisma.teacher.findUnique({
        where: { id }
      })
      if(!teacherExist) throw new NotFoundException('Teacher id not found')

      return await prisma.teacher.delete({
        where: {id}
      });

    } catch (error) {
      throw new BadRequestException('Failed to delete teacher.')
    }
  }
}

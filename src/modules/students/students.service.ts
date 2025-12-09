import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { CreateStudentDto } from './dto/create-student.dto';
import { UpdateStudentDto } from './dto/update-student.dto';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient()

@Injectable()
export class StudentsService {
  async create(payload: CreateStudentDto) {
      try {
        
        await prisma.student.create({
          data: payload
        });
  
        return {
          success:true,
          message:'Student created successfully'
        }
        
      } catch (error) {
        throw new BadRequestException('Failed to create student.')
      }
    }
  
    async findAll() {
      try {
        return await prisma.student.findMany()
      } catch (error) {
        throw new BadRequestException(error)
      }
    }
  
    async findOne(id: number) {
      try {
        const studentExist = await prisma.student.findUnique({
          where: { id },
          select: {
            id: true,
            fullName: true,
            photo: true,
            phone: true,
            email: true,
            branchId: true,
            status: true,
            createdAt:true
          }
        })
  
        if(!studentExist) throw new NotFoundException('student not found.')
        
          return {
            success: true,
            message:"All teachers",
             data: studentExist
            };

      } catch (error) {
        throw new BadRequestException('Failed to get teacher')
      }
    }
  
    async update(id: number, payload: UpdateStudentDto) {
      try {
        const studentExist = await prisma.teacher.findUnique({
          where: { id }
        })
  
        if(!studentExist) throw new NotFoundException('student not found')
        
          const updated = await prisma.student.update({
            where: { id },
            data: payload
          })
  
          return {
            success: true,
            message: 'Successfully updated',
            data: updated
          }
  
      } catch (error) {
        throw new BadRequestException('Failed to update student.')
      }
    }
  
    async remove(id: number) {
      try {
        const studentExist = await prisma.student.findUnique({
          where: { id }
        })
        if(!studentExist) throw new NotFoundException('student id not found')
  
        return await prisma.student.delete({
          where: {id}
        });
  
      } catch (error) {
        throw new BadRequestException('Failed to delete student.')
      }
    }
}

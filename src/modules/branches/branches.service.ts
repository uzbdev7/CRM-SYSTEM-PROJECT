import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { PrismaClient } from '@prisma/client';
import { CreateBranchDto } from './dto/create-branch.dto';
import { UpdateBranchDto } from './dto/update-branch.dto';

const prisma = new PrismaClient()

@Injectable()
export class BranchesService {
  async create(payload: CreateBranchDto) {
    try {
      await prisma.branch.create({
        data: payload
      })
      return 'Branch created successfully';
      
    } catch (error) {
      throw new BadRequestException(error)
      
    }
  }

  async findAll() {
    try {
      return await prisma.branch.findMany();
    } catch (error) {
      throw new BadRequestException(error)
    }
  }

  async findOne(id: number) {
    try {
      const branchExist = await prisma.branch.findUnique({
        where: { id }
      })

      if(!branchExist) throw new NotFoundException('Branch not found')

      return {message:'Branch', data: branchExist};

    } catch (error) {
      throw new BadRequestException('Failed to get branch.')

    }
  }

  async update(id: number, payload: UpdateBranchDto) {
    try {
      const branchExist = await prisma.branch.findUnique({
         where: { id }
       })
 
       if(!branchExist) throw new NotFoundException('Branch not found')
 
     const updatedBranch = await prisma.branch.update({
       where: { id },
       data: payload
     });
     return {message: "Branch updated successfully", branch: updatedBranch}
      
    } catch (error) {
      throw new BadRequestException('Failed to update branch')
    }
  }

  async remove(id: number) {
    try {
      const branchExist = await prisma.branch.findUnique({
        where: { id }})

      if(!branchExist) throw new NotFoundException('Faield to delete branch');

      return await prisma.branch.delete({
        where: { id },
      });
    } catch (error) {
      throw new BadRequestException('Failed to delete branch.')
    }
  }
}

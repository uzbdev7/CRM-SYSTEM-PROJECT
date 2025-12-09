import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { PrismaClient } from '@prisma/client';
import * as bcrypt from 'bcrypt';
import * as jwt from 'jsonwebtoken';
import { MailerService } from '../../common/mailer/mailer.service';
import { otpStore } from '../../common/otp.store';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';

const prisma = new PrismaClient();

@Injectable()
export class UsersService {
  constructor(private mailerService: MailerService) {}

  async create(payload: CreateUserDto) {
    try {
      const hashed = await bcrypt.hash(payload.password, 10);

      const user = await prisma.staff.create({
        data: {
          ...payload,
          password: hashed,
          status: 'INACTIVE',
        },
      });

      const otp = String(Math.floor(100000 + Math.random() * 900000));
      const expire = Date.now() + 5 * 60 * 1000; 
      otpStore.set(payload.email, { otp, expire });

      await this.mailerService.sendOtpEmail(payload.email, payload.email, otp);

      return { message: 'Staff created successfully. OTP yuborildi emailga.' };
    } catch (error) {
      throw new BadRequestException(error);
    }
  }

  async verifyOtp(email: string, otp: string) {
    const otpData = otpStore.get(email);
    if (!otpData) throw new BadRequestException('OTP topilmadi yoki muddati tugagan');
    if (otpData.otp !== otp) throw new BadRequestException('OTP notogri');
    if (otpData.expire < Date.now()) throw new BadRequestException('OTP muddati tugagan');


    await prisma.staff.update({
      where: { email },
      data: { status: 'ACTIVE' },
    });

    otpStore.delete(email);
    return { message: 'Email tasdiqlandi, endi login qilishingiz mumkin' };
  }

  async login(email: string, password: string, res: any) {
    const user = await prisma.staff.findUnique({ where: { email } });
    if (!user) throw new NotFoundException('User not found');
    if (user.status !== 'ACTIVE') throw new BadRequestException('User not verified yet');

    const match = await bcrypt.compare(password, user.password);
    if (!match) throw new BadRequestException('Password incorrect');

    const payload = { id: user.id, email: user.email, role: user.role };
    const token = jwt.sign(payload, process.env.JWT_ACCESS_SECRET || 'secretKey', { expiresIn: '1h' });

    res.cookie('accessToken', token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      maxAge: 60 * 60 * 1000, 
    });

    return { message: 'Login successful' };
  }

  async getAllStaffProfile() {
    try {
      return await prisma.staff.findMany({
        select: {
          id: true,
          fullName: true,
          photo: true,
          phone: true,
          email: true,
          salary: true,
          status: true,
          role: true,
          branchId: true,
        },
      });
    } catch (error) {
      throw new BadRequestException(error);
    }
  }

async getProfile(userId: number) {
  try {
    const user = await prisma.staff.findUnique({
      where: { id: userId },
      select: {
        id: true,
        fullName: true,
        photo: true,
        phone: true,
        email: true,
        salary: true,
        status: true,
        role: true,
        branchId: true,
      },
    });
    if (!user) throw new NotFoundException('User not found');
    return user;
  } catch (error) {
    throw new BadRequestException('Failed to get profile');
  }
}

async update(id: number, payload: UpdateUserDto, currentUser: any) {
  try {
    const userExist = await prisma.staff.findUnique({ where: { id } });
    if (!userExist) throw new NotFoundException('staff not found');

    if (currentUser.role !== 'ADMIN' && currentUser.id !== id) {
      throw new BadRequestException('Siz faqat o‘zingizni yangilashingiz mumkin');
    }

    const updatedUser = await prisma.staff.update({ where: { id }, data: payload });

    return { success: true, message: 'Staff updated successfully', data: updatedUser };
  } catch (error) {
    throw new BadRequestException('Failed to update user');
  }
}

async remove(id: number, currentUser: any) {
  try {
    const userExist = await prisma.staff.findUnique({ where: { id } });
    if (!userExist) throw new NotFoundException('user not found');


    if (currentUser.role !== 'ADMIN' && currentUser.id !== id) {
      throw new BadRequestException('Siz faqat o‘zingizni ochirishingiz mumkin');
    }

    return await prisma.staff.delete({ where: { id } });
  } catch (error) {
    throw new BadRequestException('Failed to delete user');
  }
}

}

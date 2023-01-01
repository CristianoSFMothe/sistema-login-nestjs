import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import * as bcrypt from 'bcrypt';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class UserService {
  constructor(private readonly prisma: PrismaService) {}
  async create(createUserDto: CreateUserDto) {
    const data = {
      ...createUserDto,
      password: await bcrypt.hash(createUserDto.password, 10),
    };

    const createdUser = await this.prisma.user.create({ data });

    return {
      data: {
        ...createdUser,
        password: undefined,
      },
    };
  }

  async findByEmail(email: string) {
    const emailExisting = this.prisma.user.findFirst({
      where: { email },
    });

    if (!emailExisting) {
      throw new NotFoundException('Email not found');
    }
    return this.prisma.user.findFirst({
      select: {
        email: true,
        name: true,
      },
      where: { email },
    });
  }
}

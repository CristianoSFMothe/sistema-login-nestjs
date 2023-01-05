import { HttpStatus, Injectable, NotFoundException } from '@nestjs/common';
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

    const emailExists = await this.prisma.user.findFirst({
      where: {
        email: data.email,
      },
    });

    if (emailExists) {
      throw new NotFoundException('Email/user already exists');
    }

    const createdUser = await this.prisma.user.create({ data });

    return {
      data: {
        ...createdUser,
        password: undefined,
      },
    };
  }

  async findAll() {
    const users = await this.prisma.user.findMany({
      select: {
        id: true,
        name: true,
        email: true,
        createdAt: true,
        updatedAt: true,
      },
    });

    return {
      users,
    };
  }

  async findByEmail(email: string) {
    const user = await this.prisma.user.findFirst({
      select: {
        name: true,
        email: true,
      },
      where: { email: email },
    });

    if (!email) {
      throw new NotFoundException('não encontrou usuario com o email');
    }

    console.log(user);

    return user;
  }
}

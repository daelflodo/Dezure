import { Injectable, NotFoundException } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import * as bcrypt from "bcrypt";

import { CreateUserDto } from "./dto/create-user.dto";
import { UpdateUserDto } from "./dto/update-user.dto";
import { User } from "./entities/user.entity";
import { IUser } from "src/common/interfaces/user.interface";
import { createCustomException } from "src/utils/exceptionsGenerator";
import { IResponse } from "src/common/interfaces/response.interface.ts";

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
  ) {}

  async create(createUserDto: CreateUserDto): Promise<IUser> {
    try {
      const emailFound = await this.userRepository.findOne({
        where: {
          email: createUserDto.email,
        },
      });
      if (emailFound)
        throw createCustomException("El email ya esta registrado", 409, "User");

      createUserDto.password = await this.hashPassword(createUserDto.password);
      return await this.userRepository.save(createUserDto);
    } catch (error) {
      throw error;
    }
  }

  async findAll(): Promise<IUser[]> {
    const users = await this.userRepository.find({
      relations: ["admin"],
    });

    if (!users) createCustomException("Datos no encontrados", 404, "User");

    return users;
  }

  async findOne(id: string) {
    const user = await this.userRepository.findOne({
      where: { id }
    });
    if (!user) createCustomException("Usuario no encontrados", 404, "User");

    return user;
  }

  async update(id: string, updateUserDto: UpdateUserDto): Promise<IUser> {
    if (!updateUserDto.password)
      throw createCustomException("Missing Data", 400, "User");

    let user = await this.userRepository.findOne({ where: { id } });
    if (!user) throw createCustomException('User Not Found', 404,'User')

    updateUserDto.password = await this.hashPassword(updateUserDto.password)

    await this.userRepository.update(id, updateUserDto);
    user = await this.userRepository.findOne({ where: { id } });
    return user;
  }

  async remove(id: string): Promise<IResponse> {
    const user = await this.userRepository.findOne({
      where: { id },
    });
    if (!user) createCustomException("Usuario no encontrados", 404, "User");

    await this.userRepository.delete(id);

    return {
      message: "Se elimino el usuario exitosamente",
      data: user,
      code: "OK_USER_DELETE",
    };
  }

  async hashPassword(password: string): Promise<string> {
    try {
      const saltRounds = parseInt(process.env.HASH_SALT as string);
      const salt = await bcrypt.genSalt(saltRounds);
      return await bcrypt.hash(password, salt);
    } catch (error) {
      throw error;
    }
  }
}

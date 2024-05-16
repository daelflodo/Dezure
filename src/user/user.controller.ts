import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Delete,
  ParseUUIDPipe,
  UseGuards,
  Put,
} from '@nestjs/common';
import { ApiBearerAuth, ApiOperation, ApiTags } from '@nestjs/swagger';

import { UserService } from './user.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { PublicAccess } from 'src/auth/decorators/public.decorator';
import { AuthGuard } from 'src/auth/guards/auth.guard';
import { Roles } from 'src/auth/decorators/roles.decorator';
import { RolesGuard } from 'src/auth/guards/roles.guard';
import { AdminAccess } from 'src/auth/decorators/admin.decorator';

@ApiTags("User")
@ApiBearerAuth()
@Controller('user')
@UseGuards(AuthGuard, RolesGuard)
export class UserController {
  constructor(private readonly userService: UserService) {}
  
  @AdminAccess()
  @ApiOperation({ summary: 'Crear usuarios' })
  @Post('create')
  create(@Body() createUserDto: CreateUserDto) {
    return this.userService.create(createUserDto);
  }
  
  @AdminAccess()
  @ApiOperation({ summary: 'Obtener todos los usuarios'})
  @Roles('ADMIN')
  @Get('all')
  async findAll() {
    return this.userService.findAll();
  }
  
  @AdminAccess()
  @ApiOperation({ summary: 'Obtener un usuario por id'})
  @PublicAccess()
  @Get(':userId')
  findOne(@Param('userId', ParseUUIDPipe) id: string) {
    return this.userService.findOne(id);
  }
  
  @AdminAccess()
  @ApiOperation({ summary: 'Actualizar un usuario por id'})
  @Put('edit/:userId')
  update(@Param('userId', ParseUUIDPipe) id: string, @Body() updateUserDto: UpdateUserDto) {
    return this.userService.update(id, updateUserDto);
  }
  
  @AdminAccess()
  @ApiOperation({ summary: 'Eliminar un usuario por id'})
  @Delete('delete/:userId')
  remove(@Param('userId', ParseUUIDPipe) id: string) {
    return this.userService.remove(id);
  }
}

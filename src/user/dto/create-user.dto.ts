import {
  IsEmail,
  IsEnum,
  IsNotEmpty,
  IsString,
  IsStrongPassword,
} from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

import { ROLES } from '../../common/constants/roles';

export class CreateUserDto {
  @ApiProperty({ example:'David Elias Flores Dominguez'})
  @IsString()
  readonly fullName: string;
    
  @ApiProperty({
    example: 'daelflodo@gmail.com',
  })
  @IsString()
  @IsNotEmpty()
  @IsEmail()
  readonly email: string;
  
  @ApiProperty({
    example: '#Asd1234',
    description:
      'Mayúscula, minúscula, número, carácter especial, 8 caracteres mínimo y 16 máximo',
  })
  @IsNotEmpty()
  @IsString()
  @IsStrongPassword()
  password: string;
  
  @ApiProperty({enum:['ADMIN', 'EMPLOYEE']})
  @IsNotEmpty()
  @IsEnum(ROLES)
  readonly role: ROLES;
}

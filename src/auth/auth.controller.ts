import { Controller, Post, Body } from "@nestjs/common";
import { ApiOperation, ApiTags } from "@nestjs/swagger";

import { AuthService } from "./auth.service";
import { CreateAuthDto } from "./dto/create-auth.dto";
import { CreateUserDto } from "../user/dto/create-user.dto";
import { UserService } from "src/user/user.service";

@ApiTags("Auth")
@Controller("auth")
export class AuthController {
  constructor(
    private readonly authService: AuthService,
    private readonly userService: UserService,
  ) {}

  @ApiOperation({ summary: "Iniciar session como Admin o employee" })
  @Post("login")
  async login(@Body() createAuthDto: CreateAuthDto) {
    return this.authService.validateUser(createAuthDto);
  }

  @ApiOperation({ summary: "Registrarse como usuario o como Admin" })
  @Post("register")
  async register(@Body() createUserDto: CreateUserDto) {
    return this.userService.create(createUserDto);
  }
}

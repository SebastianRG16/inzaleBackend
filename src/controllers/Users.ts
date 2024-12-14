import { Body, Controller, HttpCode, Post } from "@nestjs/common";
import { UserLoginParams } from "src/models/user";
import { UserService } from "src/services/users.services";
import { AuthService } from "src/services/auth.services";

@Controller("usuarios")
export class UsersController {
    constructor(
        private userService : UserService,
        private authService : AuthService
    ) {}

    @Post("crear")
  @HttpCode(200)
  async create(@Body() params: UserLoginParams) {
    const result = await this.userService.create(params.email, params.password);    
    return {
      status: 200,
      message: 'Usuario creado con éxito',
      data: result,
    };
  }

    @Post('login')
    async login(@Body('idToken') idToken: string) {
        try {
          const decodedToken = await this.authService.verifyIdToken(idToken);
          const user = await this.userService.findByUid(decodedToken.uid);
          return { message: 'Login exitoso', user };
        } catch (error) {
          return { message: 'Autenticación fallida', error: error.message };
        }
    }

}
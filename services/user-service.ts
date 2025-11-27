import { LoginDto, LoginReponseDto } from '../src/dto/login.dto'
import { RegisterUserDTO } from '../src/dto/register-user.dto'
import { api } from './api'

export class UserService {
  static registerUser(payload: RegisterUserDTO) {
    return api.post('/users/', payload)
  }

  static async login(payload: LoginDto): Promise<LoginReponseDto> {
    const response = await api.post('/auth/login', payload)

    return response.data
  }
}

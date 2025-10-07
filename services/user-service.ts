import { RegisterUserDTO } from '../src/dto/register-user.dto'
import { api } from './api'

export class UserService {
  static registerUser(payload: RegisterUserDTO) {
    return api.post('/users/', payload)
  }
}

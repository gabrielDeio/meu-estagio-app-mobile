import { LoginDto, LoginReponseDto } from '../src/dto/login.dto'
import { api } from './api'

export class AuthService {
  static async login(payload: LoginDto) {
    try {
      const response = await api.post<LoginReponseDto>('/auth/login', payload)

      return response
    } catch (error) {
      throw new Error('Falha no login')
    }
  }
}

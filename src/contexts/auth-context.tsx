import React, { createContext, useState, useEffect, useContext, ReactNode } from 'react'
import { AuthContextData, AuthData } from '../types/auth'
import { authStorage } from '../../services/auth-storage'
import { api } from '../../services/api'
import { AuthService } from '../../services/auth-service'
import { AccountTypeEnum } from '../dto/register-user.dto'

const AuthContext = createContext<AuthContextData>({} as AuthContextData)

interface AuthProviderProps {
  children: ReactNode
}

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [authData, setAuthData] = useState<AuthData>()
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    loadStorageData()
  }, [])

  async function loadStorageData() {
    try {
      const storedAuth = await authStorage.get()
      if (storedAuth) {
        api.defaults.headers.common['Authorization'] = `Bearer ${storedAuth.token}`
        setAuthData(storedAuth)
      }
    } catch (error) {
      console.error('Erro ao carregar storage', error)
    } finally {
      setIsLoading(false)
    }
  }

  const signIn = async (email: string, password: string, type: AccountTypeEnum) => {
    try {
      const response = await AuthService.login({ email, password, type })
      const { access_token, token_type, user, org_id } = response.data
      const authData = { token: access_token, user, org_id }
      await authStorage.set(authData)

      api.defaults.headers.common['Authorization'] = `${token_type} ${access_token}`

      setAuthData(authData)
    } catch (error) {
      throw new Error('Email ou senha inválidos')
    }
  }

  const signOut = async () => {
    setAuthData(undefined)
    await authStorage.remove()
    delete api.defaults.headers.common['Authorization']
  }

  return (
    <AuthContext.Provider value={{ authData, isLoading, signIn, signOut }}>
      {children}
    </AuthContext.Provider>
  )
}

export function useAuth(): AuthContextData {
  const context = useContext(AuthContext)

  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider')
  }

  return context
}

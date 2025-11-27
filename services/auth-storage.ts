import * as SecureStore from 'expo-secure-store'
import { AuthData } from '../src/types/auth'

const STORAGE_KEY = 'MyApp.AuthData'

export const authStorage = {
  async set(data: AuthData): Promise<void> {
    await SecureStore.setItemAsync(STORAGE_KEY, JSON.stringify(data))
  },

  async get(): Promise<AuthData | null> {
    const json = await SecureStore.getItemAsync(STORAGE_KEY)
    return json ? JSON.parse(json) : null
  },

  async remove(): Promise<void> {
    await SecureStore.deleteItemAsync(STORAGE_KEY)
  },
}

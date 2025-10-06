import React, { useState } from 'react'
import { View, Text, TouchableOpacity, ScrollView, StatusBar, Alert } from 'react-native'
import CustomTextInput from '../../components/custom-text-input'
import CustomButton from '../../components/custom-button'
import { useNavigation } from '@react-navigation/native'
import { api } from '../../../services/api'
import { styles } from './styles'
import { SafeAreaView } from 'react-native-safe-area-context'

export type UserRole = 'student' | 'supervisor'

const RegisterStudent: React.FC = () => {
  const [role, setRole] = useState<UserRole>('student')
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [inviteCode, setInviteCode] = useState('')

  const navigation = useNavigation()

  const handleRegister = async () => {
    const body = { name, email, password, type: 'STUDENT' }
    try {
      const response = await api.post('/users/', body)

      if (response.status === 200) {
        Alert.alert('Registro', 'Usuário criado com sucesso!', [{ text: 'Ok' }])
      }
    } catch (err) {
      console.log(err)
    }
  }

  return (
    <SafeAreaView style={styles.safeArea}>
      <StatusBar barStyle='dark-content' />
      <ScrollView contentContainerStyle={styles.container}>
        <Text style={styles.headerTitle}>MeuEstagio.app</Text>

        <View style={styles.formContainer}>
          <Text style={styles.title}>Crie sua conta</Text>
          <Text style={styles.subtitle}>Selecione o seu perfil para iniciar o cadastro.</Text>
          <View style={styles.roleSelector}>
            <TouchableOpacity
              style={[styles.roleButton, role === 'student' && styles.roleButtonActive]}
              onPress={() => navigation.navigate('RegisterStudent')}>
              <Text
                style={[styles.roleButtonText, role === 'student' && styles.roleButtonTextActive]}>
                Sou Estudante
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={[styles.roleButton, role === 'supervisor' && styles.roleButtonActive]}
              onPress={() => navigation.navigate('RegisterSupervisor')}>
              <Text
                style={[
                  styles.roleButtonText,
                  role === 'supervisor' && styles.roleButtonTextActive,
                ]}>
                Sou Supervisor
              </Text>
            </TouchableOpacity>
          </View>

          <CustomTextInput
            label='Nome Completo'
            placeholder='Digite seu nome completo'
            value={name}
            onChangeText={setName}
          />
          <CustomTextInput
            label='Email'
            placeholder='seuemail@exemplo.com'
            value={email}
            onChangeText={setEmail}
            keyboardType='email-address'
            autoCapitalize='none'
          />
          <CustomTextInput
            label='Criar Senha'
            placeholder='Crie uma senha segura'
            value={password}
            onChangeText={setPassword}
            secureTextEntry
          />
          <CustomTextInput
            label='Código de Convite da Organização'
            placeholder='Insira o código de convite'
            value={inviteCode}
            onChangeText={setInviteCode}
          />

          <CustomButton
            title={role === 'student' ? 'Cadastrar Estudante' : 'Cadastrar Supervisor'}
            onPress={handleRegister}
            style={styles.submitButton}
            textStyle={styles.submitButtonText}
          />

          <TouchableOpacity onPress={() => console.log('Ir para Login')}>
            <Text style={styles.loginLinkText}>
              Já tem uma conta? <Text style={styles.loginLink}>Faça login</Text>
            </Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </SafeAreaView>
  )
}

export default RegisterStudent

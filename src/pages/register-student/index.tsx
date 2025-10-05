import React, { useState } from 'react'
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  SafeAreaView,
  StatusBar,
  Alert,
} from 'react-native'
import CustomTextInput from '../../components/custom-text-input'
import CustomButton from '../../components/custom-button'
import { useNavigation } from '@react-navigation/native'
import { api } from '../../../services/api'

export type UserRole = 'student' | 'supervisor'

const RegisterStudent: React.FC = () => {
  const [role, setRole] = useState<UserRole>('student')
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [inviteCode, setInviteCode] = useState('')

  const navigation = useNavigation()

  const handleRegister = async () => {
    console.log('aaaa')

    const body = { name, email, password, type: 'STUDENT' }
    try {
      const response = await api.post('/users/', body)

      console.log(response)
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

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#F5F5F5',
  },
  container: {
    padding: 20,
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    textAlign: 'center',
    paddingVertical: 20,
  },
  formContainer: {
    alignItems: 'center',
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 16,
    color: 'gray',
    marginBottom: 30,
    textAlign: 'center',
  },
  roleSelector: {
    flexDirection: 'row',
    backgroundColor: '#E0EFFF',
    borderRadius: 8,
    marginBottom: 30,
    width: '100%',
  },
  roleButton: {
    flex: 1,
    paddingVertical: 12,
    alignItems: 'center',
    borderRadius: 8,
  },
  roleButtonActive: {
    backgroundColor: '#007BFF',
  },
  roleButtonText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#007BFF',
  },
  roleButtonTextActive: {
    color: '#FFF',
  },
  submitButton: {
    backgroundColor: '#007BFF',
    width: '100%',
    padding: 15,
    borderRadius: 8,
    alignItems: 'center',
    marginTop: 10,
  },
  submitButtonText: {
    color: '#FFFFFF',
    fontSize: 18,
    fontWeight: 'bold',
  },
  loginLinkText: {
    marginTop: 20,
    fontSize: 16,
    color: 'gray',
  },
  loginLink: {
    color: '#007BFF',
    fontWeight: 'bold',
  },
})

export default RegisterStudent

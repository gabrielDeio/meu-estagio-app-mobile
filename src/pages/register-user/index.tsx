import React, { useState } from 'react'
import {
  View,
  Text,
  TouchableOpacity,
  ScrollView,
  StatusBar,
  Alert,
  KeyboardAvoidingView,
  Platform,
} from 'react-native'
import CustomTextInput from '../../components/custom-text-input'
import CustomButton from '../../components/custom-button'
import { useNavigation } from '@react-navigation/native'
import { styles } from './styles'
import { SafeAreaView } from 'react-native-safe-area-context'
import { AccountTypeEnum, RegisterUserDTO } from '../../dto/register-user.dto'
import { UserService } from '../../../services/user-service'

const RegisterUser: React.FC = () => {
  const [role, setRole] = useState<AccountTypeEnum>(AccountTypeEnum.STUDENT)
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [organizationName, setOrganizationName] = useState('')
  const [inviteCode, setInviteCode] = useState('')

  const navigation = useNavigation()

  const handleRegister = async () => {
    const body: RegisterUserDTO = {
      name,
      email,
      password,
      type: role,
      organizationName,
      inviteCode,
    }
    try {
      const response = await UserService.registerUser(body)

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

      <Text style={styles.headerTitle}>MeuEstagio.app</Text>
      <KeyboardAvoidingView
        style={{ flex: 1 }}
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        keyboardVerticalOffset={0}>
        <ScrollView contentContainerStyle={styles.container}>
          <View style={styles.formContainer}>
            <Text style={styles.title}>Crie sua conta</Text>
            <Text style={styles.subtitle}>Selecione o seu perfil para iniciar o cadastro.</Text>
            <View style={styles.roleSelector}>
              <TouchableOpacity
                style={[
                  styles.roleButton,
                  role === AccountTypeEnum.STUDENT && styles.roleButtonActive,
                ]}
                onPress={() => setRole(AccountTypeEnum.STUDENT)}>
                <Text
                  style={[
                    styles.roleButtonText,
                    role === AccountTypeEnum.STUDENT && styles.roleButtonTextActive,
                  ]}>
                  Sou Estudante
                </Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={[
                  styles.roleButton,
                  role === AccountTypeEnum.SUPERVISOR && styles.roleButtonActive,
                ]}
                onPress={() => setRole(AccountTypeEnum.SUPERVISOR)}>
                <Text
                  style={[
                    styles.roleButtonText,
                    role === AccountTypeEnum.SUPERVISOR && styles.roleButtonTextActive,
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
            {role === AccountTypeEnum.STUDENT && (
              <CustomTextInput
                label='Código de Convite da Organização'
                placeholder='Insira o código de convite'
                value={inviteCode}
                onChangeText={setInviteCode}
              />
            )}

            {role === AccountTypeEnum.SUPERVISOR && (
              <CustomTextInput
                label='Nome da Organização'
                placeholder='Insira o nome da organização'
                value={organizationName}
                onChangeText={setOrganizationName}
              />
            )}

            <CustomButton
              title={
                role === AccountTypeEnum.STUDENT ? 'Cadastrar Estudante' : 'Cadastrar Supervisor'
              }
              onPress={handleRegister}
              style={styles.submitButton}
              textStyle={styles.submitButtonText}
            />

            <TouchableOpacity onPress={() => navigation.navigate('Login')}>
              <Text style={styles.loginLinkText}>
                Já tem uma conta? <Text style={styles.loginLink}>Faça login</Text>
              </Text>
            </TouchableOpacity>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  )
}

export default RegisterUser

import React, { useState } from 'react'
import { View, Text, TouchableOpacity, ScrollView, StatusBar, TextInput, Alert } from 'react-native'
import { Ionicons } from '@expo/vector-icons'

import CustomTextInput from '../../components/custom-text-input'
import CustomButton from '../../components/custom-button'
import { UserRole } from '../register-student'
import { useNavigation } from '@react-navigation/native'
import { styles } from './style'
import { SafeAreaView } from 'react-native-safe-area-context'
import { api } from '../../../services/api'

const RegisterSupervisor: React.FC = () => {
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [organizationName, setOrganizationName] = useState('')
  const [role, setRole] = useState<UserRole>('supervisor')

  const navigation = useNavigation()
  const [isPasswordVisible, setIsPasswordVisible] = useState(false)

  const handleRegister = async () => {
    const body = { name, email, password, organizationName, type: 'SUPERVISOR' }

    try {
      const response = await api.post('/users/', body)
      if (response.status === 200) {
        Alert.alert('Registro', 'Usuário criado com sucesso!', [{ text: 'Ok' }])
      }
    } catch (err) {
      console.log(err)
      Alert.alert('Erro', 'Erro ao criar usuário', [{ text: 'Ok' }])
    }
  }

  return (
    <SafeAreaView style={styles.safeArea}>
      <StatusBar barStyle='dark-content' />
      <ScrollView contentContainerStyle={styles.container}>
        <Text style={styles.headerTitle}>MeuEstagio.app</Text>
        <Text style={styles.title}>Crie sua conta</Text>
        <Text style={styles.subtitle}> Selecione o seu perfil para iniciar o cadastro. </Text>

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
            onPress={() => navigation.navigate('RegisterStudent')}>
            <Text
              style={[styles.roleButtonText, role === 'supervisor' && styles.roleButtonTextActive]}>
              Sou Supervisor
            </Text>
          </TouchableOpacity>
        </View>
        <View style={styles.form}>
          <CustomTextInput
            label='Nome Completo'
            placeholder='Seu nome completo'
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

          <View style={styles.inputContainer}>
            <Text style={styles.label}>Criar Senha</Text>
            <View style={styles.passwordInputWrapper}>
              <TextInput
                style={styles.passwordInput}
                placeholder='Crie uma senha segura'
                placeholderTextColor='#999'
                value={password}
                onChangeText={setPassword}
                secureTextEntry={!isPasswordVisible}
              />
              <TouchableOpacity
                onPress={() => setIsPasswordVisible((prev) => !prev)}
                style={styles.eyeIcon}>
                <Ionicons
                  name={isPasswordVisible ? 'eye-off-outline' : 'eye-outline'}
                  size={24}
                  color='gray'
                />
              </TouchableOpacity>
            </View>
          </View>

          <CustomTextInput
            label='Nome da Organização'
            placeholder='Nome da sua empresa ou instituição'
            value={organizationName}
            onChangeText={setOrganizationName}
          />

          <CustomButton
            title='Cadastrar Supervisor'
            onPress={handleRegister}
            style={styles.submitButton}
            textStyle={styles.submitButtonText}
          />

          <TouchableOpacity onPress={() => console.log('Ir para Login')}>
            <Text style={styles.loginLink}>Já tenho uma conta</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </SafeAreaView>
  )
}

export default RegisterSupervisor

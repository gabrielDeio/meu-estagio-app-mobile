import React, { useState } from 'react'
import { View, Text, TouchableOpacity, StatusBar } from 'react-native'
import { useNavigation } from '@react-navigation/native'

import CustomTextInput from '../../components/custom-text-input'
;('')
import CustomButton from '../../components/custom-button'
import { styles } from './style'
import { SafeAreaView } from 'react-native-safe-area-context'

const LoginNew: React.FC = () => {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const navigation = useNavigation()

  const handleLogin = () => {
    console.log({ email, password })
  }

  return (
    <SafeAreaView style={styles.safeArea}>
      <StatusBar barStyle='dark-content' />
      <View style={styles.container}>
        <Text style={styles.title}>Login</Text>
        <Text style={styles.subtitle}>Acesse sua conta MeuEstagio.app</Text>

        <View style={styles.form}>
          <CustomTextInput
            label='Email'
            placeholder='seuemail@dominio.com'
            value={email}
            onChangeText={setEmail}
            keyboardType='email-address'
            autoCapitalize='none'
          />
          <CustomTextInput
            label='Senha'
            placeholder='Sua senha'
            value={password}
            onChangeText={setPassword}
            secureTextEntry
          />

          <CustomButton
            title='Entrar'
            onPress={handleLogin}
            style={styles.loginButton}
            textStyle={styles.loginButtonText}
          />
        </View>

        <TouchableOpacity onPress={() => console.log('Esqueci a senha')}>
          <Text style={styles.forgotPasswordText}>Esqueci minha senha?</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.signupContainer}
          onPress={() => navigation.navigate('RegisterStudent')}>
          <Text style={styles.signupText}>
            Não tem uma conta? <Text style={styles.signupLink}>Cadastre-se</Text>
          </Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  )
}

export default LoginNew

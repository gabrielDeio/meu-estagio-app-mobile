import React, { useState } from 'react'
import { View, Text, TouchableOpacity, StatusBar, Alert } from 'react-native'
import { useNavigation } from '@react-navigation/native'
import { Picker } from '@react-native-picker/picker'
import CustomTextInput from '../../components/custom-text-input'
;('')
import CustomButton from '../../components/custom-button'
import { styles } from './style'
import { SafeAreaView } from 'react-native-safe-area-context'
import { AuthService } from '../../../services/auth-service'
import { LoginDto } from '../../dto/login.dto'
import { AccountTypeEnum } from '../../dto/register-user.dto'

const userTypes = [
  { label: 'Aluno', value: AccountTypeEnum.STUDENT },
  { label: 'Supervisor', value: AccountTypeEnum.SUPERVISOR },
]

const Login: React.FC = () => {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [type, setType] = useState(userTypes[0].value)
  const navigation = useNavigation()

  const handleLogin = async () => {
    if (!type) {
      Alert.alert('Por favor, selecione um tipo de usuários')
      return
    }

    const body: LoginDto = { email, password, type }

    const res = await AuthService.login(body)

    if (res.status === 200) Alert.alert(`Sucesso no login.\nToken : ${res.data.access_token}`)
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

          <Picker selectedValue={type} onValueChange={(value) => setType(value)}>
            {userTypes.map((item, index) => (
              <Picker.Item key={index} label={item.label} value={item.value} />
            ))}
          </Picker>

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
          onPress={() => navigation.navigate('RegisterUser')}>
          <Text style={styles.signupText}>
            Não tem uma conta? <Text style={styles.signupLink}>Cadastre-se</Text>
          </Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  )
}

export default Login

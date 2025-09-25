// src/screens/LoginScreen.tsx
import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  SafeAreaView,
  StatusBar,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';

// Reutilizando nossos componentes
import CustomTextInput from '../../components/custom-text-input'; '';
import CustomButton from '../../components/custom-button';

// Tipagem para a prop de navegação específica desta tela
//type LoginScreenNavigationProp = StackNavigationProp<AuthStackParamList, 'Login'>;

const LoginNew: React.FC = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigation = useNavigation()

  const handleLogin = () => {
    // Aqui viria a lógica para autenticar o usuário
    console.log({ email, password });
    // Se o login for bem-sucedido, você normalmente mudaria o estado
    // global do app para exibir a navegação principal (as abas)
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <StatusBar barStyle="dark-content" />
      <View style={styles.container}>
        <Text style={styles.title}>Login</Text>
        <Text style={styles.subtitle}>Acesse sua conta MeuEstagio.app</Text>

        <View style={styles.form}>
          <CustomTextInput
            label="Email"
            placeholder="seuemail@dominio.com"
            value={email}
            onChangeText={setEmail}
            keyboardType="email-address"
            autoCapitalize="none"
          />
          <CustomTextInput
            label="Senha"
            placeholder="Sua senha"
            value={password}
            onChangeText={setPassword}
            secureTextEntry // Prop para esconder a senha
          />
          
          <CustomButton
            title="Entrar"
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
          onPress={() => navigation.navigate('RegisterStudent')} // Navega para a tela de cadastro
        >
          <Text style={styles.signupText}>
            Não tem uma conta? <Text style={styles.signupLink}>Cadastre-se</Text>
          </Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#F5F5F5', // Um cinza bem claro
  },
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 30,
  },
  title: {
    fontSize: 36,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 10,
  },
  subtitle: {
    fontSize: 16,
    color: 'gray',
    marginBottom: 40,
  },
  form: {
    width: '100%',
  },
  loginButton: {
    backgroundColor: '#0D6EFD',
    width: '100%',
    padding: 15,
    borderRadius: 8,
    alignItems: 'center',
    marginTop: 10,
  },
  loginButtonText: {
    color: '#FFFFFF',
    fontSize: 18,
    fontWeight: 'bold',
  },
  forgotPasswordText: {
    color: '#0D6EFD',
    fontSize: 16,
    fontWeight: '600',
    marginTop: 20,
  },
  signupContainer: {
    marginTop: 30,
  },
  signupText: {
    fontSize: 16,
    color: 'gray',
  },
  signupLink: {
    color: '#0D6EFD',
    fontWeight: 'bold',
  },
});

export default LoginNew;
// src/screens/WelcomeScreen.js
import React from 'react';
import { View, Text, StyleSheet, StatusBar } from 'react-native';
import CustomButton from '../../components/custom-button';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { RootStackParamList } from '../../types/navigations';


type Props = NativeStackScreenProps<RootStackParamList, 'Home'>;

const Login = ({navigation} : Props) => {
  return (
    <View style={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor="#F5F5F5" />
      <Text style={styles.headerTitle}>MeuEstagio.app</Text>
      <View style={styles.content}>
        <Text style={styles.title}>Bem-vindo(a)!</Text>
        <Text style={styles.subtitle}>Escolha uma opção para continuarrr.</Text>
        <CustomButton
          title="Login"
          onPress={() => navigation.navigate('LoginNew')}
          style={styles.loginButton}
          textStyle={styles.loginButtonText}
        />
        <CustomButton
          title="Cadastrar"
          onPress={() => navigation.navigate('RegisterSupervisor')}
          style={styles.registerButton}
          textStyle={styles.registerButtonText}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F5F5F5', // Um cinza claro de fundo
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    textAlign: 'center',
    paddingVertical: 20,
    borderBottomWidth: 1,
    borderBottomColor: '#E0E0E0',
  },
  content: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 20,
  },
  title: {
    fontSize: 32,
    fontWeight: 'bold',
    marginBottom: 10,
    color: '#333',
  },
  subtitle: {
    fontSize: 16,
    color: 'gray',
    marginBottom: 40,
  },
  loginButton: {
    backgroundColor: '#007BFF',
    width: '100%',
    padding: 15,
    borderRadius: 8,
    alignItems: 'center',
    marginBottom: 15,
  },
  loginButtonText: {
    color: '#FFFFFF',
    fontSize: 18,
    fontWeight: 'bold',
  },
  registerButton: {
    backgroundColor: '#E0EFFF', // Um azul mais claro
    width: '100%',
    padding: 15,
    borderRadius: 8,
    alignItems: 'center',
  },
  registerButtonText: {
    color: '#007BFF',
    fontSize: 18,
    fontWeight: 'bold',
  },
});

export default Login;
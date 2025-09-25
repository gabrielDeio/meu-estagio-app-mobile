// src/screens/SupervisorRegisterScreen.tsx
import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  SafeAreaView,
  StatusBar,
  TextInput, // Usaremos o TextInput base para o campo de senha customizado
} from 'react-native';
import { Ionicons } from '@expo/vector-icons'; // Certifique-se de ter os ícones

// Reutilizando nossos componentes
import CustomTextInput from '../../components/custom-text-input';
import CustomButton from '../../components/custom-button';
import { UserRole } from '../register-student';
import { useNavigation } from '@react-navigation/native';

const RegisterSupervisor: React.FC = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [organizationName, setOrganizationName] = useState('');
  const [role, setRole] = useState<UserRole>('supervisor');
  
  const navigation = useNavigation()
  // Novo estado para controlar a visibilidade da senha
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);

  const handleRegister = () => {
    // Lógica de cadastro do supervisor
    console.log({
      name,
      email,
      password,
      organizationName,
    });
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <StatusBar barStyle="dark-content" />
      <ScrollView contentContainerStyle={styles.container}>
        <Text style={styles.headerTitle}>MeuEstagio.app</Text>
        <Text style={styles.title}>Cadastro de Supervisor e Organização</Text>


        <View style={styles.roleSelector}>
                    <TouchableOpacity
                      style={[
                        styles.roleButton,
                        role === 'student' && styles.roleButtonActive,
                      ]}
                      onPress={() => navigation.navigate('RegisterStudent')}>
                      <Text style={[
                          styles.roleButtonText,
                          role === 'student' && styles.roleButtonTextActive,
                        ]}>
                        Sou Estudante
                      </Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                      style={[
                        styles.roleButton,
                        role === 'supervisor' && styles.roleButtonActive,
                      ]}
                      onPress={() => navigation.navigate('RegisterStudent')}>
                      <Text style={[
                          styles.roleButtonText,
                          role === 'supervisor' && styles.roleButtonTextActive,
                        ]}>
                        Sou Supervisor
                      </Text>
                    </TouchableOpacity>
                  </View>
        <View style={styles.form}>
          <CustomTextInput
            label="Nome Completo"
            placeholder="Seu nome completo"
            value={name}
            onChangeText={setName}
          />
          <CustomTextInput
            label="Email"
            placeholder="seuemail@exemplo.com"
            value={email}
            onChangeText={setEmail}
            keyboardType="email-address"
            autoCapitalize="none"
          />

          {/* Campo de Senha com Ícone */}
          <View style={styles.inputContainer}>
            <Text style={styles.label}>Criar Senha</Text>
            <View style={styles.passwordInputWrapper}>
              <TextInput
                style={styles.passwordInput}
                placeholder="Crie uma senha segura"
                placeholderTextColor="#999"
                value={password}
                onChangeText={setPassword}
                secureTextEntry={!isPasswordVisible} // A visibilidade é controlada pelo estado
              />
              <TouchableOpacity 
                onPress={() => setIsPasswordVisible(prev => !prev)}
                style={styles.eyeIcon}
              >
                <Ionicons 
                  name={isPasswordVisible ? 'eye-off-outline' : 'eye-outline'} 
                  size={24} 
                  color="gray" 
                />
              </TouchableOpacity>
            </View>
          </View>

          <CustomTextInput
            label="Nome da Organização"
            placeholder="Nome da sua empresa ou instituição"
            value={organizationName}
            onChangeText={setOrganizationName}
          />

          <CustomButton
            title="Cadastrar Supervisor"
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
  );
};

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#FFF', // Fundo branco como na imagem
  },
  container: {
    flexGrow: 1,
    justifyContent: 'center',
    padding: 30,
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    textAlign: 'center',
    paddingVertical: 20,
  },
  title: {
    fontSize: 26,
    fontWeight: 'bold',
    color: '#333',
    textAlign: 'center',
    marginBottom: 40,
  },
  form: {
    width: '100%',
  },
  // Estilos para o campo de senha customizado
  inputContainer: {
    width: '100%',
    marginBottom: 20,
  },
  label: {
    fontSize: 14,
    color: '#333',
    marginBottom: 8,
    fontWeight: '500',
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
  passwordInputWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFF',
    borderWidth: 1,
    borderColor: '#DDD',
    borderRadius: 8,
  },
  passwordInput: {
    flex: 1,
    paddingHorizontal: 15,
    paddingVertical: 12,
    fontSize: 16,
  },
  eyeIcon: {
    padding: 10,
  },
  // Fim dos estilos do campo de senha
  submitButton: {
    backgroundColor: '#0D6EFD', // Azul mais forte da imagem
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
  loginLink: {
    marginTop: 20,
    fontSize: 16,
    color: '#0D6EFD',
    textAlign: 'center',
    fontWeight: 'bold',
  },
});

export default RegisterSupervisor;
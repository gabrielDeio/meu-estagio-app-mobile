import React from 'react';
import { View, Text, StatusBar } from 'react-native';
import CustomButton from '../../components/custom-button';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { RootStackParamList } from '../../types/navigations';
import { styles } from './styles';


type Props = NativeStackScreenProps<RootStackParamList, 'WelcomeScreen'>;

const WelcomeScreen = ({navigation} : Props) => {
  return (
    <View style={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor="#F5F5F5" />
      <Text style={styles.headerTitle}>MeuEstagio.app</Text>
      <View style={styles.content}>
        <Text style={styles.title}>Bem-vindo(a)!</Text>
        <Text style={styles.subtitle}>Escolha uma opção para continuar.</Text>
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



export default WelcomeScreen;
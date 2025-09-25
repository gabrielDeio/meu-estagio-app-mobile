import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import Login from './src/pages/login';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import RegisterStudent from './src/pages/register-student';

// Importando os tipos
import { RootStackParamList } from './src/types/navigations'; 
import RegisterSupervisor from './src/pages/register-supervisor';
import LoginNew from './src/pages/login-new';

// Criando o navigator com tipagem
const Stack = createNativeStackNavigator<RootStackParamList>();

export default function App() {
  return (
      <NavigationContainer>
        <Stack.Navigator initialRouteName='Home' >
          <Stack.Screen name='Home' component={Login}/>
          <Stack.Screen name='RegisterStudent' component={RegisterStudent}/>
          <Stack.Screen name='RegisterSupervisor' component={RegisterSupervisor}/>
          <Stack.Screen name='LoginNew' component={LoginNew}/>
        </Stack.Navigator>
      </NavigationContainer>

      
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});

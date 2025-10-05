import { StyleSheet } from 'react-native';

import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import RegisterStudent from './src/pages/register-student';

import { RootStackParamList } from './src/types/navigations'; 
import RegisterSupervisor from './src/pages/register-supervisor';
import LoginNew from './src/pages/login-new';
import WelcomeScreen from './src/pages/welcome-screen';

const Stack = createNativeStackNavigator<RootStackParamList>();

export default function App() {
  return (
      <NavigationContainer>
        <Stack.Navigator initialRouteName='WelcomeScreen' >
          <Stack.Screen name='WelcomeScreen' component={WelcomeScreen}/>
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

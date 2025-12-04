import { StyleSheet } from 'react-native'

import { NavigationContainer } from '@react-navigation/native'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import RegisterUser from './src/pages/register-user'

import { RootStackParamList } from './src/types/navigations'
import Login from './src/pages/login'
import WelcomeScreen from './src/pages/welcome-screen'
import HomeScreen from './src/pages/home-screen'
import { AuthProvider } from './src/contexts/auth-context'
import ActivitiesScreen from './src/pages/activities-screen/activities-screen'
import RegisterActivityScreen from './src/pages/create-activity-screen'
import OrganizationScreen from './src/pages/organization-screen'
import StudentsScreen from './src/pages/students-screen'
import EvaluateActivitiesScreen from './src/pages/evaluate-activities-screen'
import ProfileScreen from './src/pages/profile-screen'

const Stack = createNativeStackNavigator<RootStackParamList>()

export default function App() {
  return (
    <AuthProvider>
      <NavigationContainer>
        <Stack.Navigator initialRouteName='WelcomeScreen'>
          <Stack.Screen name='WelcomeScreen' component={WelcomeScreen} />
          <Stack.Screen name='RegisterUser' component={RegisterUser} />
          <Stack.Screen name='Login' component={Login} />
          <Stack.Screen name='HomeScreen' component={HomeScreen} />
          <Stack.Screen name='ActivitiesScreen' component={ActivitiesScreen} />
          <Stack.Screen name='RegisterActivityScreen' component={RegisterActivityScreen} />
          <Stack.Screen name='OrganizationScreen' component={OrganizationScreen} />
          <Stack.Screen name='StudentsScreen' component={StudentsScreen} />
          <Stack.Screen name='EvaluateActivitiesScreen' component={EvaluateActivitiesScreen} />
          <Stack.Screen name='ProfileScreen' component={ProfileScreen} />
        </Stack.Navigator>
      </NavigationContainer>
    </AuthProvider>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
})

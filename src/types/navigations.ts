import { RouteProp } from '@react-navigation/native'

export type RootStackParamList = {
  WelcomeScreen: undefined
  RegisterUser: undefined
  Login: undefined
  HomeScreen: undefined
  ActivitiesScreen: undefined
  RegisterActivityScreen: undefined
  OrganizationScreen: undefined
  StudentsScreen: undefined
  EvaluateActivitiesScreen: {
    username: string
    userId: string
  }
  Details: {
    id: string
    title?: string
  }
  Profile: {
    userId: string
  }
  Settings: undefined
}

declare global {
  namespace ReactNavigation {
    interface RootParamList extends RootStackParamList {}
  }
}

export type EvaluateActivitiesRouteProp = RouteProp<RootStackParamList, 'EvaluateActivitiesScreen'>

export type RootStackParamList = {
  WelcomeScreen: undefined
  RegisterUser: undefined
  Login: undefined
  HomeScreen: undefined
  ActivitiesScreen: undefined
  RegisterActivityScreen: undefined
  OrganizationScreen: undefined
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

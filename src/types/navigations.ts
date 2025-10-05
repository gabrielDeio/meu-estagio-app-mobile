export type RootStackParamList = {
  WelcomeScreen: undefined;
  RegisterStudent : undefined;
  RegisterSupervisor : undefined;
  LoginNew : undefined;
  Details: {
    id: string;
    title?: string;
  };
  Profile: {
    userId: string;
  };
  Settings: undefined;
};


declare global {
  namespace ReactNavigation {
    interface RootParamList extends RootStackParamList {}
  }
}
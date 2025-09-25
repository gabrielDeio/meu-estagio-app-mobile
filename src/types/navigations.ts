// types/navigation.ts
export type RootStackParamList = {
  Home: undefined;
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

// Declare global types for useNavigation hook
declare global {
  namespace ReactNavigation {
    interface RootParamList extends RootStackParamList {}
  }
}
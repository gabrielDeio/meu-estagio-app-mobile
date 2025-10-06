import { StyleSheet } from 'react-native'

export const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#F5F5F5',
  },
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 30,
  },
  title: {
    fontSize: 36,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 10,
  },
  subtitle: {
    fontSize: 16,
    color: 'gray',
    marginBottom: 40,
  },
  form: {
    width: '100%',
  },
  loginButton: {
    backgroundColor: '#0D6EFD',
    width: '100%',
    padding: 15,
    borderRadius: 8,
    alignItems: 'center',
    marginTop: 10,
  },
  loginButtonText: {
    color: '#FFFFFF',
    fontSize: 18,
    fontWeight: 'bold',
  },
  forgotPasswordText: {
    color: '#0D6EFD',
    fontSize: 16,
    fontWeight: '600',
    marginTop: 20,
  },
  signupContainer: {
    marginTop: 30,
  },
  signupText: {
    fontSize: 16,
    color: 'gray',
  },
  signupLink: {
    color: '#0D6EFD',
    fontWeight: 'bold',
  },
})

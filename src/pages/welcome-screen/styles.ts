import { StyleSheet } from 'react-native'

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F5F5F5', // Um cinza claro de fundo
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    textAlign: 'center',
    paddingVertical: 20,
    borderBottomWidth: 1,
    borderBottomColor: '#E0E0E0',
  },
  content: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 20,
  },
  title: {
    fontSize: 32,
    fontWeight: 'bold',
    marginBottom: 10,
    color: '#333',
  },
  subtitle: {
    fontSize: 16,
    color: 'gray',
    marginBottom: 40,
  },
  loginButton: {
    backgroundColor: '#007BFF',
    width: '100%',
    padding: 15,
    borderRadius: 8,
    alignItems: 'center',
    marginBottom: 15,
  },
  loginButtonText: {
    color: '#FFFFFF',
    fontSize: 18,
    fontWeight: 'bold',
  },
  registerButton: {
    backgroundColor: '#E0EFFF', // Um azul mais claro
    width: '100%',
    padding: 15,
    borderRadius: 8,
    alignItems: 'center',
  },
  registerButtonText: {
    color: '#007BFF',
    fontSize: 18,
    fontWeight: 'bold',
  },
});
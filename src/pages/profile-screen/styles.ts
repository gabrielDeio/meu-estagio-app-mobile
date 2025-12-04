import { StyleSheet } from 'react-native'

export default StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f6f7f8',
  },

  scroll: {
    flex: 1,
  },

  header: {
    height: 60,
    paddingHorizontal: 16,
    borderBottomWidth: 1,
    borderColor: '#ddd',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: '#f6f7f8',
  },

  headerTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#111',
  },

  headerButton: {
    width: 30,
    height: 30,
    alignItems: 'center',
    justifyContent: 'center',
  },

  profileBox: {
    alignItems: 'center',
    marginTop: 20,
  },

  avatar: {
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: '#e5e7eb',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 12,
  },

  name: {
    marginTop: 12,
    fontSize: 24,
    fontWeight: 'bold',
    color: '#111',
  },

  role: {
    fontSize: 16,
    color: '#666',
  },

  section: {
    marginTop: 20,
    paddingHorizontal: 16,
  },

  sectionTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#111',
    marginBottom: 10,
  },

  card: {
    backgroundColor: '#fff',
    borderRadius: 10,
    overflow: 'hidden',
    borderWidth: 1,
    borderColor: '#e5e7eb',
  },

  cardRow: {
    padding: 16,
    borderBottomWidth: 1,
    borderColor: '#e5e7eb',
  },

  cardLabel: {
    fontSize: 15,
    fontWeight: '600',
    color: '#111',
  },

  cardValue: {
    fontSize: 14,
    color: '#666',
    marginTop: 4,
  },

  option: {
    padding: 16,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    borderBottomWidth: 1,
    borderColor: '#e5e7eb',
  },

  optionText: {
    fontSize: 15,
    fontWeight: '600',
    color: '#111',
  },

  logoutButton: {
    marginTop: 20,
    marginHorizontal: 16,
    height: 48,
    backgroundColor: 'rgba(17,115,212,0.2)',
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'center',
  },

  logoutText: {
    color: '#1173d4',
    fontSize: 16,
    fontWeight: 'bold',
  },

  footer: {
    position: 'absolute',
    bottom: 0,
    width: '100%',
    backgroundColor: '#f6f7f8',
    borderTopWidth: 1,
    borderColor: '#ddd',
  },

  footerBar: {
    height: 70,
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
  },

  footerItem: {
    alignItems: 'center',
  },

  footerItemActive: {
    alignItems: 'center',
  },

  footerText: {
    fontSize: 12,
    marginTop: 2,
    color: '#666',
  },

  footerTextActive: {
    fontSize: 12,
    marginTop: 2,
    fontWeight: 'bold',
    color: '#1173d4',
  },
})

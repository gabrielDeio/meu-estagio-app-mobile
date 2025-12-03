import { StyleSheet } from 'react-native'

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f6f7f8',
  },

  header: {
    height: 64,
    backgroundColor: '#f6f7f8',
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16,
    borderBottomWidth: 1,
    borderBottomColor: 'rgba(17,115,212,0.2)',
  },

  backButton: {
    padding: 4,
  },

  headerTitle: {
    flex: 1,
    textAlign: 'center',
    fontSize: 18,
    fontWeight: '700',
    color: '#000',
  },

  content: {
    flex: 1,
    paddingHorizontal: 16,
    paddingTop: 20,
  },

  sectionTitle: {
    fontSize: 20,
    fontWeight: '700',
    color: '#000',
  },

  card: {
    marginTop: 16,
    padding: 16,
    borderRadius: 12,
    backgroundColor: '#fff',
    borderWidth: 1,
    borderColor: 'rgba(17,115,212,0.2)',
  },

  cardDate: {
    fontWeight: '600',
    fontSize: 16,
    color: '#000',
  },

  cardDescription: {
    marginTop: 4,
    fontSize: 14,
    color: '#4b5563',
  },

  cardTime: {
    marginTop: 4,
    fontSize: 13,
    color: '#6b7280',
  },

  cardButtons: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    marginTop: 16,
    gap: 8,
  },

  rejectButton: {
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderRadius: 6,
    backgroundColor: 'rgba(17,115,212,0.2)',
  },

  rejectText: {
    color: '#1173d4',
    fontWeight: '600',
    fontSize: 14,
  },

  approveButton: {
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderRadius: 6,
    backgroundColor: '#1173d4',
  },

  approveText: {
    color: '#fff',
    fontWeight: '600',
    fontSize: 14,
  },

  footer: {
    height: 64,
    flexDirection: 'row',
    borderTopWidth: 1,
    borderTopColor: 'rgba(17,115,212,0.2)',
    backgroundColor: '#f6f7f8',
    alignItems: 'center',
    justifyContent: 'space-around',
  },

  navItem: {
    alignItems: 'center',
  },

  navItemActive: {
    alignItems: 'center',
  },

  navText: {
    marginTop: 2,
    color: '#6b7280',
    fontSize: 12,
    fontWeight: '500',
  },

  navTextActive: {
    marginTop: 2,
    color: '#1173d4',
    fontSize: 12,
    fontWeight: '600',
  },
})

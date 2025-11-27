import { StyleSheet } from 'react-native'

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f6f7f8',
  },

  header: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 16,
  },
  headerTitle: {
    flex: 1,
    textAlign: 'center',
    fontSize: 20,
    fontWeight: 'bold',
  },
  settingsButton: {
    padding: 8,
    borderRadius: 50,
  },

  main: {
    paddingHorizontal: 16,
  },

  sectionTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 12,
    marginTop: 8,
  },

  grid: {
    gap: 12,
  },

  card: {
    backgroundColor: '#fff',
    padding: 16,
    borderRadius: 8,
    elevation: 2,
  },
  cardFull: {
    width: '100%',
  },
  cardLabel: {
    fontSize: 14,
    fontWeight: '500',
    color: '#555',
  },
  cardValue: {
    fontSize: 32,
    fontWeight: 'bold',
  },

  organizationCard: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#fff',
    padding: 16,
    borderRadius: 8,
    elevation: 2,
    gap: 16,
  },
  organizationIcon: {
    width: 52,
    height: 52,
    borderRadius: 26,
    backgroundColor: '#1173d415',
    justifyContent: 'center',
    alignItems: 'center',
  },
  orgName: {
    fontWeight: '600',
    fontSize: 16,
  },
  orgSupervisor: {
    fontSize: 13,
    color: '#666',
  },

  footer: {
    flexDirection: 'row',
    borderTopWidth: 1,
    borderColor: '#ddd',
    backgroundColor: '#f6f7f8',
    paddingVertical: 6,
  },
  navItem: {
    flex: 1,
    alignItems: 'center',
    paddingVertical: 6,
  },
  navItemActive: {},
  navText: {
    marginTop: 2,
    fontSize: 12,
    color: '#666',
  },
})

export default styles

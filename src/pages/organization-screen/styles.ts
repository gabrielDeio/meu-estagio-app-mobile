import { StyleSheet } from 'react-native'

export const styles = StyleSheet.create({
  safeArea: {
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
    fontSize: 18,
    fontWeight: '700',
    color: '#18181B',
    paddingRight: 24,
  },

  content: {
    paddingHorizontal: 16,
    marginTop: 8,
  },

  sectionTitle: {
    fontSize: 16,
    fontWeight: '700',
    marginBottom: 16,
    color: '#18181B',
  },

  label: {
    fontSize: 13,
    color: '#4A4A4A',
    marginBottom: 4,
  },

  // ORG CARD
  orgCard: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#fff',
    padding: 16,
    borderRadius: 12,
    marginBottom: 16,
  },
  orgIconContainer: {
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: '#1173d420',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  orgName: {
    fontSize: 18,
    fontWeight: '600',
    color: '#18181B',
  },

  // INVITE CARD
  inviteCard: {
    backgroundColor: '#fff',
    padding: 16,
    borderRadius: 12,
  },
  inviteRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginTop: 8,
  },
  inviteCode: {
    fontSize: 24,
    fontWeight: '700',
    letterSpacing: 4,
    color: '#18181B',
  },
  inviteButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#1173d4',
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderRadius: 999,
  },
  inviteButtonText: {
    color: '#fff',
    fontSize: 14,
    marginLeft: 6,
    fontWeight: '500',
  },

  // Manage Members
  manageMembersButton: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 14,
    marginTop: 32,
  },
  manageMembersText: {
    fontSize: 18,
    fontWeight: '600',
    color: '#18181B',
  },

  // FOOTER NAV
  footer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    borderTopWidth: 1,
    borderColor: '#1173d440',
    paddingVertical: 10,
    backgroundColor: '#f6f7f8',
  },
  navItem: {
    alignItems: 'center',
  },
  navItemActive: {
    alignItems: 'center',
  },
  navText: {
    fontSize: 12,
    color: '#4A4A4A',
    marginTop: 2,
  },
  navTextActive: {
    fontSize: 12,
    color: '#1173d4',
    fontWeight: '700',
    marginTop: 2,
  },
})

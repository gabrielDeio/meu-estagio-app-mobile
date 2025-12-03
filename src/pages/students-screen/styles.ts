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
    paddingBottom: 8,
    backgroundColor: 'rgba(246,247,248,0.8)',
  },

  backButton: {
    width: 40,
    height: 40,
    justifyContent: 'center',
    alignItems: 'center',
  },

  headerTitle: {
    flex: 1,
    textAlign: 'center',
    paddingRight: 40,
    fontSize: 18,
    fontWeight: 'bold',
    color: '#18181B',
  },

  searchContainer: {
    marginHorizontal: 16,
    marginTop: 12,
    position: 'relative',
  },

  searchIcon: {
    position: 'absolute',
    left: 12,
    top: 14,
  },

  searchInput: {
    backgroundColor: 'rgba(0,0,0,0.05)',
    paddingVertical: 12,
    paddingHorizontal: 40,
    borderRadius: 10,
    color: '#18181B',
  },

  listContainer: {
    paddingTop: 10,
  },

  studentRow: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 10,
    paddingHorizontal: 16,
  },

  avatar: {
    width: 52,
    height: 52,
    borderRadius: 26,
  },

  studentInfo: {
    marginLeft: 12,
  },

  studentName: {
    fontSize: 16,
    fontWeight: '500',
    color: '#18181B',
  },

  studentEmail: {
    fontSize: 14,
    color: '#6b7280',
  },

  footer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    paddingVertical: 10,
    borderTopWidth: 1,
    borderColor: '#d4d4d8',
    backgroundColor: 'rgba(246,247,248,0.8)',
  },

  navItem: {
    alignItems: 'center',
  },

  navText: {
    fontSize: 12,
    color: '#6b7280',
    marginTop: 4,
  },

  navItemActive: {
    alignItems: 'center',
  },

  navTextActive: {
    fontSize: 12,
    color: '#1173d4',
    fontWeight: '600',
    marginTop: 4,
  },
})

import { View, Text } from 'react-native'
import { ActivityStatus } from '../dto/activity.dto'

export const ActivityStatusBadge = ({ status }: { status: ActivityStatus }) => {
  const getColors = () => {
    switch (status) {
      case 'APPROVED':
        return { bg: '#DCFCE7', text: '#166534' }
      case 'REJECTED':
        return { bg: '#FEE2E2', text: '#991B1B' }
      default:
        return { bg: '#FEF9C3', text: '#854D0E' }
    }
  }

  const { bg, text } = getColors()

  return (
    <View
      style={{
        alignSelf: 'flex-start',
        backgroundColor: bg,
        paddingHorizontal: 10,
        paddingVertical: 4,
        borderRadius: 12,
        marginBottom: 6,
      }}>
      <Text style={{ color: text, fontWeight: '600', fontSize: 12 }}>
        {status === 'PENDING' && 'Pendente'}
        {status === 'APPROVED' && 'Aprovada'}
        {status === 'REJECTED' && 'Reprovada'}
      </Text>
    </View>
  )
}

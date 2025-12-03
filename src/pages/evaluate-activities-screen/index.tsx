import React, { useEffect, useState } from 'react'
import { View, Text, TouchableOpacity, FlatList, SafeAreaView, Alert } from 'react-native'
import { MaterialIcons } from '@expo/vector-icons'
import { styles } from './styles'
import { useNavigation, useRoute } from '@react-navigation/native'
import { EvaluateActivitiesRouteProp } from '../../types/navigations'
import { useAuth } from '../../contexts/auth-context'
import { ActivityService } from '../../../services/activity-service'
import { Activity, ActivityStatus } from '../../dto/activity.dto'
import { ActivityStatusBadge } from '../../components/activity-status-badge'
import CustomSupervisorTabBar from '../../components/custom-supervisor-tab'

export default function EvaluateActivitiesScreen() {
  const route = useRoute<EvaluateActivitiesRouteProp>()
  const { username, userId } = route.params
  const { authData } = useAuth()
  const navigation = useNavigation()
  const [activities, setActivities] = useState<Array<Activity>>([])

  const fetchActivities = async () => {
    if (!authData) {
      navigation.navigate('Login')
      return
    }

    const response = await ActivityService.getAllActivities({
      orgId: authData?.org_id,
      userId,
    })

    setActivities(response)
  }

  useEffect(() => {
    fetchActivities()
  }, [])

  const setActivityStatus = async (id: string, status: ActivityStatus) => {
    const response = await ActivityService.setActivityStatus(status, id)

    if (response.status === 200) {
      fetchActivities()
      return
    }

    Alert.alert('Erro ao avaliar atividade')
  }

  const formatDate = (date: string) => {
    return new Date(date).toLocaleDateString('pt-BR')
  }

  const formatTime = (time: string) => {
    const date = new Date(time)

    return `${date.getHours()}:${date.getMinutes()}`
  }

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity style={styles.backButton}>
          <MaterialIcons name='arrow-back' size={26} color='#fff' />
        </TouchableOpacity>

        <Text style={styles.headerTitle}>Avaliar Atividades de {username}</Text>

        <View style={{ width: 32 }} />
      </View>

      <View style={styles.content}>
        <Text style={styles.sectionTitle}>Atividades Pendentes</Text>

        <FlatList
          data={activities}
          keyExtractor={(item) => item.id}
          showsVerticalScrollIndicator={false}
          contentContainerStyle={{ paddingBottom: 20 }}
          renderItem={({ item }) => (
            <View style={styles.card}>
              <View>
                <ActivityStatusBadge status={item.status} />
                <Text style={styles.cardDate}>{formatDate(item.created_at)}</Text>
                <Text style={styles.cardDescription}>{item.description}</Text>
                <Text
                  style={
                    styles.cardTime
                  }>{`${formatTime(item.start_time)} - ${formatTime(item.end_time)}`}</Text>
              </View>

              <View style={styles.cardButtons}>
                <TouchableOpacity
                  style={styles.rejectButton}
                  onPress={() => {
                    setActivityStatus(item.id, ActivityStatus.REJECTED)
                  }}>
                  <Text style={styles.rejectText}>Reprovar</Text>
                </TouchableOpacity>

                <TouchableOpacity
                  style={styles.approveButton}
                  onPress={() => {
                    setActivityStatus(item.id, ActivityStatus.APPROVED)
                  }}>
                  <Text style={styles.approveText}>Aprovar</Text>
                </TouchableOpacity>
              </View>
            </View>
          )}
        />
      </View>

      <CustomSupervisorTabBar activeTab='Estudantes' />
    </SafeAreaView>
  )
}

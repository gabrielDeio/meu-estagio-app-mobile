import React, { useEffect } from 'react'
import { View, Text, TouchableOpacity, FlatList, StyleSheet } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'
import { MaterialIcons } from '@react-native-vector-icons/material-icons'
import { useNavigation } from '@react-navigation/native'
import { Activity } from '../../dto/activity.dto'
import { useAuth } from '../../contexts/auth-context'
import { ActivityService } from '../../../services/activity-service'
import CustomTabBar from '../../components/custom-tab'

export default function ActivitiesScreen() {
  const navigation = useNavigation()
  const { authData } = useAuth()
  const [activities, setActivities] = React.useState<Activity[]>()

  const fetchActivities = async () => {
    if (!authData) {
      navigation.navigate('Login')
      return
    }

    const response = await ActivityService.getAllActivities({
      orgId: authData?.org_id,
      userId: authData?.user.id,
    })
    setActivities(response)
  }

  useEffect(() => {
    fetchActivities()
  }, [])

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Atividades</Text>
        <TouchableOpacity>
          <MaterialIcons name='add-circle' size={32} color='#1173d4' />
        </TouchableOpacity>
      </View>

      <View style={styles.body}>
        <TouchableOpacity
          style={styles.registerButton}
          onPress={() => navigation.navigate('RegisterActivityScreen')}>
          <MaterialIcons name='add' size={22} color='#fff' />
          <Text style={styles.registerButtonText}>Registrar Nova Atividade</Text>
        </TouchableOpacity>

        <Text style={styles.sectionTitle}>Atividades Registradas</Text>

        <FlatList
          data={activities}
          keyExtractor={(item) => item.id}
          contentContainerStyle={{ paddingBottom: 40 }}
          renderItem={({ item }) => (
            <TouchableOpacity style={styles.card}>
              <View style={{ flex: 1 }}>
                <Text style={styles.cardDate}>{item.start_time}</Text>
                <Text style={styles.cardTime}>{item.end_time}</Text>
                <Text style={styles.cardDescription}>{item.description}</Text>
              </View>

              <View style={styles.cardRight}>
                <View style={styles.statusBadge}>
                  <Text style={styles.statusText}>{item.status}</Text>
                </View>
                <MaterialIcons name='chevron-right' size={22} color='#999' />
              </View>
            </TouchableOpacity>
          )}
        />
      </View>

      <CustomTabBar activeTab='Atividades' />
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f6f7f8',
  },

  header: {
    padding: 16,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    borderBottomWidth: 1,
    borderBottomColor: '#ddd',
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#111',
  },

  body: {
    flex: 1,
    padding: 16,
  },

  registerButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 8,
    backgroundColor: '#1173d4',
    paddingVertical: 14,
    borderRadius: 10,
    marginBottom: 24,
  },
  registerButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },

  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 12,
    color: '#111',
  },

  card: {
    backgroundColor: '#fff',
    padding: 16,
    borderRadius: 10,
    flexDirection: 'row',
    marginBottom: 12,
    elevation: 2,
  },
  cardDate: {
    fontWeight: 'bold',
    fontSize: 15,
    marginBottom: 4,
  },
  cardTime: {
    fontSize: 13,
    color: '#666',
  },
  cardDescription: {
    marginTop: 6,
    color: '#333',
  },
  cardRight: {
    alignItems: 'flex-end',
    justifyContent: 'space-between',
  },
  statusBadge: {
    backgroundColor: '#fde68a',
    borderRadius: 8,
    paddingHorizontal: 6,
    paddingVertical: 2,
  },
  statusText: {
    fontSize: 11,
    fontWeight: 'bold',
    color: '#92400e',
  },

  navBar: {
    flexDirection: 'row',
    paddingVertical: 10,
    borderTopWidth: 1,
    borderTopColor: '#ddd',
    backgroundColor: '#f6f7f8',
    justifyContent: 'space-around',
  },
  navItem: {
    alignItems: 'center',
  },
  navItemActive: {
    alignItems: 'center',
  },
  navText: {
    fontSize: 12,
    color: '#666',
  },
  navTextActive: {
    fontSize: 12,
    fontWeight: 'bold',
    color: '#1173d4',
  },
})

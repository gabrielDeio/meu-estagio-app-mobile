import React, { useEffect } from 'react'
import { View, Text, TouchableOpacity, FlatList, StyleSheet, Alert } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'
import { MaterialIcons } from '@react-native-vector-icons/material-icons'
import { useNavigation } from '@react-navigation/native'
import { Activity } from '../../dto/activity.dto'
import { useAuth } from '../../contexts/auth-context'
import { ActivityService } from '../../../services/activity-service'
import CustomTabBar from '../../components/custom-tab'
import { ActivityDateField } from '../../components/activity-date-field'
import { ReportService } from '../../../services/report-service'

export default function ActivitiesScreen() {
  const navigation = useNavigation()
  const { authData } = useAuth()
  const [activities, setActivities] = React.useState<Activity[]>()
  const [filterVisible, setFilterVisible] = React.useState(false)
  const [startDate, setStartDate] = React.useState<string>('')
  const [endDate, setEndDate] = React.useState<string>('')

  const fetchActivities = async () => {
    if (!authData) {
      navigation.navigate('Login')
      return
    }

    const payload = {
      orgId: authData?.org_id,
      userId: authData?.user.id,
      initialDate: startDate,
      endDate,
    }
    const response = await ActivityService.getAllActivities(payload)
    setActivities(response)
  }

  const handleGenerateReport = async () => {
    if (!startDate && !endDate) {
      Alert.alert(
        'Erro',
        'Por favor, selecione uma data inicial e uma data final para gerar o relatório.',
      )
      return
    }

    if (!authData) {
      navigation.navigate('Login')
      return
    }

    await ReportService.generateReport({
      orgId: authData?.org_id,
      userId: authData?.user.id,
      initialDate: startDate,
      endDate,
    })
  }

  useEffect(() => {
    fetchActivities()
  }, [startDate, endDate])

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Atividades</Text>

        <View style={styles.headerRight}>
          <TouchableOpacity
            style={styles.clearChip}
            onPress={() => {
              setStartDate('')
              setEndDate('')
            }}>
            <MaterialIcons name='close' size={14} color='#1173d4' />
            <Text style={styles.clearChipText}>Limpar</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.filterButton} onPress={() => setFilterVisible(true)}>
            <MaterialIcons name='filter-alt' size={26} color='#1173d4' />
          </TouchableOpacity>
        </View>
      </View>

      <View style={styles.body}>
        <TouchableOpacity
          style={styles.registerButton}
          onPress={() => navigation.navigate('RegisterActivityScreen')}>
          <MaterialIcons name='add' size={22} color='#fff' />
          <Text style={styles.registerButtonText}>Registrar Nova Atividade</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.reportButton} onPress={() => handleGenerateReport()}>
          <MaterialIcons name='insert-chart' size={22} color='#1173d4' />
          <Text style={styles.reportButtonText}>Gerar Relatório de Atividades</Text>
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

      {filterVisible && (
        <View style={styles.modalOverlay}>
          <View style={styles.modalContent}>
            <Text style={styles.modalTitle}>Filtrar por Data</Text>

            <ActivityDateField label='Data Inicial' value={startDate} onChange={setStartDate} />

            <ActivityDateField label='Data Final' value={endDate} onChange={setEndDate} />

            <View style={styles.modalActions}>
              <TouchableOpacity style={styles.modalCancel} onPress={() => setFilterVisible(false)}>
                <Text style={styles.modalCancelText}>Cancelar</Text>
              </TouchableOpacity>

              <TouchableOpacity
                style={styles.modalApply}
                onPress={() => {
                  console.log('Filtro aplicado:', startDate, endDate)
                  setFilterVisible(false)
                }}>
                <Text style={styles.modalApplyText}>Aplicar</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      )}
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
  headerRight: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
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

  reportButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 8,
    backgroundColor: '#e6f0fb',
    paddingVertical: 12,
    borderRadius: 10,
    marginBottom: 24,
    borderWidth: 1,
    borderColor: '#1173d4',
  },

  reportButtonText: {
    color: '#1173d4',
    fontSize: 15,
    fontWeight: 'bold',
  },

  filterButton: {
    padding: 4,
  },

  modalOverlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'rgba(0,0,0,0.35)',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },

  modalContent: {
    width: '100%',
    backgroundColor: '#fff',
    padding: 20,
    borderRadius: 12,
    elevation: 5,
  },

  modalTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'center',
    color: '#111',
  },

  dateButton: {
    backgroundColor: '#e6f0fb',
    paddingVertical: 12,
    borderRadius: 10,
    marginBottom: 12,
    borderWidth: 1,
    borderColor: '#1173d4',
    alignItems: 'center',
  },

  dateButtonText: {
    color: '#1173d4',
    fontSize: 15,
    fontWeight: 'bold',
  },

  modalActions: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 20,
  },

  modalCancel: {
    paddingVertical: 10,
    paddingHorizontal: 20,
    backgroundColor: '#ddd',
    borderRadius: 8,
  },

  modalCancelText: {
    color: '#333',
    fontWeight: 'bold',
  },

  modalApply: {
    paddingVertical: 10,
    paddingHorizontal: 20,
    backgroundColor: '#1173d4',
    borderRadius: 8,
  },

  modalApplyText: {
    color: '#fff',
    fontWeight: 'bold',
  },

  clearFiltersButtonIcon: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#1173d4',
    backgroundColor: '#e6f2ff',
  },
  clearFiltersButton: {
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#1173d4',
    backgroundColor: '#e6f2ff',
  },

  clearFiltersText: {
    color: '#1173d4',
    fontWeight: 'bold',
    fontSize: 13,
  },

  clearChip: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 4,
    paddingHorizontal: 10,
    backgroundColor: '#e9f3ff',
    borderColor: '#1173d4',
    borderWidth: 1,
    borderRadius: 20,
  },

  clearChipText: {
    color: '#1173d4',
    fontSize: 13,
    fontWeight: '600',
    marginLeft: 4,
  },
})

import React, { useEffect } from 'react'
import { View, Text, TouchableOpacity, StyleSheet, ScrollView, Alert } from 'react-native'
import { MaterialIcons } from '@react-native-vector-icons/material-icons'
import styles from './styles'
import { useAuth } from '../../contexts/auth-context'
import { ActivityService } from '../../../services/activity-service'
import { useNavigation } from '@react-navigation/native'
import { Activity, ActivityStatus } from '../../dto/activity.dto'
import { UserWithoutPassword } from '../../types/auth'
import { OrganizationService } from '../../../services/organization-service'
import CustomTabBar from '../../components/custom-tab'

interface Stats {
  registeredActivities: number
  totalHours: number
  pendingActivities: number
}

export default function HomeScreen() {
  const { authData, signOut } = useAuth()
  const navigation = useNavigation()
  const [stats, setStats] = React.useState<Stats>({
    registeredActivities: 0,
    totalHours: 0,
    pendingActivities: 0,
  })
  const [supervisor, setSupervisor] = React.useState<UserWithoutPassword>()

  function calculateActivityStats(activities: Activity[]): Stats {
    let totalHours = 0
    let pendingActivities = 0

    for (const activity of activities) {
      if (activity.status === ActivityStatus.PENDING) {
        pendingActivities++
      }

      const start = new Date(activity.start_time)
      const end = new Date(activity.end_time)

      if (!isNaN(start.getTime()) && !isNaN(end.getTime())) {
        const diffMs = end.getTime() - start.getTime()
        const diffHours = diffMs / (1000 * 60 * 60)
        totalHours += diffHours
      }
    }

    return {
      registeredActivities: activities.length,
      totalHours,
      pendingActivities,
    }
  }

  const handleLogout = () => {
    Alert.alert(
      'Sair da Conta',
      'Tem certeza que deseja fazer logout?',
      [
        // Botão Cancelar (opcional)
        {
          text: 'Cancelar',
          style: 'cancel',
        },
        // Botão Confirmar (chama o logout)
        {
          text: 'Sair',
          style: 'destructive',
          onPress: async () => {
            // Chama a função de logout do contexto de autenticação
            signOut()
            navigation.navigate('Login')
            // O contexto de autenticação deve lidar com a navegação para a tela de Login
            // Caso contrário, adicione: navigation.replace('Login');
          },
        },
      ],
      { cancelable: true },
    )
  }

  const updateMetrics = async () => {
    if (!authData) {
      navigation.navigate('Login')
      return
    }

    const activities = await ActivityService.getAllActivities({
      userId: authData?.user.id,
      orgId: authData?.org_id,
    })

    const orgSupervisor = await OrganizationService.getOrgSupervisor(authData?.org_id)
    setSupervisor(orgSupervisor)

    if (activities.length === 0) {
      return
    }

    const statsCalculated = calculateActivityStats(activities)
    setStats(statsCalculated)
  }

  useEffect(() => {
    updateMetrics()
  }, [])

  const organizacao = {
    nome: 'Empresa de Tecnologia Inova',
    supervisor: 'Dr. Ricardo Almeida',
  }

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Home</Text>

        <TouchableOpacity style={styles.settingsButton}>
          <MaterialIcons name='logout' size={28} color='#000' onPress={() => handleLogout()} />
        </TouchableOpacity>
      </View>

      <ScrollView style={styles.main} contentContainerStyle={{ paddingBottom: 20 }}>
        <Text style={styles.sectionTitle}>Estatísticas Gerais</Text>

        <View style={styles.grid}>
          <View style={styles.card}>
            <Text style={styles.cardLabel}>Atividades Registradas</Text>
            <Text style={styles.cardValue}>{stats?.registeredActivities}</Text>
          </View>

          <View style={styles.card}>
            <Text style={styles.cardLabel}>Horas Totais</Text>
            <Text style={styles.cardValue}>{stats?.totalHours}</Text>
          </View>

          <View style={[styles.card, styles.cardFull]}>
            <Text style={styles.cardLabel}>Atividades Pendentes</Text>
            <Text style={[styles.cardValue, { color: '#1173d4' }]}>{stats?.pendingActivities}</Text>
          </View>
        </View>

        <Text style={[styles.sectionTitle, { marginTop: 24 }]}>Dados da Organização</Text>

        <View style={styles.organizationCard}>
          <View style={styles.organizationIcon}>
            <MaterialIcons name='business-center' size={30} color='#1173d4' />
          </View>

          <View>
            <Text style={styles.orgName}>{organizacao.nome}</Text>
            <Text style={styles.orgSupervisor}>
              Supervisor: {`${supervisor?.name} ${supervisor?.surname}`}
            </Text>
          </View>
        </View>
      </ScrollView>

      <CustomTabBar activeTab='Home' />
    </View>
  )
}

import React, { use, useEffect, useState } from 'react'
import { View, Text, Image, TouchableOpacity, ScrollView, Alert } from 'react-native'
import { MaterialIcons } from '@expo/vector-icons'
import styles from './styles'
import { useAuth } from '../../contexts/auth-context'
import { UserWithoutPassword } from '../../types/auth'
import { useNavigation } from '@react-navigation/native'
import { OrganizationService } from '../../../services/organization-service'
import { OrganizationData } from '../organization-screen'
import { AccountTypeEnum } from '../../dto/register-user.dto'
import CustomTabBar from '../../components/custom-tab'
import CustomSupervisorTabBar from '../../components/custom-supervisor-tab'

export const ProfileScreen: React.FC = () => {
  const { authData, signOut } = useAuth()
  const user = authData?.user
  const navigation = useNavigation()
  const [organization, setOrganization] = useState<OrganizationData>()

  const handleLogout = () => {
    Alert.alert(
      'Sair da Conta',
      'Tem certeza que deseja fazer logout?',
      [
        {
          text: 'Cancelar',
          style: 'cancel',
        },
        {
          text: 'Sair',
          style: 'destructive',
          onPress: async () => {
            signOut()
            navigation.navigate('Login')
          },
        },
      ],
      { cancelable: true },
    )
  }

  const renderTabBar = (userType: AccountTypeEnum | undefined) => {
    if (!userType) {
      navigation.navigate('Login')
      return
    }

    if (userType === AccountTypeEnum.STUDENT) {
      return <CustomTabBar activeTab='Perfil' />
    }
    return <CustomSupervisorTabBar activeTab='Perfil' />
  }

  useEffect(() => {
    async function fetchOrganizationData() {
      if (!authData) {
        navigation.navigate('Login')
        return
      }
      const response = await OrganizationService.getOrganization(authData?.org_id)
      setOrganization(response)
    }
    fetchOrganizationData()
  }, [])

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <View style={{ width: 32 }} />
        <Text style={styles.headerTitle}>Perfil</Text>

        <TouchableOpacity style={styles.headerButton}>
          <MaterialIcons name='edit' size={22} color='#666' />
        </TouchableOpacity>
      </View>

      <ScrollView style={styles.scroll} contentContainerStyle={{ paddingBottom: 120 }}>
        <View style={styles.profileBox}>
          <View style={styles.avatar}>
            <MaterialIcons name='person' size={28} color='#6b7280' />
          </View>

          <Text style={styles.name}>{user?.name}</Text>
          <Text style={styles.role}>{user?.type}</Text>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Informações Pessoais</Text>

          <View style={styles.card}>
            <View style={styles.cardRow}>
              <Text style={styles.cardLabel}>Email</Text>
              <Text style={styles.cardValue}>{user?.email}</Text>
            </View>
          </View>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Vínculo com a Organização</Text>

          <View style={styles.card}>
            <View style={styles.option}>
              <Text style={styles.cardLabel}>Organização</Text>
              <Text style={styles.cardValue}>{organization?.name}</Text>
            </View>
          </View>
        </View>

        <TouchableOpacity style={styles.logoutButton} onPress={handleLogout}>
          <Text style={styles.logoutText}>Sair</Text>
        </TouchableOpacity>
      </ScrollView>

      {renderTabBar(authData?.user.type)}
    </View>
  )
}

export default ProfileScreen

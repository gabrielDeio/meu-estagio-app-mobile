import React from 'react'
import { View, Text, TouchableOpacity, ScrollView } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'
import { MaterialIcons } from '@expo/vector-icons'
import { styles } from './styles'
import { useNavigation } from '@react-navigation/native'
import CustomSupervisorTabBar from '../../components/custom-supervisor-tab'

const mockOrganization = {
  name: 'Tech Solutions Inc.',
  inviteCode: 'XYZ123',
}

const OrganizationScreen: React.FC = () => {
  const navigation = useNavigation()

  const handleCopyCode = () => {
    console.log('copiar código:', mockOrganization.inviteCode)
  }

  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <MaterialIcons name='arrow-back' size={24} color='#18181B' />
        </TouchableOpacity>

        <Text style={styles.headerTitle}>Minha Organização</Text>

        <View style={{ width: 24 }} />
      </View>

      <ScrollView style={styles.content} contentContainerStyle={{ paddingBottom: 40 }}>
        <Text style={styles.sectionTitle}>Detalhes da Organização</Text>

        <View style={styles.orgCard}>
          <View style={styles.orgIconContainer}>
            <MaterialIcons name='apartment' size={26} color='#1173d4' />
          </View>

          <View style={{ flex: 1 }}>
            <Text style={styles.label}>Nome da Organização</Text>
            <Text style={styles.orgName}>{mockOrganization.name}</Text>
          </View>

          <TouchableOpacity>
            <MaterialIcons name='edit' size={24} color='#1173d4' />
          </TouchableOpacity>
        </View>

        <View style={styles.inviteCard}>
          <Text style={styles.label}>Código de Convite</Text>

          <View style={styles.inviteRow}>
            <Text style={styles.inviteCode}>{mockOrganization.inviteCode}</Text>

            <TouchableOpacity style={styles.inviteButton} onPress={handleCopyCode}>
              <MaterialIcons name='content-copy' size={16} color='#fff' />
              <Text style={styles.inviteButtonText}>Copiar</Text>
            </TouchableOpacity>
          </View>
        </View>

        <TouchableOpacity style={styles.manageMembersButton}>
          <Text style={styles.manageMembersText}>Gerenciar Membros</Text>
          <MaterialIcons name='chevron-right' size={24} color='#18181B' />
        </TouchableOpacity>
      </ScrollView>

      <CustomSupervisorTabBar activeTab='Organização' />
    </SafeAreaView>
  )
}

export default OrganizationScreen

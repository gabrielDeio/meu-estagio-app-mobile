import React, { useEffect, useState } from 'react'
import {
  View,
  Text,
  TextInput,
  Image,
  TouchableOpacity,
  FlatList,
  SafeAreaView,
} from 'react-native'
import { MaterialIcons } from '@expo/vector-icons'
import { styles } from './styles'
import { UserWithoutPassword } from '../../types/auth'
import { OrganizationService } from '../../../services/organization-service'
import { useAuth } from '../../contexts/auth-context'
import { useNavigation } from '@react-navigation/native'
import CustomSupervisorTabBar from '../../components/custom-supervisor-tab'

export default function StudentsScreen() {
  const [query, setQuery] = useState('')
  const [students, setStudents] = useState<Array<UserWithoutPassword>>()
  const { authData } = useAuth()
  const navigation = useNavigation()

  const filtered = students?.filter((s) => s.name.toLowerCase().includes(query.toLowerCase()))

  const fetchStudents = async () => {
    if (!authData) {
      navigation.navigate('Login')
      return
    }
    try {
      const response: Array<UserWithoutPassword> =
        await OrganizationService.getStudentsOrganization(authData.org_id)

      setStudents(response)
    } catch (error) {
      console.log(error)
    }
  }

  useEffect(() => {
    fetchStudents()
  }, [])

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity style={styles.backButton}>
          <MaterialIcons name='arrow-back' size={26} color='#fff' />
        </TouchableOpacity>

        <Text style={styles.headerTitle}>Estudantes da Organização</Text>
      </View>

      <View style={styles.searchContainer}>
        <MaterialIcons name='search' color='#9ca3af' size={20} style={styles.searchIcon} />
        <TextInput
          style={styles.searchInput}
          placeholder='Buscar estudantes'
          placeholderTextColor='#9ca3af'
          value={query}
          onChangeText={setQuery}
        />
      </View>

      <FlatList
        data={filtered}
        keyExtractor={(item) => item.id}
        contentContainerStyle={styles.listContainer}
        renderItem={({ item }) => (
          <TouchableOpacity
            style={styles.studentRow}
            onPress={() => {
              navigation.navigate('EvaluateActivitiesScreen', {
                username: item.name,
                userId: item.id,
              })
            }}>
            <View
              style={{
                width: 48,
                height: 48,
                borderRadius: 24,
                backgroundColor: '#e5e7eb',
                alignItems: 'center',
                justifyContent: 'center',
              }}>
              <MaterialIcons name='person' size={28} color='#6b7280' />
            </View>

            <View style={styles.studentInfo}>
              <Text style={styles.studentName}>{item.name}</Text>
              <Text style={styles.studentEmail}>{item.email}</Text>
            </View>
          </TouchableOpacity>
        )}
      />

      <CustomSupervisorTabBar activeTab='Estudantes' />
    </SafeAreaView>
  )
}

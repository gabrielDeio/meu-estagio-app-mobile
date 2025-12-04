import React from 'react'
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  StyleProp,
  ViewStyle,
  TextStyle,
} from 'react-native'
import { MaterialIcons } from '@react-native-vector-icons/material-icons'
import { useNavigation, NavigationProp, ParamListBase } from '@react-navigation/native'

type SupervisorTabName = 'Estudantes' | 'Organização' | 'Perfil'

interface SupervisorTabItem {
  name: SupervisorTabName
  icon: string
  route: string
}

const SUPERVISOR_TABS: SupervisorTabItem[] = [
  { name: 'Estudantes', icon: 'groups', route: 'StudentsScreen' },
  { name: 'Organização', icon: 'apartment', route: 'OrganizationScreen' },
  { name: 'Perfil', icon: 'person', route: 'ProfileScreen' },
]

interface CustomSupervisorTabBarProps {
  activeTab: SupervisorTabName
}

const CustomSupervisorTabBar: React.FC<CustomSupervisorTabBarProps> = ({ activeTab }) => {
  const navigation = useNavigation<NavigationProp<ParamListBase>>()

  const handlePress = (route: string) => {
    navigation.navigate(route)
  }

  return (
    <View style={styles.navBar}>
      {SUPERVISOR_TABS.map((tab) => {
        const isActive = tab.name === activeTab
        const color = isActive ? '#1173d4' : '#4A4A4A' // Cor ativa e inativa

        return (
          <TouchableOpacity
            key={tab.name}
            style={isActive ? styles.navItemActive : styles.navItem}
            onPress={() => handlePress(tab.route)}
            accessible
            accessibilityLabel={`Aba ${tab.name}`}>
            <MaterialIcons name={tab.icon as any} size={24} color={color} />
            <Text style={isActive ? styles.navTextActive : styles.navText}>{tab.name}</Text>
          </TouchableOpacity>
        )
      })}
    </View>
  )
}

export default CustomSupervisorTabBar

export const styles = StyleSheet.create({
  navBar: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    height: 60,
    backgroundColor: '#fff',
    borderTopWidth: 1,
    borderTopColor: '#e0e0e0',
    paddingHorizontal: 8,
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    elevation: 4,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: -2 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
  },
  navItem: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 8,
  },
  navItemActive: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 8,
  },
  navText: {
    fontSize: 12,
    color: '#4A4A4A',
    marginTop: 4,
  },
  navTextActive: {
    fontSize: 12,
    color: '#1173d4',
    fontWeight: 'bold',
    marginTop: 4,
  },
})

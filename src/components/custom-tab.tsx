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

type TabName = 'Home' | 'Atividades' | 'Perfil'

interface TabItem {
  name: TabName
  icon: string
  route: string
}

const TABS: TabItem[] = [
  { name: 'Home', icon: 'home', route: 'HomeScreen' },
  { name: 'Atividades', icon: 'list-alt', route: 'ActivitiesScreen' }, // Ajuste o nome da rota
  { name: 'Perfil', icon: 'person', route: 'ProfileScreen' },
]

interface CustomTabBarProps {
  activeTab: TabName
}

const CustomTabBar: React.FC<CustomTabBarProps> = ({ activeTab }) => {
  const navigation = useNavigation<NavigationProp<ParamListBase>>()

  const handlePress = (route: string) => {
    navigation.navigate(route)
  }

  return (
    <View style={styles.navBar}>
      {TABS.map((tab) => {
        const isActive = tab.name === activeTab
        const color = isActive ? '#1173d4' : '#666'

        return (
          <TouchableOpacity
            key={tab.name}
            style={isActive ? styles.navItemActive : styles.navItem}
            onPress={() => handlePress(tab.route)}
            accessible
            accessibilityLabel={`Aba ${tab.name}`}>
            <MaterialIcons name={tab.icon as any} size={26} color={color} />
            <Text style={isActive ? styles.navTextActive : styles.navText}>{tab.name}</Text>
          </TouchableOpacity>
        )
      })}
    </View>
  )
}

export default CustomTabBar

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
  },
  navItem: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 4,
    flex: 1,
  },
  navItemActive: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 4,
    flex: 1,
  },
  navText: {
    fontSize: 12,
    color: '#666',
    marginTop: 2,
  },
  navTextActive: {
    fontSize: 12,
    color: '#1173d4',
    fontWeight: 'bold',
    marginTop: 2,
  },
})

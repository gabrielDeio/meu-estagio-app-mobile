import React, { useState } from 'react'
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  ScrollView,
  Alert,
  KeyboardAvoidingView,
  Platform,
} from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'
import { useNavigation } from '@react-navigation/native'
import { MaterialIcons } from '@react-native-vector-icons/material-icons'
import { styles } from './styles'
import DateTimePicker from '@react-native-community/datetimepicker'
import { useAuth } from '../../contexts/auth-context'
import { ActivityService } from '../../../services/activity-service'

interface ActivityForm {
  name: string
  date: Date | null
  startTime: Date | null
  endTime: Date | null
  description: string
}

const initialForm: ActivityForm = {
  name: '',
  date: null,
  startTime: null,
  endTime: null,
  description: '',
}

type PickerMode = 'date' | 'time' | undefined
type PickerField = 'date' | 'startTime' | 'endTime'

const RegisterActivityScreen: React.FC = () => {
  const navigation = useNavigation()
  const [form, setForm] = useState<ActivityForm>(initialForm)
  const [isSaving, setIsSaving] = useState(false)
  const [showPicker, setShowPicker] = useState(false)
  const [pickerMode, setPickerMode] = useState<PickerMode>('date')
  const [currentPickerField, setCurrentPickerField] = useState<PickerField>('date')
  const { authData } = useAuth()

  const handleChange = (key: keyof ActivityForm, value: string | Date | null) => {
    setForm((prev) => ({ ...prev, [key]: value }))
  }

  const handleOpenPicker = (mode: PickerMode, field: PickerField) => {
    setPickerMode(mode)
    setCurrentPickerField(field)
    setShowPicker(true)
  }

  const handleSelectDateTime = (event: any, selectedValue?: Date) => {
    if (Platform.OS !== 'ios') {
      setShowPicker(false)
    }

    if (selectedValue) {
      handleChange(currentPickerField, selectedValue)
    } else if (Platform.OS === 'android') {
      setShowPicker(false)
    }
  }

  const handleSave = async () => {
    if (!form.name || !form.date || !form.startTime || !form.endTime || !form.description) {
      Alert.alert('Erro', 'Por favor, preencha todos os campos.')
      return
    }

    if (!authData?.org_id || !authData?.user.id) {
      Alert.alert('Erro de Autenticação', 'Dados do usuário não disponíveis.')
      return
    }

    const formatDateToISO = (date: Date, time: Date) => {
      const combinedDateTime = new Date(
        date.getFullYear(),
        date.getMonth(),
        date.getDate(),
        time.getHours(),
        time.getMinutes(),
        time.getSeconds(),
      )
      return combinedDateTime.toISOString()
    }

    const payload = {
      name: form.name,
      description: form.description,
      start_time: formatDateToISO(form.date, form.startTime),
      end_time: formatDateToISO(form.date, form.endTime),
      org_id: authData.org_id,
      user_id: authData.user.id,
    }

    setIsSaving(true)
    try {
      await ActivityService.registerActivity(payload)

      await new Promise((resolve) => setTimeout(resolve, 1500))
      Alert.alert('Sucesso', 'Atividade registrada com sucesso!')
      navigation.goBack()
    } catch (error) {
      console.error('Erro ao salvar atividade:', error)
      Alert.alert('Erro', 'Ocorreu um erro ao tentar salvar a atividade.')
    } finally {
      setIsSaving(false)
    }
  }

  const displayDate = form.date ? form.date.toLocaleDateString('pt-BR') : 'Selecione a data'
  const displayTime = (time: Date | null) =>
    time
      ? time.toLocaleTimeString('pt-BR', { hour: '2-digit', minute: '2-digit' })
      : 'Selecione a hora'

  return (
    <SafeAreaView style={styles.safeArea}>
      <KeyboardAvoidingView
        style={styles.flex}
        behavior={Platform.OS === 'ios' ? 'padding' : undefined}>
        <View style={styles.header}>
          <TouchableOpacity
            accessible
            accessibilityLabel='Fechar'
            onPress={() => navigation.goBack()}
            style={styles.iconButton}>
            <MaterialIcons name='close' size={24} color='#374151' />
          </TouchableOpacity>

          <Text style={styles.title}>Registrar Nova Atividade</Text>
          <View style={styles.iconPlaceholder} />
        </View>

        <ScrollView contentContainerStyle={styles.content} keyboardShouldPersistTaps='handled'>
          <View style={styles.field}>
            <Text style={styles.label}>Título da Atividade</Text>
            <TextInput
              style={styles.input}
              placeholder='Ex: Desenvolvimento de Feature X'
              placeholderTextColor='#9ca3af'
              value={form.name}
              onChangeText={(v) => handleChange('name', v)}
              returnKeyType='next'
            />
          </View>

          <View style={styles.field}>
            <Text style={styles.label}>Data da Atividade</Text>
            <TouchableOpacity style={styles.input} onPress={() => handleOpenPicker('date', 'date')}>
              <Text style={form.date ? styles.inputText : styles.placeholder}>{displayDate}</Text>
            </TouchableOpacity>
          </View>

          <View style={styles.row}>
            <View style={styles.halfField}>
              <Text style={styles.label}>Hora de Início</Text>
              <TouchableOpacity
                style={styles.input}
                onPress={() => handleOpenPicker('time', 'startTime')}>
                <Text style={form.startTime ? styles.inputText : styles.placeholder}>
                  {displayTime(form.startTime)}
                </Text>
              </TouchableOpacity>
            </View>

            <View style={styles.halfField}>
              <Text style={styles.label}>Hora de Fim</Text>
              <TouchableOpacity
                style={styles.input}
                onPress={() => handleOpenPicker('time', 'endTime')}>
                <Text style={form.endTime ? styles.inputText : styles.placeholder}>
                  {displayTime(form.endTime)}
                </Text>
              </TouchableOpacity>
            </View>
          </View>

          <View style={styles.field}>
            <Text style={styles.label}>Descrição das Tarefas Realizadas</Text>
            <TextInput
              style={styles.textArea}
              placeholder='Descreva as tarefas realizadas durante o estágio'
              placeholderTextColor='#9ca3af'
              value={form.description}
              onChangeText={(v) => handleChange('description', v)}
              multiline
              numberOfLines={5}
              textAlignVertical='top'
            />
          </View>
        </ScrollView>

        <View style={styles.footer}>
          <TouchableOpacity
            style={[styles.saveButton, isSaving && styles.saveButtonDisabled]}
            onPress={handleSave}
            disabled={isSaving}
            accessible
            accessibilityLabel='Salvar Atividade'>
            <Text style={styles.saveButtonText}>
              {isSaving ? 'Salvando...' : 'Salvar Atividade'}
            </Text>
          </TouchableOpacity>

          {showPicker && (
            <DateTimePicker
              value={form[currentPickerField] || new Date()}
              mode={pickerMode}
              display='default'
              onChange={handleSelectDateTime}
            />
          )}
        </View>
      </KeyboardAvoidingView>
    </SafeAreaView>
  )
}

export default RegisterActivityScreen

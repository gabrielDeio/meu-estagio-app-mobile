import React, { useState } from 'react'
import { View, Text, TouchableOpacity } from 'react-native'
import DateTimePicker, { DateTimePickerEvent } from '@react-native-community/datetimepicker'

interface ActivityDateFieldProps {
  label: string
  value: string | null
  onChange: (newDate: string) => void
}

export const ActivityDateField: React.FC<ActivityDateFieldProps> = ({ label, value, onChange }) => {
  const [showPicker, setShowPicker] = useState(false)

  const handleChange = (event: DateTimePickerEvent, selectedDate?: Date) => {
    setShowPicker(false)

    if (event.type === 'dismissed' || !selectedDate) return

    const formatted = selectedDate.toISOString().split('T')[0]
    onChange(formatted)
  }

  return (
    <View style={{ marginBottom: 14 }}>
      <Text style={{ fontSize: 15, marginBottom: 6 }}>{label}</Text>

      <TouchableOpacity
        style={{
          padding: 12,
          backgroundColor: '#e6f0fb',
          borderRadius: 10,
          borderWidth: 1,
          borderColor: '#1173d4',
        }}
        onPress={() => setShowPicker(true)}>
        <Text style={{ color: '#1173d4', fontWeight: 'bold' }}>{value || 'Selecione a data'}</Text>
      </TouchableOpacity>

      {showPicker && (
        <DateTimePicker
          mode='date'
          display='spinner'
          value={value ? new Date(value) : new Date()}
          onChange={handleChange}
        />
      )}
    </View>
  )
}

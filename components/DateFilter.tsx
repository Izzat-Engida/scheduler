import { View, Text, TouchableOpacity, StyleSheet, ScrollView } from 'react-native';
import React from 'react';
import dayjs from 'dayjs';
import weekOfYear from 'dayjs/plugin/weekOfYear';
import { useTaskStore } from '@/store/tasksStore';

dayjs.extend(weekOfYear);

const DateFilter = () => {
  const { selectedDate, setSelectedDate, viewMode, setViewMode } = useTaskStore();
  
  const getWeekDays = () => {
    const startOfWeek = dayjs(selectedDate).startOf('week');
    return Array.from({ length: 7 }, (_, i) => startOfWeek.add(i, 'day'));
  };

  const getMonthDays = () => {
    const startOfMonth = dayjs(selectedDate).startOf('month');
    const daysInMonth = dayjs(selectedDate).daysInMonth();
    return Array.from({ length: daysInMonth }, (_, i) => startOfMonth.add(i, 'day'));
  };

  const changeDate = (direction: 'prev' | 'next') => {
    const amount = direction === 'prev' ? -1 : 1;
    let newDate;
    
    switch (viewMode) {
      case 'day':
        newDate = dayjs(selectedDate).add(amount, 'day');
        break;
      case 'week':
        newDate = dayjs(selectedDate).add(amount, 'week');
        break;
      case 'month':
        newDate = dayjs(selectedDate).add(amount, 'month');
        break;
      default:
        newDate = dayjs(selectedDate);
    }
    
    setSelectedDate(newDate.format('YYYY-MM-DD'));
  };

  const renderDateButtons = () => {
    if (viewMode === 'week') {
      return (
        <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.weekScroll}>
          {getWeekDays().map((date, index) => {
            const dateStr = date.format('YYYY-MM-DD');
            const isSelected = dateStr === selectedDate;
            const isToday = dateStr === dayjs().format('YYYY-MM-DD');
            
            return (
              <TouchableOpacity
                key={index}
                style={[
                  styles.dateButton,
                  isSelected && styles.selectedDateButton,
                  isToday && styles.todayButton
                ]}
                onPress={() => setSelectedDate(dateStr)}
              >
                <Text style={[styles.dayName, isSelected && styles.selectedText]}>
                  {date.format('ddd')}
                </Text>
                <Text style={[styles.dayNumber, isSelected && styles.selectedText]}>
                  {date.format('D')}
                </Text>
              </TouchableOpacity>
            );
          })}
        </ScrollView>
      );
    }
    
    return null;
  };

  return (
    <View style={styles.container}>
      <View style={styles.monthYearRow}>
        <TouchableOpacity onPress={() => changeDate('prev')}>
          <Text style={styles.navButton}>←</Text>
        </TouchableOpacity>
        
        <Text style={styles.monthYearText}>
          {dayjs(selectedDate).format(viewMode === 'day' ? 'MMMM D, YYYY' : 'MMMM YYYY')}
        </Text>
        
        <TouchableOpacity onPress={() => changeDate('next')}>
          <Text style={styles.navButton}>→</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.viewModeRow}>
        {(['day', 'week', 'month'] as const).map((mode) => (
          <TouchableOpacity
            key={mode}
            style={[styles.viewModeButton, viewMode === mode && styles.activeViewMode]}
            onPress={() => setViewMode(mode)}
          >
            <Text style={[styles.viewModeText, viewMode === mode && styles.activeViewModeText]}>
              {mode.charAt(0).toUpperCase() + mode.slice(1)}
            </Text>
          </TouchableOpacity>
        ))}
      </View>

      {renderDateButtons()}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#fff',
    paddingVertical: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#e5e7eb',
  },
  monthYearRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
    marginBottom: 10,
  },
  navButton: {
    fontSize: 24,
    color: '#147bf0',
    paddingHorizontal: 10,
  },
  monthYearText: {
    fontSize: 18,
    fontWeight: '600',
    color: '#1f2937',
  },
  viewModeRow: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginBottom: 10,
  },
  viewModeButton: {
    paddingHorizontal: 20,
    paddingVertical: 8,
    marginHorizontal: 5,
    borderRadius: 20,
    backgroundColor: '#f3f4f6',
  },
  activeViewMode: {
    backgroundColor: '#147bf0',
  },
  viewModeText: {
    color: '#6b7280',
    fontWeight: '500',
  },
  activeViewModeText: {
    color: '#fff',
  },
  weekScroll: {
    paddingHorizontal: 10,
  },
  dateButton: {
    alignItems: 'center',
    paddingHorizontal: 12,
    paddingVertical: 8,
    marginHorizontal: 4,
    borderRadius: 8,
    backgroundColor: '#f9fafb',
    minWidth: 50,
  },
  selectedDateButton: {
    backgroundColor: '#147bf0',
  },
  todayButton: {
    borderWidth: 1,
    borderColor: '#147bf0',
  },
  dayName: {
    fontSize: 12,
    color: '#6b7280',
    marginBottom: 4,
  },
  dayNumber: {
    fontSize: 16,
    fontWeight: '600',
    color: '#1f2937',
  },
  selectedText: {
    color: '#fff',
  },
});

export default DateFilter;
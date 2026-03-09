import React, { useState, useMemo } from 'react';
import { View, StyleSheet, Text } from 'react-native';
import { Calendar } from 'react-native-calendars';
import dayjs from 'dayjs';
import { useTaskStore } from '@/store/tasksStore';
import Timeline from '@/components/TimeLine';

const CalendarScreen = () => {
  const { tasks } = useTaskStore();
  const [selectedDate, setSelectedDate] = useState(dayjs().format('YYYY-MM-DD'));

  
  const filteredTasks = useMemo(() => {
    return tasks.filter(task => 
      dayjs(task.start).format('YYYY-MM-DD') === selectedDate
    );
  }, [tasks, selectedDate]);

  
  const markedDates = useMemo(() => {
    const marks: any = {};
    
    
    tasks.forEach(task => {
      const date = dayjs(task.start).format('YYYY-MM-DD');
      marks[date] = { marked: true, dotColor: '#748FFC' };
    });

    
    marks[selectedDate] = {
      ...marks[selectedDate],
      selected: true,
      selectedColor: '#147bf0',
    };

    return marks;
  }, [tasks, selectedDate]);

  return (
    <View style={styles.container}>
      {/* Top Half: Calendar */}
      <View style={styles.calendarContainer}>
        <Calendar
          current={selectedDate}
          onDayPress={day => setSelectedDate(day.dateString)}
          markedDates={markedDates}
          theme={{
            todayTextColor: '#147bf0',
            arrowColor: '#147bf0',
            indicatorColor: '#147bf0',
            textDayFontWeight: '500',
            textMonthFontWeight: 'bold',
            textDayHeaderFontWeight: '500',
          }}
        />
      </View>

      {/* Bottom Half: Events List */}
      <View style={styles.listContainer}>
        <View style={styles.header}>
          <Text style={styles.headerTitle}>
            {dayjs(selectedDate).format('MMMM D, YYYY')}
          </Text>
          <Text style={styles.taskCount}>
            {filteredTasks.length} {filteredTasks.length === 1 ? 'Task' : 'Tasks'}
          </Text>
        </View>

        <Timeline tasks={filteredTasks} />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  calendarContainer: {
    paddingBottom: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#F3F4F6',
  },
  listContainer: {
    flex: 1,
    paddingHorizontal: 20,
    paddingTop: 20,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 20,
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#1F2937',
  },
  taskCount: {
    fontSize: 14,
    color: '#9CA3AF',
  },
});

export default CalendarScreen;
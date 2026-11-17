import React, { useState, useMemo } from 'react';
import { View, StyleSheet, Text } from 'react-native';
import { Calendar } from 'react-native-calendars';
import dayjs from 'dayjs';
import { useTaskStore } from '@/store/tasksStore';
import Timeline from '@/components/TimeLine';
import FloatingAddButton from '@/components/FloatingButton';
import { COLORS } from '@/constants/theme';

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
      marks[date] = { marked: true, dotColor: COLORS.teal };
    });

    
    marks[selectedDate] = {
      ...marks[selectedDate],
      selected: true,
      selectedColor: COLORS.coral,
    };

    return marks;
  }, [tasks, selectedDate]);

  return (
    <View style={styles.container}>
    
      <View style={styles.calendarContainer}>
        <Calendar
          current={selectedDate}
          onDayPress={day => setSelectedDate(day.dateString)}
          markedDates={markedDates}
          theme={{
            todayTextColor: COLORS.coral,
            arrowColor: COLORS.ink,
            indicatorColor: COLORS.coral,
            textDayFontWeight: '500',
            textMonthFontWeight: 'bold',
            textDayHeaderFontWeight: '500',
          }}
        />
      </View>

     
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
      <FloatingAddButton/>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.paper,
  },
  calendarContainer: {
    paddingBottom: 10,
    borderBottomWidth: 1,
    borderBottomColor: COLORS.ink,
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
    color: COLORS.ink,
  },
  taskCount: {
    fontSize: 14,
    color: '#9CA3AF',
  },
});

export default CalendarScreen;

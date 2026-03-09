import React from 'react';
import { View, Text, StyleSheet, FlatList } from 'react-native';
import dayjs from 'dayjs';

interface Task {
  id: number;
  title: string;
  description: string;
  start: string;
  end: string;
  completed: boolean;
}

const Timeline = ({ tasks }: { tasks: Task[] }) => {
  
  const getTaskStatus = (task: Task) => {
    const now = dayjs();
    const start = dayjs(task.start);
    const end = dayjs(task.end);

    if (task.completed) return 'DONE';
    if (now.isAfter(start) && now.isBefore(end)) return 'ONGOING';
    return 'UPCOMING';
  };

  const getStatusStyles = (status: string) => {
    switch (status) {
      case 'DONE':
        return { color: '#FF6B6B', label: 'Completed' }; 
      case 'ONGOING':
        return { color: '#63E6BE', label: 'Live Now' };   
      default:
        return { color: '#748FFC', label: 'Upcoming' };   
    }
  };

  const calculateProgress = (start: string, end: string) => {
    const startTime = dayjs(start);
    const endTime = dayjs(end);
    const now = dayjs();

    const totalDuration = endTime.diff(startTime);
    const elapsed = now.diff(startTime);
    
    const progress = Math.min(Math.max((elapsed / totalDuration), 0), 1);
    return Math.floor(progress * 100);
  };

  const renderItem = ({ item, index }: { item: Task; index: number }) => {
    const status = getTaskStatus(item);
    const theme = getStatusStyles(status);
    const progress = calculateProgress(item.start, item.end);

    return (
      <View style={styles.taskRow}>
        <View style={styles.indicatorColumn}>
          <View style={[styles.dot, { backgroundColor: theme.color }]} />
          {index !== tasks.length - 1 && <View style={styles.verticalLine} />}
        </View>

        <View style={[styles.card, { borderLeftColor: theme.color, borderLeftWidth: 5 }]}>
          <View style={styles.cardHeader}>
            <View style={{ flex: 1 }}>
              <Text style={[styles.statusLabel, { color: theme.color }]}>{theme.label}</Text>
              <Text style={styles.taskTitle}>{item.title}</Text>
            </View>
            <Text style={styles.taskTime}>
              {dayjs(item.start).format('h:mm A')} - {dayjs(item.end).format('h:mm A')}
            </Text>
          </View>
          
          <Text style={styles.taskDescription} numberOfLines={2}>
            {item.description}
          </Text>
          
          {status === 'ONGOING' && (
            <View style={styles.progressContainer}>
              <View style={styles.progressHeader}>
                <Text style={styles.progressText}>Progress</Text>
                <Text style={styles.progressText}>{progress}%</Text>
              </View>
              <View style={styles.progressBarBg}>
                <View style={[styles.progressBarFill, { width: `${progress}%`, backgroundColor: theme.color }]} />
              </View>
            </View>
          )}
        </View>
      </View>
    );
  };

  return (
    <FlatList
      data={tasks}
      renderItem={renderItem}
      keyExtractor={(item) => item.id.toString()}
      contentContainerStyle={styles.container}
      ListEmptyComponent={<Text style={styles.emptyText}>No tasks for today.</Text>}
    />
  );
};

const styles = StyleSheet.create({
  container: { paddingBottom: 100 },
  taskRow: { flexDirection: 'row', marginBottom: 25 },
  indicatorColumn: { width: 30, alignItems: 'center' },
  dot: {
    width: 14,
    height: 14,
    borderRadius: 7,
    marginTop: 15,
    zIndex: 2,
    borderWidth: 3,
    borderColor: '#fff',
  },
  verticalLine: {
    position: 'absolute',
    top: 25,
    bottom: -25,
    width: 2,
    backgroundColor: '#F3F4F6',
  },
  card: {
    flex: 1,
    backgroundColor: '#fff',
    borderRadius: 15,
    padding: 15,
    marginLeft: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 10,
    elevation: 2,
  },
  cardHeader: { flexDirection: 'row', justifyContent: 'space-between', marginBottom: 8 },
  statusLabel: { fontSize: 10, fontWeight: '800', textTransform: 'uppercase', marginBottom: 2 },
  taskTitle: { fontSize: 17, fontWeight: 'bold', color: '#1F2937' },
  taskTime: { fontSize: 11, color: '#6B7280', fontWeight: '600' },
  taskDescription: { fontSize: 13, color: '#4B5563', lineHeight: 18 },
  
  progressContainer: { marginTop: 12 },
  progressHeader: { flexDirection: 'row', justifyContent: 'space-between', marginBottom: 4 },
  progressText: { fontSize: 10, fontWeight: 'bold', color: '#9CA3AF' },
  progressBarBg: { height: 6, backgroundColor: '#F3F4F6', borderRadius: 3, overflow: 'hidden' },
  progressBarFill: { height: '100%', borderRadius: 3 },
  
  emptyText: { textAlign: 'center', marginTop: 50, color: '#9CA3AF' },
});

export default Timeline;
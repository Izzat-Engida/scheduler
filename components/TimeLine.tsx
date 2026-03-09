import React from 'react';
import { View, Text, StyleSheet, FlatList } from 'react-native';
import dayjs from 'dayjs';

interface Task {
  id: number;
  title: string;
  description: string;
  start: string;
  end: string;
}

const Timeline = ({ tasks }: { tasks: Task[] }) => {
  const renderItem = ({ item, index }: { item: Task; index: number }) => (
    <View style={styles.taskRow}>
      
      <View style={styles.indicatorColumn}>
        <View style={styles.dot} />
        {index !== tasks.length - 1 && <View style={styles.verticalLine} />}
      </View>

      <View style={[styles.card, { backgroundColor: getCardColor(index) }]}>
        <View style={styles.cardHeader}>
          <Text style={styles.taskTitle}>{item.title}</Text>
          <Text style={styles.taskTime}>
            {dayjs(item.start).format('h:mm A')}
          </Text>
        </View>
        <Text style={styles.taskDescription} numberOfLines={2}>
          {item.description}
        </Text>
      </View>
    </View>
  );

  return (
    <FlatList
      data={tasks}
      renderItem={renderItem}
      keyExtractor={(item) => item.id.toString()}
      contentContainerStyle={styles.container}
      ListEmptyComponent={<Text style={styles.emptyText}>No tasks for this day.</Text>}
    />
  );
};


const getCardColor = (index: number) => {
  const colors = ['#FF6B6B', '#748FFC', '#63E6BE', '#FFD43B'];
  return colors[index % colors.length];
};

const styles = StyleSheet.create({
  container: { paddingBottom: 100 },
  taskRow: { flexDirection: 'row', marginBottom: 20 },
  indicatorColumn: { width: 30, alignItems: 'center' },
  dot: {
    width: 12,
    height: 12,
    borderRadius: 6,
    backgroundColor: '#FF6B6B',
    borderWidth: 2,
    borderColor: '#fff',
    zIndex: 2,
    marginTop: 15,
  },
  verticalLine: {
    position: 'absolute',
    top: 25,
    bottom: -20,
    width: 2,
    backgroundColor: '#E5E7EB',
  },
  card: {
    flex: 1,
    borderRadius: 15,
    padding: 15,
    marginLeft: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  cardHeader: { flexDirection: 'row', justifyContent: 'space-between', marginBottom: 5 },
  taskTitle: { fontSize: 16, fontWeight: 'bold', color: '#fff' },
  taskTime: { fontSize: 12, color: '#fff', opacity: 0.9 },
  taskDescription: { fontSize: 13, color: '#fff', opacity: 0.8 },
  emptyText: { textAlign: 'center', marginTop: 50, color: '#9CA3AF' },
});

export default Timeline;
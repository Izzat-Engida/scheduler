import React from 'react';
import { View, Text, StyleSheet } from "react-native";
import Timeline from "@/components/TimeLine";
import { useTaskStore } from "@/store/tasksStore";
import dayjs from "dayjs";
import { Ionicons } from '@expo/vector-icons';
import FloatingAddButton from '@/components/FloatingButton';

const Home = () => {

  const { tasks} = useTaskStore();

  
  const getGreeting = () => {
    const hour = dayjs().hour();
    if (hour < 12) return 'Good Morning';
    if (hour < 18) return 'Good Afternoon';
    return 'Good Evening';
  };

  const todaysTasks = tasks
    .filter(task => dayjs(task.start).isSame(dayjs(), 'day'))
    .sort((a, b) => dayjs(a.start).diff(dayjs(b.start)));

  const now = dayjs();
  
  const completedCount = todaysTasks.filter(t => t.completed).length;
  
  const onGoingCount = todaysTasks.filter(t => 
    !t.completed && now.isAfter(dayjs(t.start)) && now.isBefore(dayjs(t.end))
  ).length;

  const todoCount = todaysTasks.filter(t => 
    !t.completed && dayjs(t.start).isAfter(now)
  ).length;

  return (
    <View style={styles.container}>

      <View style={styles.header}>
        <Text style={styles.greeting}>{getGreeting()}, User! 👋</Text>
        <Text style={styles.subtitle}>
          You have {todaysTasks.length} tasks today
        </Text>
      </View>

      
      <View style={styles.summaryRow}>
        <StatusCard 
          title="To-do" 
          count={todoCount} 
          icon="time-outline" 
          color="#9CA3AF" 
        />
        <StatusCard 
          title="On Going" 
          count={onGoingCount} 
          icon="play-circle" 
          color="#748FFC" 
        />
        <StatusCard 
          title="Done" 
          count={completedCount} 
          icon="checkmark-circle" 
          color="#63E6BE" 
        />
      </View>

      <Text style={styles.sectionTitle}>Today's Timeline</Text>

      
      {todaysTasks.length > 0 ? (
        <Timeline tasks={todaysTasks} />
      ) : (
        <View style={styles.emptyContainer}>
          <Ionicons name="calendar-clear-outline" size={80} color="#E5E7EB" />
          <Text style={styles.emptyTitle}>All caught up!</Text>
          <Text style={styles.emptySubtitle}>
            You don't have any tasks scheduled for today. Relax or add a new one.
          </Text>
        </View>
      )}

      <FloatingAddButton />
    </View>
  );
};

const StatusCard = ({ title, count, icon, color }: any) => (
  <View style={[styles.statusCard, { borderColor: color + '30' }]}>
    <View style={[styles.iconCircle, { backgroundColor: color + '15' }]}>
      <Ionicons name={icon} size={18} color={color} />
    </View>
    <View style={styles.statusTextContainer}>
      <Text style={[styles.statusCount, { color: '#1F2937' }]}>{count}</Text>
      <Text style={styles.statusTitle} numberOfLines={1}>{title}</Text>
    </View>
  </View>
);

const styles = StyleSheet.create({
  container: { 
    flex: 1, 
    backgroundColor: '#fff', 
    paddingHorizontal: 16, 
    paddingTop: 60 
  },
  header: { 
    marginBottom: 25 
  },
  greeting: { 
    fontSize: 15, 
    color: '#9CA3AF', 
    fontWeight: '500' 
  },
  subtitle: { 
    fontSize: 24, 
    fontWeight: 'bold', 
    color: '#1F2937',
    marginTop: 2
  },
  summaryRow: { 
    flexDirection: 'row', 
    justifyContent: 'space-between',
    gap: 8, 
    marginBottom: 30 
  },
  statusCard: { 
    flex: 1, 
    flexDirection: 'column', 
    alignItems: 'flex-start', 
    padding: 12, 
    borderRadius: 16, 
    borderWidth: 1, 
    backgroundColor: '#fff'
  },
  iconCircle: { 
    width: 32, 
    height: 32, 
    borderRadius: 16, 
    justifyContent: 'center', 
    alignItems: 'center',
    marginBottom: 8
  },
  statusTextContainer: {
    marginTop: 2
  },
  statusCount: { 
    fontSize: 18, 
    fontWeight: 'bold'
  },
  statusTitle: { 
    fontSize: 11, 
    color: '#6B7280',
    fontWeight: '500'
  },
  sectionTitle: { 
    fontSize: 18, 
    fontWeight: 'bold', 
    color: '#1F2937', 
    marginBottom: 15 
  },
  emptyContainer: { 
    flex: 1, 
    justifyContent: 'center', 
    alignItems: 'center', 
    paddingBottom: 100 
  },
  emptyTitle: { 
    fontSize: 20, 
    fontWeight: 'bold', 
    color: '#4B5563', 
    marginTop: 15 
  },
  emptySubtitle: { 
    fontSize: 14, 
    color: '#9CA3AF', 
    textAlign: 'center', 
    paddingHorizontal: 40, 
    marginTop: 8 
  },
});

export default Home;
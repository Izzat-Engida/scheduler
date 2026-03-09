import React from 'react';
import { View, Text, StyleSheet, TextInput, ScrollView } from "react-native";
import Timeline from "@/components/TimeLine";
import { useTaskStore } from "@/store/tasksStore";
import dayjs from "dayjs";
import { Ionicons } from '@expo/vector-icons';
import FloatingAddButton from '@/components/FloatingButton';

const Home = () => {
  const { tasks } = useTaskStore();

  const hour=dayjs().hour();
  const day=dayjs().day();
  
  const greeting=()=>{
    
    if(hour<12){
      return 'Good Morning';
    }
    else if(hour<18){
      return 'Good Afternoon';
    }
    else{
      return 'Good Evening';
    }
  }
  
  const todaysTasks = tasks
    .filter(task => dayjs(task.start).isSame(dayjs(), 'day'))
    .sort((a, b) => dayjs(a.start).diff(dayjs(b.start)));

  const completedCount = todaysTasks.filter(t => t.completed).length;

  return (
    <View style={styles.container}>
      
      <View style={styles.header}>
        <View>
          <Text style={styles.greeting}>{greeting()}, User! 👋</Text>
          <Text style={styles.subtitle}>
            You have {todaysTasks.length} tasks today
          </Text>
        </View>
      </View>
    
      <View style={styles.summaryRow}>
        <StatusCard title="To-do" count={todaysTasks.length - completedCount} icon="list" color="#FF6B6B" />
        <StatusCard title="Done" count={completedCount} icon="checkmark-circle" color="#63E6BE" />
      </View>

      <Text style={styles.sectionTitle}>Today's Timeline</Text>

    
      {todaysTasks.length > 0 ? (
        <Timeline tasks={todaysTasks} />
      ) : (
        <View style={styles.emptyContainer}>
          <Ionicons name="calendar-clear-outline" size={80} color="#E5E7EB" />
          <Text style={styles.emptyTitle}>All caught up!</Text>
          <Text style={styles.emptySubtitle}>You don't have any tasks scheduled for today. Relax or add a new one.</Text>
        </View>
      )}
      <FloatingAddButton/>
    </View>
  );
};

const StatusCard = ({ title, count, icon, color }: any) => (
  <View style={[styles.statusCard, { borderColor: color + '40' }]}>
    <View style={[styles.iconCircle, { backgroundColor: color + '20' }]}>
      <Ionicons name={icon} size={20} color={color} />
    </View>
    <View>
      <Text style={styles.statusCount}>{count}</Text>
      <Text style={styles.statusTitle}>{title}</Text>
    </View>
  </View>
);

const styles = StyleSheet.create({
  container: { 
    flex: 1, 
    backgroundColor: '#fff', 
    paddingHorizontal: 20, 
    paddingTop: 60 
  },
  header: { 
    marginBottom: 30 
  },
  greeting: { 
    fontSize: 16, 
    color: '#9CA3AF', 
    fontWeight: '500' 
  },
  subtitle: { 
    fontSize: 26, 
    fontWeight: 'bold', 
    color: '#1F2937',
    marginTop: 4
  },
  summaryRow: { 
    flexDirection: 'row', 
    gap: 15, 
    marginBottom: 35 
  },
  statusCard: { 
    flex: 1, 
    flexDirection: 'row', 
    alignItems: 'center', 
    padding: 18, 
    borderRadius: 18, 
    borderWidth: 1, 
    gap: 12 
  },
  iconCircle: { 
    width: 36, 
    height: 36, 
    borderRadius: 18, 
    justifyContent: 'center', 
    alignItems: 'center' 
  },
  statusCount: { 
    fontSize: 20, 
    fontWeight: 'bold', 
    color: '#1F2937' 
  },
  statusTitle: { 
    fontSize: 12, 
    color: '#6B7280' 
  },
  sectionTitle: { 
    fontSize: 18, 
    fontWeight: 'bold', 
    color: '#1F2937', 
    marginBottom: 20 
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
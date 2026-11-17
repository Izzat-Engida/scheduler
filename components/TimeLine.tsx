import React from 'react';
import { View, Text, StyleSheet, FlatList, Pressable, Alert, Modal as NativeModal } from 'react-native';
import dayjs from 'dayjs';
import { useTaskStore } from "@/store/tasksStore";
import UpdateTask from './Updatetask';
import Swipeable from "react-native-gesture-handler/ReanimatedSwipeable";
import { COLORS, BRUTAL_SHADOW } from '@/constants/theme';

interface Task {
  id: number;
  title: string;
  description: string;
  start: string;
  end: string;
  completed: boolean;
}

const Timeline = ({ tasks }: { tasks: Task[] }) => {
  const { deleteTask, completeTask, uncompleteTask } = useTaskStore();
  const [show,setShow]=React.useState(false);
  const [editingTaskId, setEditingTaskId] = React.useState<number | null>(null);
  const handleEdit = (task: number) => {
  console.log("Edit task:", task);
  setShow(true);
  setEditingTaskId(task);
};
  
  const toggleComplete = (task: Task) => {
    if (task.completed) {
      uncompleteTask(task.id);
    } else {
      completeTask(task.id);
    }
  };

  const openTaskMenu=(task:Task)=>{
    Alert.alert(
      task.title,
      "Task Options",[
        {
          text:"Edit",
          onPress:()=>handleEdit(task.id)
        },
        {
          text: task.completed ? "Mark as not done" : "Mark as done",
          onPress: () => toggleComplete(task),
        },
        {
          text:"Delete",
          style:"destructive",
          onPress:()=>deleteTask(task.id)
        },
        {
          text:"Cancel",
          style:"cancel"
        }
      ]
    )
  }
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
        return { color: COLORS.coral, label: 'Completed' }; 
      case 'ONGOING':
        return { color: COLORS.teal, label: 'Live Now' };   
      default:
        return { color: COLORS.ink, label: 'Upcoming' };   
    }
  };

  const calculateProgress = (start: string, end: string) => {
    const startTime = dayjs(start);
    const endTime = dayjs(end);
    const now = dayjs();

    const totalDuration = endTime.diff(startTime);
    if (totalDuration <= 0) {
      return 0;
    }
    const elapsed = now.diff(startTime);
    
    const progress = Math.min(Math.max((elapsed / totalDuration), 0), 1);
    return Math.floor(progress * 100);
  };
  const renderRightActions = (item: Task) => {
  return (
    <View style={{ flexDirection: "row", marginBottom: 25 }}>
      
      <Pressable
        style={styles.editSwipe}
        onPress={() => handleEdit(item.id)}
      >
        <Text style={styles.actionText}>Edit</Text>
      </Pressable>

      <Pressable
        style={styles.deleteSwipe}
        onPress={() => deleteTask(item.id)}
      >
        <Text style={styles.actionText}>Delete</Text>
      </Pressable>

    </View>
  );
};
  const renderItem = ({ item, index }: { item: Task; index: number }) => {
    const status = getTaskStatus(item);
    const theme = getStatusStyles(status);
    const progress = calculateProgress(item.start, item.end);

    return (
      <Swipeable renderRightActions={() => renderRightActions(item)}>
      <View style={styles.taskRow}>
        <View style={styles.indicatorColumn}>
          <View style={[styles.dot, { backgroundColor: theme.color }]} />
          {index !== tasks.length - 1 && <View style={styles.verticalLine} />}
        </View>
        
        <Pressable
        onLongPress={()=>openTaskMenu(item)}
        delayLongPress={300}
        style={{width: '90%'}}
        >
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
        </Pressable>
        
      </View>
      </Swipeable>
    );
  };

  return (
    <>
    <FlatList
      data={tasks}
      renderItem={renderItem}
      keyExtractor={(item) => item.id.toString()}
      contentContainerStyle={styles.container}
      ListEmptyComponent={<Text style={styles.emptyText}>No tasks for today.</Text>}
    />
    <NativeModal visible={show} transparent animationType="slide" onRequestClose={() => setShow(false)}>
      <View style={styles.modalBackdrop}>
        <Pressable style={StyleSheet.absoluteFill} onPress={() => setShow(false)} />
        <View style={styles.modalSheet}>
          {editingTaskId && <UpdateTask id={editingTaskId} onClose={() => setShow(false)} />}
        </View>
      </View>
    </NativeModal>
    </>
  );
};

const styles = StyleSheet.create({
  editSwipe: {
  backgroundColor: "#3B82F6",
  justifyContent: "center",
  alignItems: "center",
  width: 80,
  borderRadius: 15,
},

deleteSwipe: {
  backgroundColor: "#EF4444",
  justifyContent: "center",
  alignItems: "center",
  width: 80,
  borderRadius: 15,
},

actionText: {
  color: "#fff",
  fontWeight: "bold",
  fontSize: 14,
},
  
deleteText: {
  color: "#fff",
  fontWeight: "bold",
  fontSize: 14,
},
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
    backgroundColor: COLORS.cream,
  },
  card: {
    flex: 1,
    backgroundColor: COLORS.white,
    borderRadius: 0,
    borderWidth: 3,
    borderColor: COLORS.ink,
    padding: 15,
    marginLeft: 10,
    ...BRUTAL_SHADOW,
  },
  cardHeader: { flexDirection: 'row', justifyContent: 'space-between', marginBottom: 8 },
  statusLabel: { fontSize: 10, fontWeight: '800', textTransform: 'uppercase', marginBottom: 2 },
  taskTitle: { fontSize: 17, fontWeight: '900', color: COLORS.ink },
  taskTime: { fontSize: 11, color: '#6B7280', fontWeight: '600' },
  taskDescription: { fontSize: 13, color: '#4B5563', lineHeight: 18 },
  
  progressContainer: { marginTop: 12 },
  progressHeader: { flexDirection: 'row', justifyContent: 'space-between', marginBottom: 4 },
  progressText: { fontSize: 10, fontWeight: 'bold', color: '#9CA3AF' },
  progressBarBg: { height: 6, backgroundColor: '#F3F4F6', borderRadius: 3, overflow: 'hidden' },
  progressBarFill: { height: '100%', borderRadius: 3 },
  
  emptyText: { textAlign: 'center', marginTop: 50, color: '#9CA3AF' },
  modalBackdrop: { flex: 1, justifyContent: 'flex-end', backgroundColor: 'rgba(16,42,67,0.35)' },
  modalSheet: { height: '90%', backgroundColor: COLORS.paper, borderTopWidth: 3, borderColor: COLORS.ink },
});

export default Timeline;

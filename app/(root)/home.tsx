import { View, Text, TouchableOpacity , StyleSheet, ScrollView} from 'react-native'
import React,{useState} from 'react'
import AddTask from '@/components/AddTask'
import Modal from 'react-native-modal';
import { useTaskStore } from '@/store/tasksStore';
import dayjs from 'dayjs';
import TaskCard from '@/components/TaskCard';

const Home = () => {
  const [isVisible, setIsVisible] = useState(false);
  const { tasks } = useTaskStore();
  
  const openModal = () => setIsVisible(true);
  const closeModal = () => setIsVisible(false);

  // Generate 0-23 hours
  const hours = Array.from({ length: 24 }, (_, i) => i);

  return (
    <View style={styles.container}>
      {/* Scrollable Timeline */}
      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.timeline}>
        {hours.map((hour) => {
          // Filter tasks that start in this specific hour
          const tasksInHour = tasks.filter((task) => {
            const taskHour = dayjs(task.start).hour();
            return taskHour === hour;
          });

          return (
            <View key={hour} style={styles.hourRow}>
              {/* Left Side: The Time Label */}
              <View style={styles.timeLabelContainer}>
                <Text style={styles.hourText}>
                  {dayjs().hour(hour).format("HH:00")}
                </Text>
              </View>

              {/* Right Side: The Vertical Line and Task Cards */}
              <View style={styles.eventsColumn}>
                <View style={styles.gridLine} />
                {tasksInHour.map((task) => (
                  <TaskCard key={task.id} task={task} />
                ))}
              </View>
            </View>
          );
        })}
      </ScrollView>

      {/* Floating Action Button */}
      <TouchableOpacity onPress={openModal} style={styles.addButton}>
        <Text style={styles.addButtonText}>+ Add Task</Text>
      </TouchableOpacity>

      <Modal
        isVisible={isVisible}
        onBackdropPress={closeModal}
        swipeDirection="down"
        onSwipeComplete={closeModal}
        style={{ justifyContent: "flex-end", margin: 0 }}
      >
        <View style={styles.modalContent}>

          <AddTask  />
        </View>
      </Modal>
    </View>
  );
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    paddingTop: 60, // Space for status bar
  },
  timeline: {
    paddingHorizontal: 15,
    paddingBottom: 120, // Space so FAB doesn't cover last hours
  },
  hourRow: {
    flexDirection: "row",
    height: 80, // Height of one hour slot
  },
  timeLabelContainer: {
    width: 60,
    alignItems: "center",
  },
  hourText: {
    color: "#9CA3AF",
    fontSize: 12,
    marginTop: -8, // Center text on the line
  },
  eventsColumn: {
    flex: 1,
    borderLeftWidth: 1,
    borderLeftColor: "#E5E7EB", // Light grey line like Google Calendar
    paddingLeft: 10,
    position: "relative",
  },
  gridLine: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    height: 1,
    backgroundColor: "#F3F4F6", // Subtle horizontal lines
  },
  addButton: {
    backgroundColor: "#fff",
    padding: 15,
    borderRadius: 30,
    alignItems: "center",
    justifyContent: "center",
    elevation: 5, // Android shadow
    shadowColor: "#000", // iOS shadow
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 4,
    position: "absolute",
    bottom: 40,
    right: 20,
    zIndex: 99,
  },
  addButtonText: {
    color: "#147bf0",
    fontSize: 16,
    fontWeight: "bold",
  },
  modalContent: {
    backgroundColor: "#fff",
    borderTopLeftRadius: 25,
    borderTopRightRadius: 25,
    height: "90%",
    padding: 20,
  },
});
import { View, Text, TouchableOpacity , StyleSheet, ScrollView} from 'react-native'
import React,{useState} from 'react'
import AddTask from '@/components/AddTask'
import Modal from 'react-native-modal';
import { useTaskStore } from '@/store/tasksStore';
import dayjs from 'dayjs';
import TaskCard from '@/components/TaskCard';

const Home = () => {
  const [isVisible, setIsVisible] = useState(false);
  const {tasks}=useTaskStore();
  const openModal = () => setIsVisible(true);
  const closeModal=()=>setIsVisible(false);
  const hours = Array.from({ length: 24 }, (_, i) => i);
  return (
    
      <View style={styles.container}>
      <View>
        {/* search bar to search tasks will be here */}
      </View>
      <View>
          <ScrollView style={styles.timeline}>
      {hours.map((hour) => (
        <View key={hour} style={styles.hourRow}>
          <Text style={styles.hourText}>{hour}:00</Text>

                <View style={styles.eventsColumn}>
                  {tasks
                    .filter((task) => dayjs(task.start).hour() === hour)
                    .map((task) => (
                      <TaskCard key={task.id} task={task} />
                    ))}
                </View>
              </View>
            ))}
          </ScrollView>
      </View>
      <TouchableOpacity onPress={openModal} style={styles.addButton}>
        <Text style={{color:'#147bf0',fontSize:20,fontWeight:"bold"}}>+ Add Task</Text>
      </TouchableOpacity>
      <Modal
      isVisible={isVisible}
      onBackdropPress={closeModal}
      swipeDirection="down"
      onSwipeComplete={closeModal}
      style={ {
    justifyContent: "flex-end", 
    margin: 0,}}
      >
        <View style={styles.modalContent}>
  <AddTask/>
        </View>
      
      </Modal>
      </View>
   
  )
}

export default Home
const styles=StyleSheet.create({
  container:{
    
    padding:20,
    justifyContent:"center",
    backgroundColor:"#fff",
    height:"100%",
    width:"100%"

  },
  addButton:{
    backgroundColor:"#fff",
    padding:15,
    borderRadius:20,
    alignItems:"center",
    width:"50%",
    boxShadow: "0 4px 8px rgba(0, 0, 0, 0.5)",
    position:"absolute",
    bottom:50,
    right:20,
    zIndex:99
  },
   modalContent: {
    backgroundColor: "#fff",
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    height: "90%",              
    width: "100%",              
    padding: 20,
  },
  timeline: {
    paddingBottom: 100,
  },

  hourRow: {
    flexDirection: "row",
    marginBottom: 20,
  },

  hourText: {
    width: 50,
    color: "#9CA3AF",
    fontSize: 12,
  },

  eventsColumn: {
    flex: 1,
  },

})

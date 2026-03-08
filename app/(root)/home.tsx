import { View, Text, TouchableOpacity , StyleSheet} from 'react-native'
import React,{useState} from 'react'
import AddTask from '@/components/AddTask'
import Modal from 'react-native-modal';
import { SafeAreaView } from 'react-native-safe-area-context';
const Home = () => {
  const [isVisible, setIsVisible] = useState(false);
  const openModal = () => setIsVisible(true);
  const closeModal=()=>setIsVisible(false);
  return (
    
      <View style={styles.container}>
      <View>
        {/* search bar to search tasks will be here */}
      </View>
      <View>
        {/*a component to show tasks in calander format like in google calender will be here at top 
         there will be a dropdown to seletect month and year at the same time
         then there will be alist to select dats of the week 
         then at bottom the events  time on the left side , or what google does to hwo events in google meet ihtink
         */}
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
  },
   modalContent: {
    backgroundColor: "#fff",
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    height: "90%",              
    width: "100%",              
    padding: 20,
  },

})

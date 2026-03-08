import { View, Text, StyleSheet, TextInput, TouchableOpacity, ScrollView } from "react-native";
import React, { useState } from "react";
import { useTaskStore } from "../store/tasksStore";
import DateTimePickerModal from "react-native-modal-datetime-picker";
import dayjs from "dayjs";
const UpdateTask = (id:number) => {
  const {updateTask,tasks} = useTaskStore();
  const task = tasks.find((task) => task.id === id);

  const [eventName, setEventName] = useState(task?.title || "");
  const [location, setLocation] = useState(task?.location || "");
  const [description, setDescription] = useState(task?.description || "");

  const initialStartDate = task?.start ? dayjs(task.start).toDate() : new Date();
  const initialEndDate = task?.end ? dayjs(task.end).toDate() : new Date();

  const [startDate, setStartDate] = useState(initialStartDate);
  const [startTime, setStartTime] = useState(initialStartDate);
  const [endDate, setEndDate] = useState(initialEndDate);
  const [endTime, setEndTime] = useState(initialEndDate);

  const [error, setError] = useState(false);
  const [errormsg, setErrormsg] = useState("");

  const [isStartDatePickerVisible, setStartDatePickerVisible] = useState(false);
  const [isStartTimePickerVisible, setStartTimePickerVisible] = useState(false);
  const [isEndDatePickerVisible, setEndDatePickerVisible] = useState(false);
  const [isEndTimePickerVisible, setEndTimePickerVisible] = useState(false);

  const handleAdd = async () => {
    if (!eventName || !startDate || !startTime || !endDate || !endTime) {
      setErrormsg("Please fill all fields");
      setError(true);
      return;
    }
    setError(false);
    setErrormsg("");

    const start = new Date(startDate);
    start.setHours(startTime.getHours());
    start.setMinutes(startTime.getMinutes());

    const end = new Date(endDate);
    end.setHours(endTime.getHours());
    end.setMinutes(endTime.getMinutes());

    await updateTask(id,eventName, description, location, start.toISOString(), end.toISOString());

  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>New Schedule</Text>

      {error && <Text style={styles.error}>{errormsg}</Text>}

      <ScrollView style={{ flex: 1, width: "100%" }}>
        <View style={styles.first}>
          <Text style={styles.label}>Event Name</Text>
          <TextInput
            placeholder="Event Name"
            value={eventName}
            onChangeText={setEventName}
            style={[styles.input, error && !eventName ? styles.errorBorder : null]}
          />

          <Text style={styles.label}>Description</Text>
          <TextInput
            placeholder="Description"
            value={description}
            onChangeText={setDescription}
            style={styles.input}
          />

          <Text style={styles.label}>Location</Text>
          <TextInput
            placeholder="Location"
            value={location}
            onChangeText={setLocation}
            style={styles.input}
          />
        </View>

        {/* Starts row */}
        <View style={styles.timeRow}>
          <Text style={styles.label}>Starts</Text>
          <View style={styles.pickerRow}>
            <TouchableOpacity
              onPress={() => setStartDatePickerVisible(true)}
              style={styles.picker}
            >
              <Text style={styles.pickerText}>{startDate.toDateString()}</Text>
            </TouchableOpacity>

            <TouchableOpacity
              onPress={() => setStartTimePickerVisible(true)}
              style={styles.picker}
            >
              <Text style={styles.pickerText}>
                {startTime.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })}
              </Text>
            </TouchableOpacity>
          </View>
        </View>

        {/* Ends row */}
        <View style={styles.timeRow}>
          <Text style={styles.label}>Ends</Text>
          <View style={styles.pickerRow}>
            <TouchableOpacity
              onPress={() => setEndDatePickerVisible(true)}
              style={styles.picker}
            >
              <Text style={styles.pickerText}>{endDate.toDateString()}</Text>
            </TouchableOpacity>

            <TouchableOpacity
              onPress={() => setEndTimePickerVisible(true)}
              style={styles.picker}
            >
              <Text style={styles.pickerText}>
                {endTime.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })}
              </Text>
            </TouchableOpacity>
          </View>
        </View>

        
        <DateTimePickerModal
          isVisible={isStartDatePickerVisible}
          mode="date"
          onConfirm={(date) => {
            setStartDate(date);
            setStartDatePickerVisible(false);
          }}
          onCancel={() => setStartDatePickerVisible(false)}
        />
        <DateTimePickerModal
          isVisible={isStartTimePickerVisible}
          mode="time"
          onConfirm={(time) => {
            setStartTime(time);
            setStartTimePickerVisible(false);
          }}
          onCancel={() => setStartTimePickerVisible(false)}
        />
        <DateTimePickerModal
          isVisible={isEndDatePickerVisible}
          mode="date"
          onConfirm={(date) => {
            setEndDate(date);
            setEndDatePickerVisible(false);
          }}
          onCancel={() => setEndDatePickerVisible(false)}
        />
        <DateTimePickerModal
          isVisible={isEndTimePickerVisible}
          mode="time"
          onConfirm={(time) => {
            setEndTime(time);
            setEndTimePickerVisible(false);
          }}
          onCancel={() => setEndTimePickerVisible(false)}
        />

        <TouchableOpacity onPress={handleAdd} style={styles.saveButton}>
          <Text style={styles.saveText}>Update</Text>
        </TouchableOpacity>
      </ScrollView>
    </View>
  );
};

export default UpdateTask;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    justifyContent: "center",
    alignItems: "center",
    paddingTop: 50,
  },
  title: {
    fontSize: 22,
    fontWeight: "600",
    color: "#19191b",
    marginBottom: 20,
  },
  first: {
    width: "100%",
    marginBottom: 20,
  },
  label: {
    color: "#151617",
    marginBottom: 6,
    fontSize: 18,
    fontWeight: "bold",
  },
  input: {
    backgroundColor: "#147bf024",
    borderWidth: 1,
    borderColor: "#2D3748",
    color: "#E5E7EB",
    padding: 12,
    borderRadius: 10,
    marginBottom: 12,
    width: "100%",
  },
  timeRow: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginVertical: 12,
    width: "100%",
  },
  pickerRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 12,
  },
  picker: {
    backgroundColor: "#147bf024",
    paddingVertical: 10,
    paddingHorizontal: 12,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: "#2D3748", 
  },
  pickerText: {
    color: "#0e0e0f",
  },
  saveButton: {
    backgroundColor: "#147bf0",
    padding: 14,
    borderRadius: 12,
    marginTop: 20,
    alignItems: "center",
  },
  saveText: {
    color: "#fff",
    fontWeight: "600",
  },
  error: {
    color: "#FF4C4C",
    marginBottom: 10,
  },
  errorBorder: {
    borderColor: "#FF4C4C",
  },
});
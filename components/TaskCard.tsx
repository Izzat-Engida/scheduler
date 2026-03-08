import { View, Text, StyleSheet } from "react-native";
import dayjs from "dayjs";

export default function TaskCard({ task }: any) {
  return (
    <View style={[styles.card, { borderLeftColor: !task.completed? "#22C55E" : "#EF4444" }]}>
      <Text style={styles.time}>
        {dayjs(task.start_datetime).format("HH:mm")} -{" "}
        {dayjs(task.end_datetime).format("HH:mm")}
      </Text>

      <Text style={styles.title}>{task.title}</Text>

      {task.description ? (
        <Text style={styles.desc}>{task.description}</Text>
      ) : null}
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: "#161B26",
    borderRadius: 12,
    padding: 10,
    borderLeftWidth: 4,
    
    marginBottom: 10,
  },

  time: {
    color: "#9CA3AF",
    fontSize: 11,
  },

  title: {
    color: "#E5E7EB",
    fontSize: 15,
    fontWeight: "600",
  },

  desc: {
    color: "#9CA3AF",
    fontSize: 12,
  },
});
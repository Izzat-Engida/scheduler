import * as Notifications from "expo-notifications";
import dayjs from "dayjs";

Notifications.setNotificationHandler({
  handleNotification: async () => ({
    shouldShowAlert: true,
    shouldPlaySound: true,
    shouldSetBadge: false,
  }),
});
export const scheduleTaskNotification = async (id: number, title: string, startTime: string) => {
  const startTrigger = dayjs(startTime);
  const reminderTrigger = startTrigger.subtract(30, 'minute');


  const reminderId = `reminder-${id}`;
  const startId = `start-${id}`;

  if (reminderTrigger.isAfter(dayjs())) {
    await Notifications.scheduleNotificationAsync({
      identifier: reminderId, 
      content: {
        title: "Upcoming Event! 🔔",
        body: `${title} starts in 30 minutes.`,
        data: { taskId: id }
      },
      trigger: reminderTrigger.toDate()
    });
  }

  if (startTrigger.isAfter(dayjs())) {
    await Notifications.scheduleNotificationAsync({
      identifier: startId, 
      content: {
        title: "Event Started 🚀",
        body: `${title} is starting now!`,
        data: { taskId: id },
      },
      trigger: startTrigger.toDate(),
    });
  }
};
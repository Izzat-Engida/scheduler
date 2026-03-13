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
  const reminderTrigger = startTrigger.subtract(30, "minute");
  const reminderId = `reminder-${id}`;
  const startId = `start-${id}`;

  console.log("[NOTIF] startTime raw:", startTime);
  console.log(
    "[NOTIF] parsed start:",
    startTrigger.isValid() ? startTrigger.format("YYYY-MM-DD HH:mm:ss Z") : "INVALID DATE"
  );
  console.log("[NOTIF] now:", dayjs().format("YYYY-MM-DD HH:mm:ss Z"));
  console.log("[NOTIF] reminder at:", reminderTrigger.format("YYYY-MM-DD HH:mm:ss Z"));
  console.log("[NOTIF] will schedule reminder?", reminderTrigger.isAfter(dayjs()));

  const createDateTrigger = (triggerDate: Date) => ({
    type: Notifications.SchedulableTriggerInputTypes.DATE,
    date: triggerDate,          
    channelId: "default",       
  });

  if (reminderTrigger.isAfter(dayjs())) {
    try {
      await Notifications.scheduleNotificationAsync({
        identifier: reminderId,
        content: {
          title: "Upcoming Event! 🔔",
          body: `${title} starts in 30 minutes.`,
          data: { taskId: id },
        },
        trigger: createDateTrigger(reminderTrigger.toDate()),
      });
      console.log(`[NOTIF] SUCCESS: Reminder scheduled for ${reminderTrigger.format("YYYY-MM-DD HH:mm:ss")}`);
    } catch (error) {
      console.error("[NOTIF] Failed to schedule reminder:", error);
    }
  } else {
    console.log("[NOTIF] Reminder skipped — time already passed");
  }

  if (startTrigger.isAfter(dayjs())) {
    try {
      await Notifications.scheduleNotificationAsync({
        identifier: startId,
        content: {
          title: "Event Started 🚀",
          body: `${title} is starting now!`,
          data: { taskId: id },
        },
        trigger: createDateTrigger(startTrigger.toDate()),
      });
      console.log(`[NOTIF] SUCCESS: Start notification scheduled for ${startTrigger.format("YYYY-MM-DD HH:mm:ss")}`);
    } catch (error) {
      console.error("[NOTIF] Failed to schedule start notification:", error);
    }
  } else {
    console.log("[NOTIF] Start notification skipped — time already passed");
  }
};
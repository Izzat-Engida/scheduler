import * as Notifications from "expo-notifications";
import { Platform } from 'react-native';

Notifications.setNotificationHandler({
  handleNotification: async () => ({
    shouldShowAlert: true,
    shouldShowBanner: true,
    shouldShowList: true,
    shouldPlaySound: true,
    shouldSetBadge: false,
  }),
});

export const scheduleTaskNotification = async (id: number, title: string, startTime: string) => {
  try {
    await cancelTaskNotifications(id);
    const start = new Date(startTime);
    if (Number.isNaN(start.getTime()) || start.getTime() <= Date.now()) return;

    const reminder = new Date(start.getTime() - 30 * 60 * 1000);
    const trigger = (date: Date) => ({ type: Notifications.SchedulableTriggerInputTypes.DATE, date, channelId: 'default' as const });
    const content = (body: string) => ({ title: 'izzat.time', body, sound: 'default' as const, data: { taskId: id } });

    if (reminder.getTime() > Date.now()) {
      await Notifications.scheduleNotificationAsync({ content: content(`${title} starts in 30 minutes.`), trigger: trigger(reminder) });
    }
    await Notifications.scheduleNotificationAsync({ content: content(`${title} is starting now.`), trigger: trigger(start) });
  } catch (error) {
    console.warn('[NOTIF] Could not schedule task reminder:', error);
  }
};

export const cancelTaskNotifications = async (taskId: number) => {
  try {
    const scheduled = await Notifications.getAllScheduledNotificationsAsync();
    await Promise.all(scheduled
      .filter((request) => Number(request.content.data?.taskId) === taskId)
      .map((request) => Notifications.cancelScheduledNotificationAsync(request.identifier)));
  } catch (error) {
    console.warn('[NOTIF] Could not cancel task reminders:', error);
  }
};

export const configureNotifications = async () => {
  const permissions = await Notifications.getPermissionsAsync();
  if (!permissions.granted) await Notifications.requestPermissionsAsync();
  if (Platform.OS === 'android') {
    await Notifications.setNotificationChannelAsync('default', {
      name: 'izzat.time reminders', importance: Notifications.AndroidImportance.HIGH,
      vibrationPattern: [0, 250, 200, 250], lightColor: '#2CA6B8', sound: 'default',
    });
  }
};

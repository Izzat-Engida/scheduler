import React, { useMemo } from 'react';
import { View, Text, StyleSheet, SectionList, Pressable } from 'react-native';
import dayjs from 'dayjs';
import { useTaskStore } from '@/store/tasksStore';
import { Ionicons } from '@expo/vector-icons';
import { Swipeable } from "react-native-gesture-handler";
import FloatingAddButton from '@/components/FloatingButton';
import { COLORS, BRUTAL_SHADOW } from '@/constants/theme';

const Past = () => {
  const { tasks, deleteTask } = useTaskStore();

  const sections = useMemo(() => {
    const completedTasks = tasks
      .filter(task => task.completed || dayjs(task.end).isBefore(dayjs()))
      .sort((a, b) => dayjs(b.start).diff(dayjs(a.start)));

    const groups = completedTasks.reduce((acc: any, task) => {
      const date = dayjs(task.start).format('MMMM D, YYYY');
      if (!acc[date]) acc[date] = [];
      acc[date].push(task);
      return acc;
    }, {});

    return Object.keys(groups).map(date => ({
      title: date,
      data: groups[date],
    }));
  }, [tasks]);

  const renderRightActions = (id: number) => {
    return (
      <Pressable
        style={styles.deleteSwipe}
        onPress={() => deleteTask(id)}
      >
        <Ionicons name="trash-outline" size={20} color="#fff" />
        <Text style={styles.deleteText}>Delete</Text>
      </Pressable>
    );
  };

  const renderItem = ({ item }: { item: any }) => (
    <Swipeable renderRightActions={() => renderRightActions(item.id)}>
      <View style={styles.taskCard}>
        <View style={styles.iconContainer}>
          <Ionicons name="checkmark-circle" size={26} color="#22C55E" />
        </View>

        <View style={styles.content}>
          <Text style={styles.taskTitle}>{item.title}</Text>

          <View style={styles.timeRow}>
            <Ionicons name="time-outline" size={14} color="#9CA3AF" />
            <Text style={styles.taskTime}>
              {dayjs(item.start).format('h:mm A')} - {dayjs(item.end).format('h:mm A')}
            </Text>
          </View>

          {item.location ? (
            <View style={styles.metaRow}>
              <Ionicons name="location-outline" size={14} color="#9CA3AF" />
              <Text style={styles.metaText} numberOfLines={1}>
                {item.location}
              </Text>
            </View>
          ) : null}
        </View>

        <Ionicons name="chevron-forward" size={18} color="#D1D5DB" />
      </View>
    </Swipeable>
  );

  return (
    <View style={styles.container}>
      <SectionList
        sections={sections}
        keyExtractor={(item) => item.id.toString()}
        renderItem={renderItem}
        renderSectionHeader={({ section: { title } }) => (
          <View style={styles.sectionHeader}>
            <Text style={styles.sectionTitle}>{title}</Text>
          </View>
        )}
        contentContainerStyle={styles.listContent}
        ListEmptyComponent={
          <View style={styles.empty}>
            <Ionicons name="archive-outline" size={60} color="#E5E7EB" />
            <Text style={styles.emptyText}>No history found</Text>
          </View>
        }
      />
      <FloatingAddButton/>
    </View>
  );
};

const styles = StyleSheet.create({

  container: {
    flex: 1,
    backgroundColor: COLORS.paper
  },

  listContent: {
    paddingBottom: 50
  },

  sectionHeader: {
    backgroundColor: COLORS.paper,
    paddingHorizontal: 20,
    paddingVertical: 10
  },

  sectionTitle: {
    fontSize: 14,
    fontWeight: '700',
    color: COLORS.ink,
    textTransform: 'uppercase'
  },

  taskCard: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: COLORS.white,
    marginHorizontal: 16,
    marginBottom: 10,
    padding: 18,
    borderRadius: 0, borderWidth: 3, borderColor: COLORS.ink, ...BRUTAL_SHADOW,
  },

  iconContainer: {
    marginRight: 14
  },

  content: {
    flex: 1
  },

  taskTitle: {
    fontSize: 16,
    fontWeight: '700',
    color: COLORS.ink
  },

  timeRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 4
  },

  taskTime: {
    fontSize: 12,
    color: '#6B7280',
    marginLeft: 4
  },
  metaRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 6,
  },
  metaText: {
    fontSize: 12,
    color: '#6B7280',
    marginLeft: 4,
    maxWidth: '90%',
  },

  deleteSwipe: {
    backgroundColor: '#EF4444',
    justifyContent: 'center',
    alignItems: 'center',
    width: 90,
    borderRadius: 16,
    marginHorizontal: 16,
    marginBottom: 10
  },

  deleteText: {
    color: '#fff',
    fontWeight: '600',
    fontSize: 12,
    marginTop: 4
  },

  empty: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 100
  },

  emptyText: {
    color: '#9CA3AF',
    marginTop: 10,
    fontSize: 16
  }

});

export default Past;

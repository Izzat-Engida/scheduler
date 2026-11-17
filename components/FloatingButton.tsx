import React from 'react';
import { TouchableOpacity, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useTaskStore } from '@/store/tasksStore';
import { COLORS, BRUTAL_SHADOW } from '@/constants/theme';

const FloatingAddButton = () => {
  const openAddTask = useTaskStore((state) => state.openAddTask);

  return (
    <TouchableOpacity style={styles.fab} onPress={openAddTask}>
      <Ionicons name="add" size={28} color={COLORS.ink} />
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  fab: {
    position: 'absolute',
    right: 20,
    bottom: 30,
    backgroundColor: COLORS.lemon,
    width: 62,
    height: 62,
    borderRadius: 0,
    borderWidth: 3,
    borderColor: COLORS.ink,
    justifyContent: 'center',
    alignItems: 'center',
    ...BRUTAL_SHADOW,
  },
});

export default FloatingAddButton;

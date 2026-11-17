import React, { useMemo } from 'react';
import { View, Text, StyleSheet, Pressable } from 'react-native';
import dayjs from 'dayjs';
import { Ionicons } from '@expo/vector-icons';
import { useTaskStore } from '@/store/tasksStore';
import FloatingAddButton from '@/components/FloatingButton';
import { COLORS, BRUTAL_SHADOW } from '@/constants/theme';

export default function Focus() {
  const tasks = useTaskStore((state) => state.tasks);
  const nextTask = useMemo(() => tasks.filter((task) => !task.completed && dayjs(task.end).isAfter(dayjs())).sort((a, b) => dayjs(a.start).diff(dayjs(b.start)))[0], [tasks]);
  const completed = tasks.filter((task) => task.completed).length;
  return <View style={styles.container}>
    <Text style={styles.kicker}>FOCUS MODE</Text><Text style={styles.title}>One thing.<Text style={styles.accent}> Now.</Text></Text>
    <Text style={styles.subtitle}>Protect your attention and make the next block count.</Text>
    <View style={styles.hero}><View style={styles.heroTop}><Text style={styles.heroLabel}>NEXT UP</Text><Ionicons name="flash" size={22} color={COLORS.coral} /></View>
      {nextTask ? <><Text style={styles.taskTitle}>{nextTask.title}</Text><Text style={styles.taskTime}>{dayjs(nextTask.start).format('dddd · h:mm A')} — {dayjs(nextTask.end).format('h:mm A')}</Text><Pressable style={styles.startButton}><Text style={styles.startText}>START BLOCK</Text><Ionicons name="arrow-forward" size={18} color={COLORS.ink} /></Pressable></> : <Text style={styles.empty}>No upcoming blocks. Add something worth your time.</Text>}
    </View>
    <View style={styles.stats}><View style={styles.stat}><Text style={styles.statNumber}>{completed}</Text><Text style={styles.statLabel}>DONE</Text></View><View style={styles.stat}><Text style={styles.statNumber}>{tasks.length}</Text><Text style={styles.statLabel}>TOTAL</Text></View><View style={styles.stat}><Text style={styles.statNumber}>{tasks.length ? Math.round((completed / tasks.length) * 100) : 0}%</Text><Text style={styles.statLabel}>MOMENTUM</Text></View></View>
    <FloatingAddButton />
  </View>;
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: COLORS.paper, padding: 22, paddingTop: 42 },
  kicker: { color: COLORS.coral, fontWeight: '900', letterSpacing: 2, fontSize: 12 },
  title: { color: COLORS.ink, fontSize: 40, lineHeight: 43, fontWeight: '900', marginTop: 12 },
  accent: { color: COLORS.teal }, subtitle: { color: COLORS.muted, fontSize: 15, lineHeight: 22, marginTop: 10 },
  hero: { backgroundColor: COLORS.lemon, borderWidth: 3, borderColor: COLORS.ink, padding: 20, marginTop: 34, ...BRUTAL_SHADOW },
  heroTop: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }, heroLabel: { color: COLORS.ink, fontSize: 12, fontWeight: '900', letterSpacing: 1.5 },
  taskTitle: { color: COLORS.ink, fontSize: 27, fontWeight: '900', marginTop: 28 }, taskTime: { color: COLORS.ink, fontWeight: '800', marginTop: 8 },
  startButton: { backgroundColor: COLORS.white, borderWidth: 3, borderColor: COLORS.ink, padding: 14, marginTop: 22, flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }, startText: { color: COLORS.ink, fontWeight: '900', letterSpacing: 1 },
  empty: { color: COLORS.ink, fontSize: 18, fontWeight: '800', marginTop: 28, lineHeight: 25 }, stats: { flexDirection: 'row', gap: 8, marginTop: 24 }, stat: { flex: 1, backgroundColor: COLORS.white, borderWidth: 3, borderColor: COLORS.ink, padding: 12 }, statNumber: { color: COLORS.ink, fontWeight: '900', fontSize: 22 }, statLabel: { color: COLORS.muted, fontWeight: '900', fontSize: 9, marginTop: 5 },
});

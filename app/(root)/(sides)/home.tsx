import React, { useMemo } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import dayjs from 'dayjs';
import { Ionicons } from '@expo/vector-icons';
import { useTaskStore } from '@/store/tasksStore';
import Timeline from '@/components/TimeLine';
import FloatingAddButton from '@/components/FloatingButton';
import BrandMark from '@/components/BrandMark';
import { COLORS, BRUTAL_SHADOW } from '@/constants/theme';

export default function Home() {
  const tasks = useTaskStore((state) => state.tasks);
  const today = useMemo(() => tasks.filter((task) => dayjs(task.start).isSame(dayjs(), 'day')).sort((a, b) => dayjs(a.start).diff(dayjs(b.start))), [tasks]);
  const completed = today.filter((task) => task.completed).length;
  const next = today.find((task) => !task.completed && dayjs(task.end).isAfter(dayjs()));
  const percent = today.length ? (completed / today.length) * 100 : 0;

  return <View style={styles.container}>
    <View style={styles.top}><BrandMark compact /><Text style={styles.date}>{dayjs().format('ddd, MMM D').toUpperCase()}</Text></View>
    <Text style={styles.kicker}>YOUR DAY, IN ONE VIEW</Text>
    <Text style={styles.title}>Make it a good{`\n`}one.</Text>
    <View style={styles.progressRow}><View style={styles.progressTrack}><View style={[styles.progressFill, { width: `${percent}%` }]} /></View><Text style={styles.progressText}>{completed}/{today.length}</Text></View>
    {next && <View style={styles.nextCard}><View><Text style={styles.nextLabel}>UP NEXT</Text><Text style={styles.nextTitle}>{next.title}</Text><Text style={styles.nextTime}>{dayjs(next.start).format('h:mm A')} — {dayjs(next.end).format('h:mm A')}</Text></View><Ionicons name="arrow-forward-outline" size={30} color={COLORS.ink} /></View>}
    <View style={styles.sectionHead}><Text style={styles.sectionTitle}>TODAY&apos;S BLOCKS</Text><Text style={styles.count}>{today.length}</Text></View>
    {today.length ? <Timeline tasks={today} /> : <View style={styles.empty}><Ionicons name="sunny-outline" size={36} color={COLORS.coral} /><Text style={styles.emptyTitle}>Blank canvas.</Text><Text style={styles.emptyText}>Add a block and give your day a shape.</Text></View>}
    <FloatingAddButton />
  </View>;
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: COLORS.paper, paddingHorizontal: 20, paddingTop: 38 },
  top: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' },
  date: { color: COLORS.muted, fontWeight: '900', fontSize: 11, letterSpacing: 1 },
  kicker: { color: COLORS.coral, fontSize: 12, fontWeight: '900', letterSpacing: 1.6, marginTop: 30 },
  title: { color: COLORS.ink, fontSize: 39, lineHeight: 40, fontWeight: '900', marginTop: 8 },
  progressRow: { flexDirection: 'row', alignItems: 'center', gap: 12, marginTop: 20 },
  progressTrack: { flex: 1, height: 12, backgroundColor: COLORS.cream, borderWidth: 2, borderColor: COLORS.ink },
  progressFill: { height: '100%', backgroundColor: COLORS.teal },
  progressText: { color: COLORS.ink, fontWeight: '900', fontSize: 12 },
  nextCard: { backgroundColor: COLORS.teal, borderWidth: 3, borderColor: COLORS.ink, padding: 18, marginTop: 26, flexDirection: 'row', justifyContent: 'space-between', ...BRUTAL_SHADOW },
  nextLabel: { color: COLORS.ink, fontSize: 11, fontWeight: '900', letterSpacing: 1 },
  nextTitle: { color: COLORS.ink, fontSize: 23, fontWeight: '900', marginTop: 12 },
  nextTime: { color: COLORS.ink, fontWeight: '800', marginTop: 7 },
  sectionHead: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginTop: 30, marginBottom: 14 },
  sectionTitle: { color: COLORS.ink, fontSize: 13, letterSpacing: 1.3, fontWeight: '900' },
  count: { color: COLORS.paper, backgroundColor: COLORS.ink, paddingHorizontal: 9, paddingVertical: 4, fontWeight: '900' },
  empty: { alignItems: 'center', paddingTop: 70 },
  emptyTitle: { color: COLORS.ink, fontWeight: '900', fontSize: 22, marginTop: 12 },
  emptyText: { color: COLORS.muted, marginTop: 6 },
});

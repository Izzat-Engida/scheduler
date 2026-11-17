import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { COLORS } from '@/constants/theme';

export default function BrandMark({ compact = false }: { compact?: boolean }) {
  return (
    <View style={styles.row}>
      <View style={[styles.mark, compact && styles.markCompact]}>
        <View style={styles.tabs}><View style={styles.tab} /><View style={styles.tab} /></View>
        <Text style={[styles.letter, compact && styles.letterCompact]}>I</Text>
        <Text style={[styles.letter, compact && styles.letterCompact]}>Z</Text>
      </View>
      {!compact && <Text style={styles.name}>izzat<Text style={styles.nameAccent}>.time</Text></Text>}
    </View>
  );
}

const styles = StyleSheet.create({
  row: { flexDirection: 'row', alignItems: 'center', gap: 12 },
  mark: { width: 58, height: 58, backgroundColor: COLORS.teal, borderWidth: 3, borderColor: COLORS.ink, justifyContent: 'center', alignItems: 'center' },
  markCompact: { width: 44, height: 44 },
  tabs: { position: 'absolute', top: -7, left: 10, right: 10, flexDirection: 'row', justifyContent: 'space-between' },
  tab: { width: 8, height: 15, backgroundColor: COLORS.ink, borderWidth: 2, borderColor: COLORS.ink },
  letter: { color: COLORS.paper, fontSize: 22, fontWeight: '900', lineHeight: 22 },
  letterCompact: { fontSize: 17, lineHeight: 17 },
  name: { color: COLORS.ink, fontSize: 25, fontWeight: '900', letterSpacing: -1 },
  nameAccent: { color: COLORS.coral },
});

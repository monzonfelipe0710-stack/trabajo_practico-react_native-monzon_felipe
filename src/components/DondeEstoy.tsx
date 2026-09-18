import { StyleSheet, Text, View } from 'react-native';
import { useLocalSearchParams, usePathname, useSegments } from 'expo-router';

const DEBUG = true;

export function DondeEstoy() {
  const pathname = usePathname();
  const segments = useSegments();
  const params = useLocalSearchParams();

  if (!DEBUG) return null;

  return (
    <View style={styles.contenedor}>
      <Text style={styles.titulo}>¿Dónde estoy?</Text>
      <Text style={styles.linea}>usePathname(): {pathname}</Text>
      <Text style={styles.linea}>useSegments(): {JSON.stringify(segments)}</Text>
      <Text style={styles.linea}>
        useLocalSearchParams(): {JSON.stringify(params)}
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  contenedor: {
    borderWidth: 1,
    borderColor: '#d0d0d0',
    borderRadius: 8,
    padding: 10,
    marginTop: 24,
    backgroundColor: '#f6f6f6',
    gap: 4,
  },
  titulo: {
    fontWeight: '700',
    fontSize: 13,
  },
  linea: {
    fontFamily: 'monospace',
    fontSize: 12,
  },
});
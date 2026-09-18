import { StyleSheet, Text, View } from 'react-native';
import { useLocalSearchParams, usePathname, useSegments } from 'expo-router';

import { tema } from '@/constantes/tema';

const DEBUG = true;

export function DondeEstoy() {
  const pathname = usePathname();
  const segments = useSegments();
  const params = useLocalSearchParams();

  if (!DEBUG) return null;

  return (
    <View style={styles.contenedor}>
      <Text style={styles.etiqueta}>¿Dónde estoy?</Text>
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
    borderColor: tema.colores.borde,
    borderRadius: tema.radios.suave,
    padding: 12,
    marginTop: 20,
    backgroundColor: tema.colores.superficie,
    gap: 3,
  },
  etiqueta: {
    fontWeight: '700',
    fontSize: 11,
    letterSpacing: 0.8,
    textTransform: 'uppercase',
    color: tema.colores.textoSuave,
    marginBottom: 2,
  },
  linea: {
    fontFamily: 'monospace',
    fontSize: 12,
    color: tema.colores.textoSuave,
  },
});
import { Link, usePathname } from 'expo-router';
import { Pressable, ScrollView, StyleSheet, Text } from 'react-native';

import { DondeEstoy } from '@/components/DondeEstoy';

export default function NoEncontrada() {
  const pathname = usePathname();

  return (
    <ScrollView contentContainerStyle={styles.contenedor}>
      <Text style={styles.titulo}>Página no encontrada (404)</Text>
      <Text style={styles.texto}>
        La URL <Text style={styles.ruta}>{pathname}</Text> no corresponde a ninguna pantalla
        de la app.
      </Text>
      <Link href="/" asChild>
        <Pressable style={styles.boton}>
          <Text style={styles.textoBoton}>Volver al inicio</Text>
        </Pressable>
      </Link>
      <DondeEstoy />
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  contenedor: {
    padding: 16,
    gap: 12,
    alignItems: 'flex-start',
  },
  titulo: {
    fontSize: 24,
    fontWeight: '800',
    color: '#b91c1c',
  },
  texto: {
    fontSize: 16,
    color: '#333',
    lineHeight: 22,
  },
  ruta: {
    fontWeight: '700',
    fontFamily: 'monospace',
  },
  boton: {
    backgroundColor: '#15803d',
    padding: 15,
    borderRadius: 12,
    alignItems: 'center',
  },
  textoBoton: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '700',
  },
});
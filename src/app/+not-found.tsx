import { Link, usePathname } from 'expo-router';
import { Pressable, ScrollView, StyleSheet, Text } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

import { DondeEstoy } from '@/components/DondeEstoy';
import { tema } from '@/constantes/tema';

export default function NoEncontrada() {
  const pathname = usePathname();

  return (
    <ScrollView contentContainerStyle={styles.contenedor}>
      <Ionicons name="map-outline" size={40} color={tema.colores.textoSuave} />
      <Text style={styles.titulo}>Página no encontrada (404)</Text>
      <Text style={styles.texto}>
        La URL <Text style={styles.ruta}>{pathname}</Text> no corresponde a ninguna pantalla
        de la app.
      </Text>
      <Link href="/" asChild>
        <Pressable style={styles.boton}>
          <Ionicons name="home-outline" size={18} color="#fff" />
          <Text style={styles.textoBoton}>Volver al inicio</Text>
        </Pressable>
      </Link>
      <DondeEstoy />
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  contenedor: {
    padding: 20,
    gap: 14,
    alignItems: 'flex-start',
    backgroundColor: tema.colores.fondo,
  },
  titulo: {
    fontSize: 24,
    fontWeight: '800',
    color: tema.colores.peligro,
    letterSpacing: -0.4,
  },
  texto: {
    fontSize: 15,
    color: tema.colores.textoSuave,
    lineHeight: 22,
  },
  ruta: {
    fontWeight: '700',
    fontFamily: 'monospace',
    color: tema.colores.texto,
  },
  boton: {
    backgroundColor: tema.colores.acento,
    paddingVertical: 14,
    paddingHorizontal: 20,
    borderRadius: tema.radios.medio,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  textoBoton: {
    color: '#fff',
    fontSize: 15,
    fontWeight: '700',
  },
});
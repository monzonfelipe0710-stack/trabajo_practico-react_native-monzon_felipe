import { Link } from 'expo-router';
import { ScrollView, StyleSheet, Text, View } from 'react-native';

import { DondeEstoy } from '@/components/DondeEstoy';

const ARTICULOS = [
  { href: '/ayuda/pagos', titulo: 'Medios de pago' },
  { href: '/ayuda/pagos/efectivo', titulo: 'Cómo pagar en efectivo' },
  { href: '/ayuda/horarios', titulo: 'Horarios del comedor' },
] as const;

export default function AyudaIndice() {
  return (
    <ScrollView contentContainerStyle={styles.contenedor}>
      <Text style={styles.titulo}>Centro de ayuda</Text>
      <Text style={styles.subtitulo}>
        Elegí un artículo. Las rutas de ayuda tienen profundidad variable (catch-all).
      </Text>

      <View style={styles.lista}>
        {ARTICULOS.map((articulo) => (
          <Link key={articulo.href} href={articulo.href} style={styles.enlace}>
            <Text style={styles.enlaceTexto}>{articulo.titulo}</Text>
          </Link>
        ))}
      </View>

      <DondeEstoy />
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  contenedor: {
    padding: 16,
    gap: 12,
  },
  titulo: {
    fontSize: 24,
    fontWeight: '700',
  },
  subtitulo: {
    fontSize: 15,
    color: '#555',
    lineHeight: 21,
  },
  lista: {
    gap: 8,
    marginTop: 8,
  },
  enlace: {
    backgroundColor: '#fff',
    borderWidth: 1,
    borderColor: '#e5e5e5',
    borderRadius: 10,
    padding: 14,
  },
  enlaceTexto: {
    fontSize: 16,
    color: '#15803d',
    fontWeight: '600',
  },
});
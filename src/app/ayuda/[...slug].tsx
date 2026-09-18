import { useLocalSearchParams } from 'expo-router';
import { ScrollView, StyleSheet, Text } from 'react-native';

import { DondeEstoy } from '@/components/DondeEstoy';
import { tema } from '@/constantes/tema';

type Articulo = {
  titulo: string;
  cuerpo: string;
};

const ARTICULOS: Record<string, Articulo> = {
  pagos: {
    titulo: 'Medios de pago',
    cuerpo:
      'Podés pagar tu pedido con efectivo en la caja del comedor o con billetera virtual. El carrito solo guarda lo que pedís.',
  },
  'pagos/efectivo': {
    titulo: 'Cómo pagar en efectivo',
    cuerpo:
      'Aboná al retirar tu pedido. Tené el número de turno a mano: la caja lo usa para ubicar tu pedido.',
  },
  horarios: {
    titulo: 'Horarios del comedor',
    cuerpo:
      'Desayuno: 7:00 a 10:00. Almuerzo: 11:30 a 14:30. Kiosco y bebidas: todo el día.',
  },
};

export default function ArticuloAyuda() {
  const { slug } = useLocalSearchParams<{ slug?: string | string[] }>();

  const ruta = Array.isArray(slug) ? slug.join('/') : slug ?? '';
  const articulo = ARTICULOS[ruta];

  return (
    <ScrollView contentContainerStyle={styles.contenedor}>
      {articulo ? (
        <>
          <Text style={styles.titulo}>{articulo.titulo}</Text>
          <Text style={styles.cuerpo}>{articulo.cuerpo}</Text>
        </>
      ) : (
        <Text style={styles.error}>
          No existe un artículo para “{ruta}”. Volvé al índice de ayuda.
        </Text>
      )}
      <Text style={styles.ruta}>Ruta: /ayuda/{ruta || '(raíz)'}</Text>
      <DondeEstoy />
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  contenedor: {
    padding: 20,
    gap: 14,
    backgroundColor: tema.colores.fondo,
  },
  titulo: {
    fontSize: 24,
    fontWeight: '800',
    color: tema.colores.texto,
    letterSpacing: -0.4,
  },
  cuerpo: {
    fontSize: 15,
    color: tema.colores.textoSuave,
    lineHeight: 22,
  },
  ruta: {
    fontSize: 13,
    color: tema.colores.textoSuave,
    fontStyle: 'italic',
  },
  error: {
    fontSize: 16,
    color: tema.colores.peligro,
    lineHeight: 22,
  },
});
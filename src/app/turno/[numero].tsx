import { Stack, useLocalSearchParams } from 'expo-router';
import { ScrollView, StyleSheet, Text } from 'react-native';

import { DondeEstoy } from '@/components/DondeEstoy';
import { useApp } from '@/context/AppContext';

export default function Turno() {
  const { numero } = useLocalSearchParams<{ numero: string }>();
  const { pedidosCola } = useApp();

  const n = Number(numero);
  const pedidos = pedidosCola.aArray();
  const posicion = pedidos.findIndex((p) => p.numero === n);
  const adelante = posicion < 0 ? 0 : posicion;
  const esperado = adelante * 3;

  return (
    <>
      <Stack.Screen options={{ title: `Turno ${n}` }} />
      <ScrollView contentContainerStyle={styles.contenedor}>
        <Text style={styles.turno}>Tu turno es el {n}</Text>

        {posicion < 0 ? (
          <Text style={styles.texto}>
            Tu pedido ya no está en la cola (puede que ya te hayan atendido).
          </Text>
        ) : (
          <>
            <Text style={styles.texto}>
              {adelante === 0
                ? 'Sos el siguiente: tu pedido está al frente de la cola.'
                : `Hay ${adelante} pedido(s) por delante en la cola.`}
            </Text>
            <Text style={styles.estimado}>
              Espera estimada: aproximadamente {esperado} minutos
            </Text>
          </>
        )}

        <DondeEstoy />
      </ScrollView>
    </>
  );
}

const styles = StyleSheet.create({
  contenedor: {
    padding: 16,
    gap: 12,
    alignItems: 'flex-start',
  },
  turno: {
    fontSize: 28,
    fontWeight: '800',
    color: '#15803d',
  },
  texto: {
    fontSize: 16,
    color: '#333',
  },
  estimado: {
    fontSize: 15,
    color: '#555',
    backgroundColor: '#eef9ee',
    padding: 10,
    borderRadius: 8,
  },
});
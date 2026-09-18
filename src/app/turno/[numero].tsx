import { Stack, useLocalSearchParams } from 'expo-router';
import { ScrollView, StyleSheet, Text, View } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import Animated, { BounceIn, FadeInDown } from 'react-native-reanimated';

import { DondeEstoy } from '@/components/DondeEstoy';
import { useApp } from '@/context/AppContext';
import { estilosComunes, tema } from '@/constantes/tema';

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
      <ScrollView style={styles.fondo} contentContainerStyle={styles.contenedor}>
        <Animated.View entering={BounceIn.duration(500)} style={styles.tarjetaTurno}>
          <Text style={styles.etiqueta}>Tu turno</Text>
          <Text style={styles.numero}>{n}</Text>
          <View style={styles.estado}>
            <Ionicons name="time-outline" size={16} color={tema.colores.exito} />
            <Text style={styles.estadoTexto}>
              {adelante === 0
                ? 'Sos el siguiente en la cola'
                : `${adelante} pedido(s) por delante`}
            </Text>
          </View>
        </Animated.View>

        <Animated.View entering={FadeInDown.duration(320).delay(150)} style={styles.info}>
          {posicion < 0 ? (
            <>
              <Ionicons name="checkmark-done-circle-outline" size={46} color={tema.colores.exito} />
              <Text style={styles.texto}>
                ¡Tu turno ya fue atendido o salió de la cola! Pasá a retirar tu pedido.
              </Text>
            </>
          ) : (
            <>
              <Ionicons name="restaurant" size={46} color={tema.colores.acento} />
              <Text style={styles.texto}>
                La cocina prepara los turnos en orden. Llegá al mostrador cuando veas tu número.
              </Text>
              <View style={styles.estimado}>
                <Ionicons name="hourglass-outline" size={17} color={tema.colores.textoSuave} />
                <Text style={styles.estimadoTexto}>
                  Espera estimada: {esperado} minuto(s)
                </Text>
              </View>
              <Text style={styles.ayuda}>
                Podés mirar la pantalla de la cocina: tu turno se marca como atendido al
                retirar el pedido.
              </Text>
            </>
          )}
        </Animated.View>

        <DondeEstoy />
      </ScrollView>
    </>
  );
}

const styles = StyleSheet.create({
  fondo: {
    flex: 1,
    backgroundColor: tema.colores.fondo,
  },
  contenedor: {
    padding: 20,
    paddingBottom: 32,
    alignItems: 'center',
    gap: 18,
  },
  tarjetaTurno: {
    ...estilosComunes.tarjeta,
    width: '100%',
    alignItems: 'center',
    paddingVertical: 34,
    gap: 4,
  },
  etiqueta: {
    fontSize: 12,
    fontWeight: '700',
    letterSpacing: 1.4,
    textTransform: 'uppercase',
    color: tema.colores.textoSuave,
  },
  numero: {
    fontSize: 76,
    fontWeight: '800',
    color: tema.colores.acento,
    letterSpacing: -2,
    lineHeight: 88,
  },
  estado: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    backgroundColor: tema.colores.exitoSuave,
    borderRadius: 999,
    paddingVertical: 6,
    paddingHorizontal: 12,
  },
  estadoTexto: {
    fontSize: 13,
    fontWeight: '700',
    color: tema.colores.exito,
  },
  info: {
    alignItems: 'center',
    gap: 10,
  },
  texto: {
    fontSize: 15,
    color: tema.colores.textoSuave,
    textAlign: 'center',
    lineHeight: 22,
    maxWidth: 320,
  },
  estimado: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 7,
    backgroundColor: tema.colores.superficie,
    borderWidth: 1,
    borderColor: tema.colores.borde,
    borderRadius: 999,
    paddingVertical: 8,
    paddingHorizontal: 14,
  },
  estimadoTexto: {
    fontSize: 14,
    fontWeight: '600',
    color: tema.colores.texto,
  },
  ayuda: {
    fontSize: 12,
    color: tema.colores.textoSuave,
    textAlign: 'center',
    lineHeight: 18,
    maxWidth: 320,
  },
});
import { Alert, Pressable, ScrollView, StyleSheet, Text, View } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import Animated, { FadeInDown } from 'react-native-reanimated';

import { DondeEstoy } from '@/components/DondeEstoy';
import { useApp } from '@/context/AppContext';
import { formatearPrecio } from '@/data/platos';
import { estilosComunes, tema } from '@/constantes/tema';

export default function Cocina() {
  const { pedidosCola, atendidosPila, atenderSiguiente, cerrarSesion } = useApp();

  const frente = pedidosCola.frente();
  const enEspera = pedidosCola.tamanio;
  const ultimoAtendido = atendidosPila.tope();

  const atender = () => {
    const atendido = atenderSiguiente();
    if (!atendido) {
      Alert.alert('Sin pedidos', 'No hay pedidos esperando en la cola.');
      return;
    }
  };

  return (
    <ScrollView
      style={styles.fondo}
      contentContainerStyle={styles.contenido}
      showsVerticalScrollIndicator={false}
    >
      <View style={styles.encabezado}>
        <View>
          <Text style={styles.titulo}>Cocina</Text>
          <Text style={styles.contador}>
            {enEspera === 0
              ? 'No hay pedidos esperando.'
              : `${enEspera} pedido(s) en espera`}
          </Text>
        </View>
        <View style={styles.bolitaCola}>
          <Text style={styles.bolitaNumero}>{enEspera}</Text>
          <Text style={styles.bolitaTexto}>en cola</Text>
        </View>
      </View>

      <Animated.View entering={FadeInDown.duration(300)} style={styles.tarjetaFrente}>
        <Text style={styles.etiqueta}>Frente de la cola</Text>
        {frente ? (
          <>
            <View style={styles.filaContenedor}>
              <Text style={styles.turnoNumero}>#{frente.numero}</Text>
              <Text style={styles.hora}>{frente.hora}</Text>
            </View>
            {frente.items.map((item) => (
              <View key={item.plato.id} style={styles.itemRow}>
                <Text style={styles.cantidad}>{item.cantidad}×</Text>
                <Text style={styles.itemNombre}>{item.plato.nombre}</Text>
              </View>
            ))}
            {frente.nota ? (
              <View style={styles.nota}>
                <Ionicons name="chatbubble-ellipses-outline" size={14} color={tema.colores.textoSuave} />
                <Text style={styles.notaTexto}>{frente.nota}</Text>
              </View>
            ) : null}
            <View style={styles.totalRow}>
              <Text style={styles.totalTexto}>Total</Text>
              <Text style={styles.totalNumero}>{formatearPrecio(frente.total)}</Text>
            </View>
          </>
        ) : (
          <View style={styles.centrado}>
            <Ionicons name="cafe-outline" size={30} color={tema.colores.textoSuave} />
            <Text style={styles.vacio}>Sin pedidos esperando</Text>
          </View>
        )}
      </Animated.View>

      <Pressable
        style={({ pressed }) => [styles.boton, !frente && styles.botonDeshabilitado, pressed && styles.presionado]}
        onPress={atender}
        disabled={!frente}
      >
        <Ionicons name="checkmark-done-outline" size={20} color="#fff" />
        <Text style={styles.textoBoton}>
          Atender siguiente{frente ? ` (#${frente.numero})` : ''}
        </Text>
      </Pressable>

      {ultimoAtendido ? (
        <View style={styles.ultimoRow}>
          <Ionicons name="checkmark-circle-outline" size={16} color={tema.colores.exito} />
          <Text style={styles.ultimo}>
            Último atendido: turno #{ultimoAtendido.numero}
          </Text>
        </View>
      ) : null}

      <Pressable
        style={({ pressed }) => [styles.botonCerrar, pressed && styles.presionado]}
        onPress={cerrarSesion}
      >
        <Text style={styles.textoCerrar}>Cerrar sesión</Text>
      </Pressable>

      <DondeEstoy />
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  fondo: {
    flex: 1,
    backgroundColor: tema.colores.fondo,
  },
  contenido: {
    padding: 20,
    paddingBottom: 32,
    gap: 16,
  },
  encabezado: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  titulo: {
    fontSize: 28,
    fontWeight: '800',
    color: tema.colores.texto,
    letterSpacing: -0.5,
  },
  contador: {
    fontSize: 14,
    color: tema.colores.textoSuave,
    marginTop: 2,
  },
  bolitaCola: {
    ...estilosComunes.tarjeta,
    paddingVertical: 8,
    paddingHorizontal: 14,
    alignItems: 'center',
  },
  bolitaNumero: {
    fontSize: 22,
    fontWeight: '800',
    color: tema.colores.acento,
  },
  bolitaTexto: {
    fontSize: 10,
    fontWeight: '700',
    letterSpacing: 0.6,
    textTransform: 'uppercase',
    color: tema.colores.textoSuave,
  },
  tarjetaFrente: {
    ...estilosComunes.tarjeta,
    padding: 18,
    gap: 8,
  },
  etiqueta: {
    fontSize: 12,
    fontWeight: '700',
    letterSpacing: 1.2,
    textTransform: 'uppercase',
    color: tema.colores.textoSuave,
  },
  filaContenedor: {
    flexDirection: 'row',
    alignItems: 'baseline',
    gap: 10,
  },
  turnoNumero: {
    fontSize: 44,
    fontWeight: '800',
    color: tema.colores.texto,
    letterSpacing: -1,
  },
  hora: {
    fontSize: 15,
    color: tema.colores.textoSuave,
  },
  itemRow: {
    flexDirection: 'row',
    gap: 8,
    alignItems: 'baseline',
  },
  cantidad: {
    fontSize: 14,
    fontWeight: '800',
    color: tema.colores.acento,
    minWidth: 26,
  },
  itemNombre: {
    flex: 1,
    fontSize: 15,
    color: tema.colores.texto,
  },
  nota: {
    flexDirection: 'row',
    gap: 6,
    alignItems: 'center',
    backgroundColor: tema.colores.acentoSuave,
    borderRadius: tema.radios.suave,
    padding: 10,
    marginTop: 2,
  },
  notaTexto: {
    flex: 1,
    fontSize: 13,
    color: tema.colores.texto,
  },
  totalRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    borderTopWidth: 1,
    borderTopColor: tema.colores.borde,
    marginTop: 4,
    paddingTop: 12,
  },
  totalTexto: {
    fontSize: 14,
    color: tema.colores.textoSuave,
  },
  totalNumero: {
    fontSize: 20,
    fontWeight: '800',
    color: tema.colores.acento,
  },
  centrado: {
    alignItems: 'center',
    gap: 8,
    paddingVertical: 18,
  },
  vacio: {
    fontSize: 15,
    color: tema.colores.textoSuave,
  },
  boton: {
    backgroundColor: tema.colores.exito,
    borderRadius: tema.radios.medio,
    paddingVertical: 16,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 8,
  },
  botonDeshabilitado: {
    opacity: 0.45,
  },
  presionado: {
    opacity: 0.86,
    transform: [{ scale: 0.99 }],
  },
  textoBoton: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '700',
  },
  ultimoRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    justifyContent: 'center',
  },
  ultimo: {
    fontSize: 13,
    color: tema.colores.textoSuave,
  },
  botonCerrar: {
    backgroundColor: tema.colores.peligroSuave,
    borderRadius: tema.radios.medio,
    paddingVertical: 14,
    alignItems: 'center',
  },
  textoCerrar: {
    color: tema.colores.peligro,
    fontSize: 15,
    fontWeight: '700',
  },
});
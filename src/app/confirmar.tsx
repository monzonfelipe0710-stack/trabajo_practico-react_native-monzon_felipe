import { Link, useRouter } from 'expo-router';
import { Pressable, ScrollView, StyleSheet, Text, View } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import Animated, { FadeInDown } from 'react-native-reanimated';

import { DondeEstoy } from '@/components/DondeEstoy';
import { useApp } from '@/context/AppContext';
import { formatearPrecio } from '@/data/platos';
import { estilosComunes, tema } from '@/constantes/tema';

export default function Confirmar() {
  const { carrito, nota, totalCarrito, confirmarPedido } = useApp();
  const router = useRouter();

  const confirmar = () => {
    if (carrito.length === 0) return;
    const numero = confirmarPedido();
    router.replace(`/turno/${numero}`);
  };

  if (carrito.length === 0) {
    return (
      <ScrollView contentContainerStyle={styles.contenido}>
        <Text style={styles.error}>No hay nada para confirmar. Tu carrito está vacío.</Text>
        <Link href="/menu" asChild>
          <Pressable style={styles.boton}>
            <Text style={styles.textoBoton}>Ir al menú</Text>
          </Pressable>
        </Link>
        <DondeEstoy />
      </ScrollView>
    );
  }

  return (
    <ScrollView style={styles.fondo} contentContainerStyle={styles.contenido}>
      <Animated.View entering={FadeInDown.duration(280)}>
        <Text style={styles.titulo}>Revisá tu pedido</Text>
        <Text style={styles.subtitulo}>
          Paso final antes de pasar a la cocina. Confirmá y te damos tu turno.
        </Text>
      </Animated.View>

      <View style={styles.listaItems}>
        {carrito.map((item, indice) => (
          <View key={item.plato.id} style={styles.fila}>
            <View style={styles.filaNumero}>
              <Text style={styles.filaNumeroTexto}>{indice + 1}</Text>
            </View>
            <View style={styles.filaTexto}>
              <Text style={styles.nombre}>{item.plato.nombre}</Text>
              <Text style={styles.subtotal}>
                {item.cantidad} × {formatearPrecio(item.plato.precio)}
              </Text>
            </View>
            <Text style={styles.filaPrecio}>
              {formatearPrecio(item.plato.precio * item.cantidad)}
            </Text>
          </View>
        ))}

        {nota ? (
          <View style={styles.nota}>
            <Ionicons name="chatbubble-ellipses-outline" size={16} color={tema.colores.textoSuave} />
            <Text style={styles.notaTexto}>{nota}</Text>
          </View>
        ) : null}

        <View style={styles.totalRow}>
          <Text style={styles.totalTexto}>Total</Text>
          <Text style={styles.totalNumero}>{formatearPrecio(totalCarrito())}</Text>
        </View>
      </View>

      <Pressable
        onPress={confirmar}
        style={({ pressed }) => [styles.boton, pressed && styles.presionado]}
      >
        <Ionicons name="checkmark-circle-outline" size={20} color="#fff" />
        <Text style={styles.textoBoton}>Confirmar pedido</Text>
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
    gap: 14,
  },
  titulo: {
    fontSize: 26,
    fontWeight: '800',
    color: tema.colores.texto,
    letterSpacing: -0.5,
  },
  subtitulo: {
    fontSize: 14,
    color: tema.colores.textoSuave,
    lineHeight: 20,
    marginTop: 4,
  },
  listaItems: {
    ...estilosComunes.tarjeta,
    padding: 16,
    gap: 12,
    marginTop: 4,
  },
  fila: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  filaNumero: {
    width: 26,
    height: 26,
    borderRadius: 9,
    backgroundColor: tema.colores.acentoSuave,
    alignItems: 'center',
    justifyContent: 'center',
  },
  filaNumeroTexto: {
    fontSize: 13,
    fontWeight: '800',
    color: tema.colores.acento,
  },
  filaTexto: {
    flex: 1,
    gap: 1,
  },
  nombre: {
    fontSize: 15,
    fontWeight: '600',
    color: tema.colores.texto,
  },
  subtotal: {
    fontSize: 13,
    color: tema.colores.textoSuave,
  },
  filaPrecio: {
    fontSize: 15,
    fontWeight: '700',
    color: tema.colores.texto,
  },
  nota: {
    flexDirection: 'row',
    gap: 8,
    alignItems: 'center',
    backgroundColor: tema.colores.acentoSuave,
    borderRadius: tema.radios.suave,
    padding: 12,
  },
  notaTexto: {
    flex: 1,
    fontSize: 13,
    color: tema.colores.texto,
    lineHeight: 18,
  },
  totalRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    borderTopWidth: 1,
    borderTopColor: tema.colores.borde,
    paddingTop: 14,
  },
  totalTexto: {
    fontSize: 15,
    fontWeight: '700',
    color: tema.colores.texto,
  },
  totalNumero: {
    fontSize: 24,
    fontWeight: '800',
    color: tema.colores.acento,
  },
  boton: {
    backgroundColor: tema.colores.acento,
    borderRadius: tema.radios.medio,
    paddingVertical: 16,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 8,
    marginTop: 4,
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
  error: {
    fontSize: 16,
    color: tema.colores.peligro,
    lineHeight: 22,
  },
});
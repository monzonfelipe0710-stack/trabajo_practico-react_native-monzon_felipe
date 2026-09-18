import { Link, useRouter } from 'expo-router';
import { Pressable, ScrollView, StyleSheet, Text } from 'react-native';

import { DondeEstoy } from '@/components/DondeEstoy';
import { useApp } from '@/context/AppContext';
import { formatearPrecio } from '@/data/platos';

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
      <ScrollView contentContainerStyle={styles.contenedor}>
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
    <ScrollView contentContainerStyle={styles.contenedor}>
      <Text style={styles.titulo}>Resumen de tu pedido</Text>

      {carrito.map((item) => (
        <Text key={item.plato.id} style={styles.linea}>
          {item.cantidad} × {item.plato.nombre} — {formatearPrecio(item.plato.precio * item.cantidad)}
        </Text>
      ))}

      {nota ? <Text style={styles.nota}>Nota para la cocina: {nota}</Text> : null}

      <Text style={styles.total}>Total: {formatearPrecio(totalCarrito())}</Text>

      <Pressable onPress={confirmar} style={({ pressed }) => [styles.boton, pressed && styles.presionado]}>
        <Text style={styles.textoBoton}>Confirmar</Text>
      </Pressable>

      <DondeEstoy />
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  contenedor: {
    padding: 16,
    gap: 10,
  },
  titulo: {
    fontSize: 22,
    fontWeight: '700',
  },
  linea: {
    fontSize: 15,
    color: '#333',
  },
  nota: {
    fontSize: 14,
    fontStyle: 'italic',
    color: '#555',
    backgroundColor: '#fef9c3',
    padding: 10,
    borderRadius: 8,
  },
  total: {
    fontSize: 20,
    fontWeight: '800',
    color: '#15803d',
  },
  boton: {
    backgroundColor: '#15803d',
    padding: 16,
    borderRadius: 12,
    alignItems: 'center',
    marginTop: 8,
  },
  presionado: {
    opacity: 0.8,
  },
  textoBoton: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '700',
  },
  error: {
    fontSize: 16,
    color: '#b91c1c',
  },
});
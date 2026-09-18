import { Link, Stack } from 'expo-router';
import { FlatList, Pressable, StyleSheet, Text, View } from 'react-native';

import { DondeEstoy } from '@/components/DondeEstoy';
import { useApp, type ItemCarrito } from '@/context/AppContext';
import { formatearPrecio } from '@/data/platos';

export default function Carrito() {
  const { carrito, nota, deshacerUltimo, pilaDeshacer, totalCarrito } = useApp();
  const total = totalCarrito();

  return (
    <FlatList
      style={styles.lista}
      contentContainerStyle={styles.contenido}
      data={carrito}
      keyExtractor={(item: ItemCarrito) => String(item.plato.id)}
      ListHeaderComponent={
        <>
          <Stack.Screen options={{ title: `Carrito (${carrito.length})` }} />
        </>
      }
      renderItem={({ item }) => (
        <View style={styles.fila}>
          <View style={styles.filaTexto}>
            <Text style={styles.nombre}>{item.plato.nombre}</Text>
            <Text style={styles.subtotal}>
              {item.cantidad} × {formatearPrecio(item.plato.precio)}
            </Text>
          </View>
          <Text style={styles.precio}>
            {formatearPrecio(item.plato.precio * item.cantidad)}
          </Text>
        </View>
      )}
      ListEmptyComponent={
        <Text style={styles.vacio}>
          El carrito está vacío. Agregá platos desde el menú.
        </Text>
      }
      ListFooterComponent={
        <>
          {nota ? <Text style={styles.nota}>Nota: {nota}</Text> : null}

          <View style={styles.totales}>
            <Text style={styles.totalTexto}>Total</Text>
            <Text style={styles.totalNumero}>{formatearPrecio(total)}</Text>
          </View>

          <Pressable
            style={pilaDeshacer.vacia ? styles.botonDeshabilitado : styles.boton}
            disabled={pilaDeshacer.vacia}
            onPress={deshacerUltimo}
          >
            <Text style={styles.textoBoton}>Deshacer último</Text>
          </Pressable>

          <Link href="/carrito/nota" asChild>
            <Pressable style={styles.botonSecundario}>
              <Text style={styles.textoSecundario}>Agregar nota para la cocina</Text>
            </Pressable>
          </Link>

          <Link href={carrito.length > 0 ? '/confirmar' : '/menu'} asChild>
            <Pressable style={carrito.length === 0 ? styles.botonDeshabilitado : styles.boton}>
              <Text style={styles.textoBoton}>Confirmar pedido</Text>
            </Pressable>
          </Link>

          <DondeEstoy />
        </>
      }
    />
  );
}

const styles = StyleSheet.create({
  lista: {
    flex: 1,
  },
  contenido: {
    padding: 16,
    gap: 8,
  },
  fila: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: '#fff',
    borderRadius: 10,
    borderWidth: 1,
    borderColor: '#e5e5e5',
    padding: 12,
  },
  filaTexto: {
    flex: 1,
    gap: 2,
  },
  nombre: {
    fontSize: 15,
    fontWeight: '600',
  },
  subtotal: {
    fontSize: 13,
    color: '#666',
  },
  precio: {
    fontSize: 15,
    fontWeight: '700',
    color: '#15803d',
  },
  vacio: {
    fontSize: 15,
    color: '#666',
    textAlign: 'center',
    marginVertical: 24,
  },
  nota: {
    fontSize: 14,
    fontStyle: 'italic',
    color: '#555',
    backgroundColor: '#fef9c3',
    padding: 10,
    borderRadius: 8,
    marginTop: 8,
  },
  totales: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 12,
  },
  totalTexto: {
    fontSize: 18,
    fontWeight: '600',
  },
  totalNumero: {
    fontSize: 22,
    fontWeight: '800',
    color: '#15803d',
  },
  boton: {
    backgroundColor: '#15803d',
    padding: 15,
    borderRadius: 12,
    alignItems: 'center',
    marginTop: 12,
  },
  botonSecundario: {
    backgroundColor: '#e5e5e5',
    padding: 15,
    borderRadius: 12,
    alignItems: 'center',
    marginTop: 8,
  },
  botonDeshabilitado: {
    backgroundColor: '#d1d5db',
    padding: 15,
    borderRadius: 12,
    alignItems: 'center',
    marginTop: 12,
  },
  textoBoton: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '700',
  },
  textoSecundario: {
    color: '#333',
    fontSize: 15,
    fontWeight: '600',
  },
});
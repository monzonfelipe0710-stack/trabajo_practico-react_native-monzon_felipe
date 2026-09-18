import { FlatList, StyleSheet, Text, View } from 'react-native';

import { DondeEstoy } from '@/components/DondeEstoy';
import { useApp, type Pedido } from '@/context/AppContext';
import { formatearPrecio } from '@/data/platos';

export default function Atendidos() {
  const { atendidosPila } = useApp();
  const atendidos = atendidosPila.aArray().reverse();

  return (
    <FlatList
      style={styles.lista}
      contentContainerStyle={styles.contenido}
      data={atendidos}
      keyExtractor={(pedido: Pedido) => String(pedido.numero)}
      renderItem={({ item }) => (
        <View style={styles.tarjeta}>
          <Text style={styles.numero}>
            Turno #{item.numero} · {item.hora}
          </Text>
          <Text style={styles.total}>Total: {formatearPrecio(item.total)}</Text>
          {item.nota ? <Text style={styles.nota}>Nota: {item.nota}</Text> : null}
        </View>
      )}
      ListHeaderComponent={<Text style={styles.titulo}>Pedidos atendidos</Text>}
      ListEmptyComponent={
        <Text style={styles.vacio}>Todavía no se atendió ningún pedido.</Text>
      }
      ListFooterComponent={<DondeEstoy />}
    />
  );
}

const styles = StyleSheet.create({
  lista: {
    flex: 1,
  },
  contenido: {
    padding: 16,
    gap: 10,
  },
  titulo: {
    fontSize: 22,
    fontWeight: '700',
    marginBottom: 4,
  },
  tarjeta: {
    backgroundColor: '#fff',
    borderWidth: 1,
    borderColor: '#e5e5e5',
    borderRadius: 10,
    padding: 14,
    gap: 4,
  },
  numero: {
    fontSize: 16,
    fontWeight: '700',
  },
  total: {
    fontSize: 15,
    color: '#15803d',
    fontWeight: '600',
  },
  nota: {
    fontSize: 13,
    fontStyle: 'italic',
    color: '#555',
  },
  vacio: {
    fontSize: 15,
    color: '#666',
    textAlign: 'center',
    marginVertical: 24,
  },
});
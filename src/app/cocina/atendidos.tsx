import { FlatList, StyleSheet, Text, View } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

import { DondeEstoy } from '@/components/DondeEstoy';
import { useApp, type Pedido } from '@/context/AppContext';
import { formatearPrecio } from '@/data/platos';
import { estilosComunes, tema } from '@/constantes/tema';

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
          <View style={styles.encabezado}>
            <View style={styles.bolita}>
              <Ionicons name="checkmark" size={16} color={tema.colores.exito} />
            </View>
            <Text style={styles.numero}>
              Turno #{item.numero} · {item.hora}
            </Text>
          </View>
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
    backgroundColor: tema.colores.fondo,
  },
  contenido: {
    padding: 20,
    paddingBottom: 32,
    gap: 10,
  },
  titulo: {
    fontSize: 22,
    fontWeight: '800',
    color: tema.colores.texto,
    marginBottom: 4,
  },
  tarjeta: {
    ...estilosComunes.tarjeta,
    padding: 16,
    gap: 6,
  },
  encabezado: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
  },
  bolita: {
    width: 26,
    height: 26,
    borderRadius: 10,
    backgroundColor: tema.colores.exitoSuave,
    alignItems: 'center',
    justifyContent: 'center',
  },
  numero: {
    fontSize: 16,
    fontWeight: '700',
    color: tema.colores.texto,
  },
  total: {
    fontSize: 15,
    color: tema.colores.exito,
    fontWeight: '600',
  },
  nota: {
    fontSize: 13,
    fontStyle: 'italic',
    color: tema.colores.textoSuave,
  },
  vacio: {
    fontSize: 15,
    color: tema.colores.textoSuave,
    textAlign: 'center',
    marginVertical: 24,
  },
});
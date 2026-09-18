import { Pressable, StyleSheet, Text, View } from 'react-native';
import { Link } from 'expo-router';
import type { Plato } from '@/data/platos';
import { formatearPrecio } from '@/data/platos';

type Props = {
  plato: Plato;
};

export function PlatoCard({ plato }: Props) {
  return (
    <Link href={{ pathname: '/(tabs)/menu/[id]', params: { id: plato.id } }} asChild>
      <Pressable style={styles.boton}>
        <View style={styles.texto}>
          <Text style={styles.nombre}>{plato.nombre}</Text>
          <Text style={styles.descripcion}>{plato.descripcion}</Text>
        </View>
        <Text style={styles.precio}>{formatearPrecio(plato.precio)}</Text>
      </Pressable>
    </Link>
  );
}

const styles = StyleSheet.create({
  boton: {
    backgroundColor: '#fff',
    padding: 16,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#e0e0e0',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  texto: {
    flex: 1,
    gap: 2,
  },
  nombre: {
    fontSize: 16,
    fontWeight: '600',
  },
  descripcion: {
    fontSize: 13,
    color: '#555',
    marginTop: 2,
  },
  precio: {
    fontSize: 15,
    fontWeight: '700',
    color: '#1a8c1a',
    marginLeft: 12,
  },
});
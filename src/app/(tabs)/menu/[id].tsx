import { Stack, useLocalSearchParams, useRouter } from 'expo-router';
import { Alert, Pressable, ScrollView, StyleSheet, Text } from 'react-native';

import { DondeEstoy } from '@/components/DondeEstoy';
import { useApp } from '@/context/AppContext';
import { formatearPrecio, platoPorId } from '@/data/platos';

export default function DetallePlato() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const plato = platoPorId(Number(id));
  const { agregarAlCarrito } = useApp();
  const router = useRouter();

  if (!plato) {
    return (
      <>
        <Stack.Screen options={{ title: 'Plato' }} />
        <ScrollView contentContainerStyle={styles.contenedor}>
          <Text style={styles.error}>No existe el plato {String(id)}.</Text>
          <Pressable style={styles.botonSecundario} onPress={() => router.navigate('/menu')}>
            <Text style={styles.textoSecundario}>Volver al menú</Text>
          </Pressable>
          <DondeEstoy />
        </ScrollView>
      </>
    );
  }

  return (
    <>
      <Stack.Screen options={{ title: plato.nombre }} />
      <ScrollView contentContainerStyle={styles.contenedor}>
        <Text style={styles.nombre}>{plato.nombre}</Text>
        <Text style={styles.precio}>{formatearPrecio(plato.precio)}</Text>
        <Text style={styles.descripcion}>{plato.descripcion}</Text>
        <Text style={styles.categoria}>Categoría: {plato.categoria}</Text>

        <Pressable
          style={({ pressed }) => [styles.boton, pressed && styles.presionado]}
          onPress={() => {
            agregarAlCarrito(plato);
            Alert.alert('Agregado', `${plato.nombre} se agregó al carrito.`);
          }}
        >
          <Text style={styles.textoBoton}>Agregar al carrito</Text>
        </Pressable>

        <DondeEstoy />
      </ScrollView>
    </>
  );
}

const styles = StyleSheet.create({
  contenedor: {
    padding: 16,
    gap: 12,
  },
  nombre: {
    fontSize: 26,
    fontWeight: '700',
  },
  precio: {
    fontSize: 24,
    fontWeight: '700',
    color: '#15803d',
  },
  descripcion: {
    fontSize: 15,
    color: '#444',
    lineHeight: 22,
  },
  categoria: {
    fontSize: 13,
    color: '#777',
  },
  boton: {
    backgroundColor: '#15803d',
    padding: 16,
    borderRadius: 12,
    alignItems: 'center',
  },
  botonSecundario: {
    backgroundColor: '#e5e5e5',
    padding: 14,
    borderRadius: 12,
    alignItems: 'center',
  },
  presionado: {
    opacity: 0.8,
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
  error: {
    fontSize: 18,
    color: '#b91c1c',
    marginBottom: 16,
  },
});
import { Stack, useLocalSearchParams, useRouter } from 'expo-router';
import { FlatList, Pressable, StyleSheet, Text } from 'react-native';

import { DondeEstoy } from '@/components/DondeEstoy';
import { PlatoCard } from '@/components/PlatoCard';
import { categoriaPorSlug, platosDeCategoria } from '@/data/platos';

export default function Categoria() {
  const { categoria } = useLocalSearchParams<{ categoria: string }>();
  const router = useRouter();
  const info = categoriaPorSlug(String(categoria));
  const platos = info ? platosDeCategoria(info.slug) : [];

  if (!info) {
    return (
      <>
        <Stack.Screen options={{ title: 'Categoría' }} />
        <FlatList
          style={styles.lista}
          contentContainerStyle={styles.contenido}
          data={[]}
          renderItem={() => null}
          ListHeaderComponent={
            <>
              <Text style={styles.error}>
                No existe la categoría “{String(categoria)}”. Las válidas son: desayuno,
                almuerzo, bebidas y kiosco.
              </Text>
              <Pressable style={styles.boton} onPress={() => router.replace('/menu')}>
                <Text style={styles.textoBoton}>Ver menú completo</Text>
              </Pressable>
            </>
          }
          ListFooterComponent={<DondeEstoy />}
        />
      </>
    );
  }

  return (
    <>
      <Stack.Screen options={{ title: info.nombre }} />
      <FlatList
        style={styles.lista}
        contentContainerStyle={styles.contenido}
        data={platos}
        keyExtractor={(plato) => String(plato.id)}
        renderItem={({ item }) => <PlatoCard plato={item} />}
        ListHeaderComponent={<Text style={styles.titulo}>Platos de {info.nombre}</Text>}
        ListFooterComponent={<DondeEstoy />}
      />
    </>
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
  titulo: {
    fontSize: 20,
    fontWeight: '700',
    marginBottom: 8,
  },
  error: {
    fontSize: 16,
    color: '#b91c1c',
    marginBottom: 16,
  },
  boton: {
    backgroundColor: '#15803d',
    padding: 15,
    borderRadius: 12,
    alignItems: 'center',
  },
  textoBoton: {
    color: '#fff',
    fontSize: 15,
    fontWeight: '700',
  },
});
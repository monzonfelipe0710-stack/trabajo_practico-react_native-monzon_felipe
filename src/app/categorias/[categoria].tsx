import { Stack, useLocalSearchParams, useRouter } from 'expo-router';
import { FlatList, Pressable, StyleSheet, Text } from 'react-native';

import { DondeEstoy } from '@/components/DondeEstoy';
import { PlatoCard } from '@/components/PlatoCard';
import { categoriaPorSlug, platosDeCategoria } from '@/data/platos';
import { tema } from '@/constantes/tema';

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
        numColumns={2}
        columnWrapperStyle={styles.columnas}
        keyExtractor={(plato) => String(plato.id)}
        renderItem={({ item, index }) => <PlatoCard plato={item} indice={index} />}
        ListHeaderComponent={<Text style={styles.titulo}>Platos de {info.nombre}</Text>}
        ListFooterComponent={<DondeEstoy />}
      />
    </>
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
    gap: 12,
  },
  columnas: {
    gap: 12,
  },
  titulo: {
    fontSize: 22,
    fontWeight: '800',
    color: tema.colores.texto,
    marginBottom: 2,
  },
  error: {
    fontSize: 15,
    color: tema.colores.peligro,
    lineHeight: 21,
    marginBottom: 16,
  },
  boton: {
    backgroundColor: tema.colores.acento,
    borderRadius: tema.radios.medio,
    paddingVertical: 14,
    alignItems: 'center',
  },
  textoBoton: {
    color: '#fff',
    fontSize: 15,
    fontWeight: '700',
  },
});
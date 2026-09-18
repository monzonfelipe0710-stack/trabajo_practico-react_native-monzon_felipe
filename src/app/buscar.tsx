import { router, useLocalSearchParams } from 'expo-router';
import { FlatList, Pressable, StyleSheet, Text, TextInput, View } from 'react-native';

import { DondeEstoy } from '@/components/DondeEstoy';
import { PlatoCard } from '@/components/PlatoCard';
import { CATEGORIAS, PLATOS, type Plato } from '@/data/platos';

type BuscarParams = {
  q?: string;
  categoria?: string;
};

export default function Buscar() {
  const { q, categoria } = useLocalSearchParams<BuscarParams>();
  const texto = typeof q === 'string' ? q : '';
  const filtro = typeof categoria === 'string' ? categoria : '';

  const resultados = PLATOS.filter((plato: Plato) => {
    const coincideTexto =
      plato.nombre.toLowerCase().includes(texto.toLowerCase()) ||
      plato.descripcion.toLowerCase().includes(texto.toLowerCase());
    const coincideCategoria = filtro === '' || plato.categoria === filtro;
    return coincideTexto && coincideCategoria;
  });

  const actualizar = (nuevoTexto: string, nuevaCategoria: string) => {
    router.setParams({ q: nuevoTexto, categoria: nuevaCategoria });
  };

  const toggleCategoria = (slug: string) => {
    actualizar(texto, filtro === slug ? '' : slug);
  };

  return (
    <FlatList
      style={styles.lista}
      contentContainerStyle={styles.contenido}
      data={resultados}
      keyExtractor={(plato: Plato) => String(plato.id)}
      renderItem={({ item }) => <PlatoCard plato={item} />}
      ListHeaderComponent={
        <>
          <Text style={styles.titulo}>Buscar platos</Text>
          <TextInput
            style={styles.input}
            value={texto}
            onChangeText={(nuevo) => actualizar(nuevo, filtro)}
            placeholder="Ej.: milanesa, café, empanada..."
            autoCapitalize="none"
            autoCorrect={false}
          />

          <View style={styles.chips}>
            <Pressable
              style={[styles.chip, filtro === '' && styles.chipActivo]}
              onPress={() => actualizar(texto, '')}
            >
              <Text style={filtro === '' ? styles.chipTextoActivo : styles.chipTexto}>
                Todas
              </Text>
            </Pressable>
            {CATEGORIAS.map((categoriaItem) => {
              const activa = filtro === categoriaItem.slug;
              return (
                <Pressable
                  key={categoriaItem.slug}
                  style={[styles.chip, activa && styles.chipActivo]}
                  onPress={() => toggleCategoria(categoriaItem.slug)}
                >
                  <Text style={activa ? styles.chipTextoActivo : styles.chipTexto}>
                    {categoriaItem.nombre}
                  </Text>
                </Pressable>
              );
            })}
          </View>

          <Text style={styles.resultado}>
            {resultados.length} resultado(s) para {texto ? `“${texto}”` : 'tu búsqueda'}
            {filtro ? ` · categoría “${filtro}”` : ''}
          </Text>
          <Text style={styles.compartir}>
            La búsqueda vive en la URL: se comparte como{' '}
            {`comedoripf://buscar?q=${encodeURIComponent(texto)}${filtro ? `&categoria=${filtro}` : ''}`}
          </Text>
        </>
      }
      ListEmptyComponent={
        <Text style={styles.vacio}>
          No encontramos platos con esos criterios. Probá cambiar el texto o el filtro.
        </Text>
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
    gap: 8,
  },
  titulo: {
    fontSize: 22,
    fontWeight: '700',
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 10,
    padding: 12,
    fontSize: 15,
    color: '#333',
  },
  chips: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
    marginTop: 8,
  },
  chip: {
    backgroundColor: '#f3f4f6',
    paddingVertical: 8,
    paddingHorizontal: 12,
    borderRadius: 999,
    borderWidth: 1,
    borderColor: '#e5e7eb',
  },
  chipActivo: {
    backgroundColor: '#15803d',
    borderColor: '#15803d',
  },
  chipTexto: {
    fontSize: 13,
    color: '#333',
  },
  chipTextoActivo: {
    fontSize: 13,
    color: '#fff',
    fontWeight: '600',
  },
  resultado: {
    fontSize: 13,
    color: '#666',
    marginTop: 12,
  },
  compartir: {
    fontSize: 12,
    color: '#888',
    fontStyle: 'italic',
    marginBottom: 4,
  },
  vacio: {
    fontSize: 15,
    color: '#666',
    textAlign: 'center',
    marginVertical: 24,
  },
});
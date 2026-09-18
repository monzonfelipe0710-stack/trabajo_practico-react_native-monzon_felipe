import { router, useLocalSearchParams } from 'expo-router';
import { FlatList, Pressable, StyleSheet, Text, TextInput, View } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

import { DondeEstoy } from '@/components/DondeEstoy';
import { PlatoCard } from '@/components/PlatoCard';
import { CATEGORIAS, PLATOS, type Plato } from '@/data/platos';
import { tema } from '@/constantes/tema';

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
      numColumns={2}
      columnWrapperStyle={styles.columnas}
      keyExtractor={(plato: Plato) => String(plato.id)}
      renderItem={({ item, index }) => <PlatoCard plato={item} indice={index} />}
      ListHeaderComponent={
        <>
          <View style={styles.buscador}>
            <Ionicons name="search" size={20} color={tema.colores.textoSuave} />
            <TextInput
              style={styles.input}
              value={texto}
              onChangeText={(nuevo) => actualizar(nuevo, filtro)}
              placeholder="Ej.: milanesa, café, empanada..."
              placeholderTextColor={tema.colores.textoSuave}
              autoCapitalize="none"
              autoCorrect={false}
            />
            {texto !== '' ? (
              <Pressable onPress={() => actualizar('', filtro)} hitSlop={8}>
                <Ionicons name="close-circle" size={18} color={tema.colores.textoSuave} />
              </Pressable>
            ) : null}
          </View>

          <View style={styles.chips}>
            <Pressable
              style={[styles.chip, !filtro && styles.chipActivo]}
              onPress={() => actualizar(texto, '')}
            >
              <Text style={!filtro ? styles.chipTextoActivo : styles.chipTexto}>Todas</Text>
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
            {resultados.length} resultado(s){texto ? ` para “${texto}”` : ''}
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
  buscador: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    backgroundColor: tema.colores.superficie,
    borderRadius: tema.radios.medio,
    borderWidth: 1,
    borderColor: tema.colores.borde,
    paddingHorizontal: 14,
  },
  input: {
    flex: 1,
    paddingVertical: 13,
    fontSize: 15,
    color: tema.colores.texto,
  },
  chips: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
  },
  chip: {
    backgroundColor: tema.colores.superficie,
    paddingVertical: 8,
    paddingHorizontal: 14,
    borderRadius: 999,
    borderWidth: 1,
    borderColor: tema.colores.borde,
  },
  chipActivo: {
    backgroundColor: tema.colores.texto,
    borderColor: tema.colores.texto,
  },
  chipTexto: {
    fontSize: 13,
    color: tema.colores.textoSuave,
  },
  chipTextoActivo: {
    fontSize: 13,
    color: tema.colores.superficie,
    fontWeight: '600',
  },
  resultado: {
    fontSize: 13,
    color: tema.colores.textoSuave,
    marginTop: 2,
  },
  compartir: {
    fontSize: 12,
    color: tema.colores.textoSuave,
    fontStyle: 'italic',
    lineHeight: 16,
  },
  vacio: {
    fontSize: 15,
    color: tema.colores.textoSuave,
    textAlign: 'center',
    marginVertical: 24,
  },
});
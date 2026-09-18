import { SectionList, StyleSheet, Text } from 'react-native';

import { DondeEstoy } from '@/components/DondeEstoy';
import { PlatoCard } from '@/components/PlatoCard';
import { platosPorCategoria, type Plato } from '@/data/platos';

export default function Menu() {
  const secciones = platosPorCategoria().map((grupo) => ({
    title: grupo.categoria.nombre,
    data: grupo.platos,
  }));

  return (
    <SectionList
      style={styles.lista}
      contentContainerStyle={styles.contenido}
      sections={secciones}
      keyExtractor={(item: Plato) => String(item.id)}
      renderItem={({ item }) => <PlatoCard plato={item} />}
      renderSectionHeader={({ section }) => (
        <Text style={styles.titulo}>{section.title}</Text>
      )}
      stickySectionHeadersEnabled={false}
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
    fontSize: 20,
    fontWeight: '700',
    marginTop: 12,
    marginBottom: 4,
  },
});
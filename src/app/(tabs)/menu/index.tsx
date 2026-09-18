import { Pressable, ScrollView, StyleSheet, Text, View } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { Link } from 'expo-router';
import Animated, { FadeInDown } from 'react-native-reanimated';

import { DondeEstoy } from '@/components/DondeEstoy';
import { PlatoCard } from '@/components/PlatoCard';
import { platosPorCategoria } from '@/data/platos';
import { tema } from '@/constantes/tema';

export default function Menu() {
  const grupos = platosPorCategoria();

  return (
    <ScrollView
      style={styles.fondo}
      contentContainerStyle={styles.contenido}
      showsVerticalScrollIndicator={false}
    >
      <Animated.View entering={FadeInDown.duration(280)}>
        <Text style={styles.titulo}>Nuestro menú</Text>
        <Text style={styles.subtitulo}>
          Tocá un plato para verlo en detalle y agregarlo a tu carrito.
        </Text>
        <Link href="/buscar" asChild>
          <Pressable style={({ pressed }) => [styles.buscador, pressed && styles.presionado]}>
            <Ionicons name="search" size={18} color={tema.colores.textoSuave} />
            <Text style={styles.buscadorTexto}>Buscar un plato</Text>
          </Pressable>
        </Link>
      </Animated.View>

      {grupos.map((grupo) => (
        <View key={grupo.categoria.slug} style={styles.grupo}>
          <Text style={styles.tituloGrupo}>{grupo.categoria.nombre}</Text>
          <View style={styles.grilla}>
            {grupo.platos.map((plato, indice) => (
              <PlatoCard key={plato.id} plato={plato} indice={indice} />
            ))}
          </View>
        </View>
      ))}

      <DondeEstoy />
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  fondo: {
    flex: 1,
    backgroundColor: tema.colores.fondo,
  },
  contenido: {
    padding: 20,
    paddingBottom: 32,
  },
  titulo: {
    fontSize: 28,
    fontWeight: '800',
    color: tema.colores.texto,
    letterSpacing: -0.5,
  },
  subtitulo: {
    fontSize: 14,
    color: tema.colores.textoSuave,
    lineHeight: 20,
    marginTop: 4,
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
    paddingVertical: 12,
    marginTop: 14,
  },
  presionado: {
    opacity: 0.8,
  },
  buscadorTexto: {
    fontSize: 15,
    color: tema.colores.textoSuave,
  },
  grupo: {
    marginTop: 22,
    gap: 10,
  },
  tituloGrupo: {
    fontSize: 13,
    fontWeight: '800',
    letterSpacing: 1.2,
    textTransform: 'uppercase',
    color: tema.colores.textoSuave,
  },
  grilla: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 12,
  },
});
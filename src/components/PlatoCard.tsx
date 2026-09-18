import { Pressable, StyleSheet, Text, View } from 'react-native';
import { Link } from 'expo-router';
import Animated, { FadeInDown } from 'react-native-reanimated';

import { PlatoImagen } from '@/components/PlatoImagen';
import { formatearPrecio, tipoCategoria, type Plato } from '@/data/platos';
import { tema } from '@/constantes/tema';

type Props = {
  plato: Plato;
  indice?: number;
};

export function PlatoCard({ plato, indice = 0 }: Props) {
  return (
    <Animated.View
      entering={FadeInDown.duration(320).delay(indice * 45)}
      style={styles.contenedor}
    >
      <Link href={{ pathname: '/(tabs)/menu/[id]', params: { id: plato.id } }} asChild>
        <Pressable style={({ pressed }) => [styles.tarjeta, pressed && styles.presionada]}>
          <PlatoImagen
            uri={plato.imagen}
            emoji={plato.emoji}
            categoria={plato.categoria}
            estilo={styles.imagen}
          />
          <View style={styles.info}>
            <Text style={styles.categoria} numberOfLines={1}>
              {tipoCategoria(plato.categoria)}
            </Text>
            <Text style={styles.nombre} numberOfLines={2}>
              {plato.nombre}
            </Text>
            <Text style={styles.precio}>{formatearPrecio(plato.precio)}</Text>
          </View>
        </Pressable>
      </Link>
    </Animated.View>
  );
}

const styles = StyleSheet.create({
  contenedor: {
    flexBasis: '47.5%',
    flexGrow: 1,
  },
  tarjeta: {
    backgroundColor: tema.colores.superficie,
    borderRadius: tema.radios.medio,
    borderWidth: 1,
    borderColor: tema.colores.borde,
    overflow: 'hidden',
  },
  presionada: {
    opacity: 0.85,
  },
  imagen: {
    width: '100%',
    aspectRatio: 1,
  },
  info: {
    padding: 12,
    gap: 3,
  },
  categoria: {
    fontSize: 11,
    fontWeight: '700',
    letterSpacing: 0.8,
    textTransform: 'uppercase',
    color: tema.colores.textoSuave,
  },
  nombre: {
    fontSize: 15,
    fontWeight: '600',
    color: tema.colores.texto,
    lineHeight: 19,
  },
  precio: {
    fontSize: 16,
    fontWeight: '800',
    color: tema.colores.acento,
    marginTop: 2,
  },
});
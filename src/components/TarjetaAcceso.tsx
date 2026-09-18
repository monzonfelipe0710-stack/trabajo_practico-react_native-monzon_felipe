import { Pressable, StyleSheet, Text, View } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { Link, type Href } from 'expo-router';
import Animated, { FadeInUp } from 'react-native-reanimated';

import { tema } from '@/constantes/tema';

type Props = {
  titulo: string;
  href: Href;
  icono: keyof typeof Ionicons.glyphMap;
  color?: string;
  descripcion?: string;
  indice?: number;
};

export function TarjetaAcceso({ titulo, href, icono, descripcion, color = '#57534E', indice = 0 }: Props) {
  return (
    <Animated.View entering={FadeInUp.duration(320).delay(indice * 60)} style={styles.contenedor}>
      <Link href={href} asChild>
        <Pressable style={({ pressed }) => [styles.tarjeta, pressed && styles.presionada]}>
          <View style={[styles.icono, { backgroundColor: `${color}1A` }]}>
            <Ionicons name={icono} size={22} color={color} />
          </View>
          <View style={styles.texto}>
            <Text style={styles.titulo}>{titulo}</Text>
            {descripcion ? <Text style={styles.descripcion}>{descripcion}</Text> : null}
          </View>
          <Ionicons name="chevron-forward" size={18} color={tema.colores.textoSuave} />
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
    ...tema.sombra,
    padding: 14,
    gap: 10,
    flexGrow: 1,
  },
  presionada: {
    opacity: 0.85,
    transform: [{ scale: 0.98 }],
  },
  icono: {
    width: 40,
    height: 40,
    borderRadius: 14,
    alignItems: 'center',
    justifyContent: 'center',
  },
  texto: {
    flex: 1,
    gap: 1,
  },
  titulo: {
    fontSize: 15,
    fontWeight: '700',
    color: tema.colores.texto,
  },
  descripcion: {
    fontSize: 12,
    color: tema.colores.textoSuave,
    lineHeight: 16,
  },
});
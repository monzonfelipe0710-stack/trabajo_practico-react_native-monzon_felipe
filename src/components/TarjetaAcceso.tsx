import { Pressable, StyleSheet, Text } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { Link, type Href } from 'expo-router';

type Props = {
  titulo: string;
  href: Href;
  icono: keyof typeof Ionicons.glyphMap;
  color?: string;
};

export function TarjetaAcceso({ titulo, href, icono, color = '#999' }: Props) {
  return (
    <Link href={href} asChild>
      <Pressable style={({ pressed }) => [styles.tarjeta, pressed && styles.presionada]}>
        <Ionicons name={icono} size={26} color={color} />
        <Text style={styles.titulo}>{titulo}</Text>
      </Pressable>
    </Link>
  );
}

const styles = StyleSheet.create({
  tarjeta: {
    flexBasis: '47%',
    flexGrow: 1,
    backgroundColor: '#fff',
    padding: 20,
    borderRadius: 14,
    borderWidth: 1,
    borderColor: '#e0e0e0',
    alignItems: 'center',
    gap: 10,
    flexDirection: 'row',
  },
  presionada: {
    opacity: 0.7,
  },
  titulo: {
    fontSize: 16,
    fontWeight: '600',
  },
});
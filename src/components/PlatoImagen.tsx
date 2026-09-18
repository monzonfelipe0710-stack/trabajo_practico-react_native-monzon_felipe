import { useState } from 'react';
import { StyleSheet, Text, View, type StyleProp, type ViewStyle } from 'react-native';
import { Image } from 'expo-image';

import { COLORES_CATEGORIA } from '@/data/platos';
import { tema } from '@/constantes/tema';

type Props = {
  uri: string;
  emoji: string;
  categoria: string;
  estilo?: StyleProp<ViewStyle>;
};

export function PlatoImagen({ uri, emoji, categoria, estilo }: Props) {
  const [fallo, setFallo] = useState(false);

  if (fallo) {
    return (
      <View
        style={[
          styles.fondo,
          { backgroundColor: COLORES_CATEGORIA[categoria] ?? tema.colores.acentoSuave },
          estilo,
        ]}
      >
        <Text style={styles.emoji}>{emoji}</Text>
      </View>
    );
  }

  return (
    <View style={[styles.fondo, { backgroundColor: COLORES_CATEGORIA[categoria] ?? '#EEE' }, estilo]}>
      <Text style={[styles.emoji, styles.emojiDebajo]}>{emoji}</Text>
      <Image
        source={{ uri }}
        style={StyleSheet.absoluteFill}
        contentFit="cover"
        transition={300}
        onError={() => setFallo(true)}
        recyclingKey={uri}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  fondo: {
    overflow: 'hidden',
    alignItems: 'center',
    justifyContent: 'center',
  },
  emoji: {
    fontSize: 34,
  },
  emojiDebajo: {
    opacity: 0.9,
  },
});
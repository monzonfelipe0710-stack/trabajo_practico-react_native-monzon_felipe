import { useRouter } from 'expo-router';
import { Pressable, ScrollView, StyleSheet, Text, TextInput } from 'react-native';

import { DondeEstoy } from '@/components/DondeEstoy';
import { useApp } from '@/context/AppContext';
import { tema } from '@/constantes/tema';

export default function NotaCarrito() {
  const { nota, setNota } = useApp();
  const router = useRouter();

  return (
    <ScrollView contentContainerStyle={styles.contenedor} keyboardShouldPersistTaps="handled">
      <Text style={styles.texto}>
        Escribí una aclaración para la cocina (por ejemplo: «sin sal» o «bien caliente»).
      </Text>
      <TextInput
        style={styles.input}
        value={nota}
        onChangeText={setNota}
        placeholder="Ej.: sin sal, sin mayonesa..."
        placeholderTextColor={tema.colores.textoSuave}
        multiline
        numberOfLines={4}
      />
      <Pressable style={styles.boton} onPress={() => router.back()}>
        <Text style={styles.textoBoton}>Guardar nota</Text>
      </Pressable>
      <DondeEstoy />
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  contenedor: {
    padding: 20,
    gap: 14,
    backgroundColor: tema.colores.fondo,
  },
  texto: {
    fontSize: 15,
    color: tema.colores.textoSuave,
    lineHeight: 21,
  },
  input: {
    backgroundColor: tema.colores.superficie,
    borderWidth: 1,
    borderColor: tema.colores.borde,
    borderRadius: tema.radios.medio,
    padding: 14,
    fontSize: 15,
    minHeight: 100,
    textAlignVertical: 'top',
    color: tema.colores.texto,
    lineHeight: 22,
  },
  boton: {
    backgroundColor: tema.colores.acento,
    borderRadius: tema.radios.medio,
    paddingVertical: 15,
    alignItems: 'center',
  },
  textoBoton: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '700',
  },
});
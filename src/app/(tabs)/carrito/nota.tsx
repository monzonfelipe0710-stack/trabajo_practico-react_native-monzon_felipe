import { useRouter } from 'expo-router';
import { Pressable, ScrollView, StyleSheet, Text, TextInput } from 'react-native';

import { DondeEstoy } from '@/components/DondeEstoy';
import { useApp } from '@/context/AppContext';

export default function NotaCarrito() {
  const { nota, setNota } = useApp();
  const router = useRouter();

  return (
    <ScrollView contentContainerStyle={styles.contenedor} keyboardShouldPersistTaps="handled">
      <Text style={styles.texto}>
        Escribí una aclaración para la cocina (por ejemplo: “sin sal” o “caliente”).
      </Text>
      <TextInput
        style={styles.input}
        value={nota}
        onChangeText={setNota}
        placeholder="Ej.: sin sal, sin mayonesa..."
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
    padding: 16,
    gap: 12,
  },
  texto: {
    fontSize: 15,
    color: '#444',
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 10,
    padding: 12,
    fontSize: 15,
    minHeight: 100,
    textAlignVertical: 'top',
  },
  boton: {
    backgroundColor: '#15803d',
    padding: 15,
    borderRadius: 12,
    alignItems: 'center',
  },
  textoBoton: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '700',
  },
});
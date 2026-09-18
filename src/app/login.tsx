import { useRouter } from 'expo-router';
import { useState } from 'react';
import { Pressable, ScrollView, StyleSheet, Text, TextInput, View } from 'react-native';

import { DondeEstoy } from '@/components/DondeEstoy';
import { CLAVE_COCINA, USUARIO_COCINA, useApp } from '@/context/AppContext';

export default function Login() {
  const { iniciarSesion } = useApp();
  const router = useRouter();
  const [usuarioIngresado, setUsuarioIngresado] = useState('');
  const [clave, setClave] = useState('');
  const [error, setError] = useState('');

  const entrar = () => {
    if (iniciarSesion(usuarioIngresado.trim(), clave)) {
      router.replace('/cocina');
    } else {
      setError('Usuario o clave incorrectos. Probá de nuevo.');
    }
  };

  return (
    <ScrollView contentContainerStyle={styles.contenedor} keyboardShouldPersistTaps="handled">
      <Text style={styles.titulo}>Ingreso del personal de cocina</Text>
      <Text style={styles.ayuda}>
        Usuario: {USUARIO_COCINA} · Clave: {CLAVE_COCINA}
      </Text>

      <TextInput
        style={styles.input}
        value={usuarioIngresado}
        onChangeText={setUsuarioIngresado}
        placeholder="Usuario"
        autoCapitalize="none"
        autoCorrect={false}
      />
      <TextInput
        style={styles.input}
        value={clave}
        onChangeText={setClave}
        placeholder="Clave"
        secureTextEntry
        autoCapitalize="none"
      />

      {error ? <Text style={styles.error}>{error}</Text> : null}

      <Pressable style={({ pressed }) => [styles.boton, pressed && styles.presionado]} onPress={entrar}>
        <Text style={styles.textoBoton}>Ingresar</Text>
      </Pressable>

      <View style={styles.ayudaFlujo}>
        <Text style={styles.ayudaFlujoTexto}>
          El modal se cierra solo al iniciar sesión: el guard de la ruta pasa a falso y la
          pantalla desaparece de la pila.
        </Text>
      </View>

      <DondeEstoy />
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  contenedor: {
    padding: 16,
    gap: 12,
  },
  titulo: {
    fontSize: 22,
    fontWeight: '700',
  },
  ayuda: {
    fontSize: 13,
    color: '#777',
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 10,
    padding: 12,
    fontSize: 15,
    color: '#333',
  },
  boton: {
    backgroundColor: '#15803d',
    padding: 16,
    borderRadius: 12,
    alignItems: 'center',
  },
  presionado: {
    opacity: 0.8,
  },
  textoBoton: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '700',
  },
  error: {
    color: '#b91c1c',
    fontSize: 14,
  },
  ayudaFlujo: {
    backgroundColor: '#f3f4f6',
    padding: 12,
    borderRadius: 8,
    marginTop: 8,
  },
  ayudaFlujoTexto: {
    fontSize: 13,
    color: '#555',
    lineHeight: 18,
  },
});
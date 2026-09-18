import { useRouter } from 'expo-router';
import { useState } from 'react';
import { Pressable, ScrollView, StyleSheet, Text, TextInput, View } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

import { DondeEstoy } from '@/components/DondeEstoy';
import { CLAVE_COCINA, USUARIO_COCINA, useApp } from '@/context/AppContext';
import { estilosComunes, tema } from '@/constantes/tema';

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
      <View style={styles.icono}>
        <Ionicons name="flame" size={30} color={tema.colores.acento} />
      </View>
      <Text style={styles.titulo}>Acceso a la cocina</Text>
      <Text style={styles.ayuda}>
        Zona restringida al personal del comedor. Usuario: {USUARIO_COCINA} · Clave:{' '}
        {CLAVE_COCINA}
      </Text>

      <View style={styles.formulario}>
        <TextInput
          style={styles.input}
          value={usuarioIngresado}
          onChangeText={setUsuarioIngresado}
          placeholder="Usuario"
          placeholderTextColor={tema.colores.textoSuave}
          autoCapitalize="none"
          autoCorrect={false}
        />
        <TextInput
          style={styles.input}
          value={clave}
          onChangeText={setClave}
          placeholder="Clave"
          placeholderTextColor={tema.colores.textoSuave}
          secureTextEntry
          autoCapitalize="none"
        />

        {error ? (
          <View style={styles.errorCaja}>
            <Ionicons name="alert-circle" size={16} color={tema.colores.peligro} />
            <Text style={styles.error}>{error}</Text>
          </View>
        ) : null}

        <Pressable
          style={({ pressed }) => [styles.boton, pressed && styles.presionado]}
          onPress={entrar}
        >
          <Text style={styles.textoBoton}>Ingresar</Text>
        </Pressable>
      </View>

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
    padding: 24,
    gap: 12,
    alignItems: 'center',
    backgroundColor: tema.colores.fondo,
  },
  icono: {
    width: 64,
    height: 64,
    borderRadius: 22,
    backgroundColor: tema.colores.acentoSuave,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 4,
  },
  titulo: {
    fontSize: 22,
    fontWeight: '800',
    color: tema.colores.texto,
    textAlign: 'center',
  },
  ayuda: {
    fontSize: 13,
    color: tema.colores.textoSuave,
    textAlign: 'center',
    lineHeight: 19,
  },
  formulario: {
    width: '100%',
    ...estilosComunes.tarjeta,
    padding: 16,
    gap: 10,
    marginTop: 8,
  },
  input: {
    backgroundColor: tema.colores.fondo,
    borderWidth: 1,
    borderColor: tema.colores.borde,
    borderRadius: tema.radios.suave,
    padding: 13,
    fontSize: 15,
    color: tema.colores.texto,
  },
  errorCaja: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    backgroundColor: tema.colores.peligroSuave,
    borderRadius: tema.radios.suave,
    padding: 10,
  },
  error: {
    color: tema.colores.peligro,
    fontSize: 13,
    flex: 1,
  },
  boton: {
    backgroundColor: tema.colores.acento,
    borderRadius: tema.radios.medio,
    paddingVertical: 15,
    alignItems: 'center',
    marginTop: 2,
  },
  presionado: {
    opacity: 0.86,
  },
  textoBoton: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '700',
  },
  ayudaFlujo: {
    borderWidth: 1,
    borderColor: tema.colores.borde,
    borderRadius: tema.radios.suave,
    padding: 12,
    width: '100%',
  },
  ayudaFlujoTexto: {
    fontSize: 13,
    color: tema.colores.textoSuave,
    lineHeight: 18,
  },
});
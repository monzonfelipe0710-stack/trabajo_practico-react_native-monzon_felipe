import { Stack, useLocalSearchParams, useRouter } from 'expo-router';
import { Alert, Pressable, ScrollView, StyleSheet, Text, View } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import Animated, { FadeInDown } from 'react-native-reanimated';

import { DondeEstoy } from '@/components/DondeEstoy';
import { PlatoImagen } from '@/components/PlatoImagen';
import { useApp } from '@/context/AppContext';
import { formatearPrecio, platoPorId, tipoCategoria } from '@/data/platos';
import { estilosComunes, tema } from '@/constantes/tema';

export default function DetallePlato() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const plato = platoPorId(Number(id));
  const { agregarAlCarrito } = useApp();
  const router = useRouter();

  if (!plato) {
    return (
      <>
        <Stack.Screen options={{ title: 'Plato' }} />
        <ScrollView contentContainerStyle={styles.contenido}>
          <Text style={styles.error}>No existe el plato {String(id)}.</Text>
          <Pressable style={styles.botonSecundario} onPress={() => router.navigate('/menu')}>
            <Text style={styles.textoSecundario}>Volver al menú</Text>
          </Pressable>
          <DondeEstoy />
        </ScrollView>
      </>
    );
  }

  return (
    <>
      <Stack.Screen options={{ title: '' }} />
      <ScrollView
        style={styles.fondo}
        contentContainerStyle={styles.contenido}
        showsVerticalScrollIndicator={false}
      >
        <PlatoImagen
          uri={plato.imagen}
          emoji={plato.emoji}
          categoria={plato.categoria}
          estilo={styles.imagen}
        />

        <Animated.View entering={FadeInDown.duration(320).delay(80)} style={styles.cuerpo}>
          <View style={styles.encabezado}>
            <Text style={styles.categoria}>{tipoCategoria(plato.categoria)}</Text>
            <Text style={styles.nombre}>{plato.nombre}</Text>
            <Text style={styles.descripcion}>{plato.descripcion}</Text>
          </View>

          <View style={styles.precioRow}>
            <Text style={styles.precio}>Precio</Text>
            <Text style={styles.precioNumero}>{formatearPrecio(plato.precio)}</Text>
          </View>

          <Pressable
            style={({ pressed }) => [styles.boton, pressed && styles.presionado]}
            onPress={() => {
              agregarAlCarrito(plato);
              Alert.alert('Listo', `${plato.nombre} se agregó a tu carrito.`);
            }}
          >
            <Ionicons name="add-circle-outline" size={20} color="#fff" />
            <Text style={styles.textoBoton}>Agregar al carrito</Text>
          </Pressable>

          <DondeEstoy />
        </Animated.View>
      </ScrollView>
    </>
  );
}

const styles = StyleSheet.create({
  fondo: {
    flex: 1,
    backgroundColor: tema.colores.fondo,
  },
  contenido: {
    paddingBottom: 40,
  },
  imagen: {
    width: '100%',
    height: 300,
  },
  cuerpo: {
    marginTop: -28,
    backgroundColor: tema.colores.fondo,
    borderTopLeftRadius: tema.radios.grande,
    borderTopRightRadius: tema.radios.grande,
    padding: 20,
    gap: 18,
  },
  encabezado: {
    gap: 4,
  },
  categoria: {
    fontSize: 12,
    fontWeight: '800',
    letterSpacing: 1.2,
    textTransform: 'uppercase',
    color: tema.colores.acento,
  },
  nombre: {
    fontSize: 26,
    fontWeight: '800',
    color: tema.colores.texto,
    letterSpacing: -0.4,
  },
  descripcion: {
    fontSize: 15,
    color: tema.colores.textoSuave,
    lineHeight: 22,
    marginTop: 4,
  },
  precioRow: {
    ...estilosComunes.tarjeta,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 16,
  },
  precio: {
    fontSize: 14,
    color: tema.colores.textoSuave,
  },
  precioNumero: {
    fontSize: 24,
    fontWeight: '800',
    color: tema.colores.acento,
  },
  boton: {
    backgroundColor: tema.colores.acento,
    borderRadius: tema.radios.medio,
    paddingVertical: 16,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 8,
  },
  presionado: {
    opacity: 0.86,
    transform: [{ scale: 0.99 }],
  },
  textoBoton: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '700',
  },
  botonSecundario: {
    backgroundColor: tema.colores.superficie,
    borderWidth: 1,
    borderColor: tema.colores.borde,
    padding: 14,
    borderRadius: tema.radios.suave,
    alignItems: 'center',
  },
  textoSecundario: {
    color: tema.colores.texto,
    fontSize: 15,
    fontWeight: '600',
  },
  error: {
    fontSize: 18,
    color: tema.colores.peligro,
    marginBottom: 16,
  },
});
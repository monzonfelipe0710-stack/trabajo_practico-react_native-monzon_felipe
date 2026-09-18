import { Link } from 'expo-router';
import { Pressable, ScrollView, StyleSheet, Text, View } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import Animated, { FadeInDown } from 'react-native-reanimated';

import { DondeEstoy } from '@/components/DondeEstoy';
import { estilosComunes, tema } from '@/constantes/tema';

const ARTICULOS = [
  {
    href: '/ayuda/pagos',
    titulo: 'Medios de pago',
    descripcion: 'Efectivo y billetera virtual',
  },
  {
    href: '/ayuda/pagos/efectivo',
    titulo: 'Cómo pagar en efectivo',
    descripcion: 'Aboná al retirar tu pedido',
  },
  {
    href: '/ayuda/horarios',
    titulo: 'Horarios del comedor',
    descripcion: 'Desayuno, almuerzo y kiosco',
  },
] as const;

export default function AyudaIndice() {
  return (
    <ScrollView
      style={styles.fondo}
      contentContainerStyle={styles.contenido}
      showsVerticalScrollIndicator={false}
    >
      <Animated.View entering={FadeInDown.duration(280)}>
        <Text style={styles.titulo}>Centro de ayuda</Text>
        <Text style={styles.subtitulo}>
          Elegí un artículo. Las rutas de ayuda tienen profundidad variable (catch-all).
        </Text>
      </Animated.View>

      <View style={styles.lista}>
        {ARTICULOS.map((articulo, indice) => (
          <Animated.View key={articulo.href} entering={FadeInDown.duration(300).delay(indice * 80)}>
            <Link href={articulo.href} asChild>
              <Pressable style={({ pressed }) => [styles.enlace, pressed && styles.presionado]}>
                <View style={styles.bolita}>
                  <Ionicons
                    name={articulo.href.includes('efectivo') ? 'cash-outline' : 'document-text-outline'}
                    size={18}
                    color={tema.colores.acento}
                  />
                </View>
                <View style={styles.enlaceTexto}>
                  <Text style={styles.enlaceTitulo}>{articulo.titulo}</Text>
                  <Text style={styles.enlaceDescripcion}>{articulo.descripcion}</Text>
                </View>
                <Ionicons name="chevron-forward" size={18} color={tema.colores.textoSuave} />
              </Pressable>
            </Link>
          </Animated.View>
        ))}
      </View>

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
    gap: 16,
  },
  titulo: {
    fontSize: 26,
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
  lista: {
    gap: 10,
  },
  enlace: {
    ...estilosComunes.tarjeta,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    padding: 14,
  },
  presionado: {
    opacity: 0.85,
  },
  bolita: {
    width: 40,
    height: 40,
    borderRadius: 14,
    backgroundColor: tema.colores.acentoSuave,
    alignItems: 'center',
    justifyContent: 'center',
  },
  enlaceTexto: {
    flex: 1,
    gap: 1,
  },
  enlaceTitulo: {
    fontSize: 15,
    fontWeight: '700',
    color: tema.colores.texto,
  },
  enlaceDescripcion: {
    fontSize: 12,
    color: tema.colores.textoSuave,
  },
});
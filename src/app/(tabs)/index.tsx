import { ScrollView, StyleSheet, Text, View } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import Animated, { FadeInDown } from 'react-native-reanimated';

import { DondeEstoy } from '@/components/DondeEstoy';
import { TarjetaAcceso } from '@/components/TarjetaAcceso';
import { useApp } from '@/context/AppContext';
import { estilosComunes, tema } from '@/constantes/tema';

export default function Inicio() {
  const { usuario } = useApp();

  return (
    <ScrollView contentContainerStyle={styles.contenedor} showsVerticalScrollIndicator={false}>
      <Animated.View entering={FadeInDown.duration(300)}>
        <Text style={estilosComunes.etiqueta}>Comedor IPF</Text>
        <Text style={styles.saludo}>¡Bienvenido{usuario ? ' de nuevo' : ''}!</Text>
        <Text style={styles.subtitulo}>
          Pedí tu comida desde el celular: la cocina la atiende por orden de llegada.
        </Text>
      </Animated.View>

      <View style={styles.grilla}>
        <TarjetaAcceso
          titulo="Ver menú"
          href="/menu"
          icono="restaurant"
          color="#C2410C"
          descripcion="Platos por categoría"
          indice={1}
        />
        <TarjetaAcceso
          titulo="Buscar"
          href="/buscar"
          icono="search"
          color="#15803D"
          descripcion="Encontrá tu plato"
          indice={2}
        />
        <TarjetaAcceso
          titulo="Ayuda"
          href="/ayuda"
          icono="help-circle"
          color="#2563EB"
          descripcion="Preguntas frecuentes"
          indice={3}
        />
        <TarjetaAcceso
          titulo={usuario ? 'Cocina' : 'Acceso cocina'}
          href={usuario ? '/cocina' : '/login'}
          icono={usuario ? 'flame' : 'lock-closed'}
          color="#DC2626"
          descripcion={usuario ? 'Pedidos en cola' : 'Zona restringida'}
          indice={4}
        />
      </View>

      <Animated.View entering={FadeInDown.duration(320).delay(240)} style={styles.comoFunciona}>
        <View style={[styles.bolita, { backgroundColor: tema.colores.exitoSuave }]}>
          <Ionicons name="time" size={18} color={tema.colores.exito} />
        </View>
        <View style={styles.comoFuncionaTexto}>
          <Text style={styles.comoFuncionaTitulo}>¿Cómo funciona?</Text>
          <Text style={styles.comoFuncionaDescripcion}>
            Armás tu carrito, confirmás y recibís un turno. Cada pedido se atiende en 3 minutos
            promedio.
          </Text>
        </View>
      </Animated.View>

      <DondeEstoy />
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  contenedor: {
    padding: 20,
    gap: 16,
  },
  saludo: {
    fontSize: 30,
    fontWeight: '800',
    color: tema.colores.texto,
    letterSpacing: -0.5,
    marginTop: 6,
  },
  subtitulo: {
    fontSize: 15,
    color: tema.colores.textoSuave,
    lineHeight: 21,
    marginTop: 6,
  },
  grilla: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 12,
    marginTop: 6,
  },
  comoFunciona: {
    ...estilosComunes.tarjeta,
    flexDirection: 'row',
    gap: 12,
    padding: 16,
    alignItems: 'center',
  },
  bolita: {
    width: 42,
    height: 42,
    borderRadius: 15,
    alignItems: 'center',
    justifyContent: 'center',
  },
  comoFuncionaTexto: {
    flex: 1,
    gap: 2,
  },
  comoFuncionaTitulo: {
    fontSize: 15,
    fontWeight: '700',
    color: tema.colores.texto,
  },
  comoFuncionaDescripcion: {
    fontSize: 13,
    color: tema.colores.textoSuave,
    lineHeight: 18,
  },
});
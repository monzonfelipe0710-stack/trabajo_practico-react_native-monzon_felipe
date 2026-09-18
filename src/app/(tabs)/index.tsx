import { ScrollView, StyleSheet, Text, View } from 'react-native';

import { DondeEstoy } from '@/components/DondeEstoy';
import { TarjetaAcceso } from '@/components/TarjetaAcceso';
import { useApp } from '@/context/AppContext';

export default function Inicio() {
  const { usuario } = useApp();

  return (
    <ScrollView contentContainerStyle={styles.contenedor}>
      <Text style={styles.saludo}>¡Hola! 👋</Text>
      <Text style={styles.subtitulo}>
        Bienvenido/a al comedor del Instituto. Pedí tu comida desde el celular y la cocina la
        atiende en orden de llegada.
      </Text>

      <View style={styles.grilla}>
        <TarjetaAcceso titulo="Menú" href="/menu" icono="restaurant" color="#d97706" />
        <TarjetaAcceso titulo="Buscar" href="/buscar" icono="search" color="#059669" />
        <TarjetaAcceso titulo="Ayuda" href="/ayuda" icono="help-circle" color="#2563eb" />
        {usuario ? (
          <TarjetaAcceso titulo="Cocina" href="/cocina" icono="flame" color="#dc2626" />
        ) : (
          <TarjetaAcceso titulo="Cocina (acceso)" href="/login" icono="lock-closed" color="#dc2626" />
        )}
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
  saludo: {
    fontSize: 28,
    fontWeight: '700',
  },
  subtitulo: {
    fontSize: 15,
    color: '#444',
    lineHeight: 21,
  },
  grilla: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 12,
    marginTop: 8,
  },
});
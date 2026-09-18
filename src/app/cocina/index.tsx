import { Alert, Pressable, ScrollView, StyleSheet, Text, View } from 'react-native';

import { DondeEstoy } from '@/components/DondeEstoy';
import { useApp } from '@/context/AppContext';
import { formatearPrecio } from '@/data/platos';

export default function Cocina() {
  const { pedidosCola, atendidosPila, atenderSiguiente, cerrarSesion } = useApp();

  const frente = pedidosCola.frente();
  const enEspera = pedidosCola.tamanio;
  const ultimoAtendido = atendidosPila.tope();

  const atender = () => {
    const atendido = atenderSiguiente();
    if (!atendido) {
      Alert.alert('Sin pedidos', 'No hay pedidos esperando en la cola.');
      return;
    }
  };

  return (
    <ScrollView contentContainerStyle={styles.contenedor}>
      <Text style={styles.titulo}>Pedidos en cola</Text>
      <Text style={styles.contador}>
        {enEspera === 0
          ? 'No hay pedidos esperando.'
          : `${enEspera} en espera (frente: #${frente?.numero})`}
      </Text>

      <View style={styles.tarjetaFrente}>
        <Text style={styles.etiqueta}>Frente de la cola</Text>
        {frente ? (
          <>
            <Text style={styles.numero}>Turno #{frente.numero} · {frente.hora}</Text>
            {frente.items.map((item) => (
              <Text key={item.plato.id} style={styles.linea}>
                {item.cantidad} × {item.plato.nombre}
              </Text>
            ))}
            <Text style={styles.total}>Total: {formatearPrecio(frente.total)}</Text>
            {frente.nota ? <Text style={styles.nota}>Nota: {frente.nota}</Text> : null}
          </>
        ) : (
          <Text style={styles.vacio}>Sin pedidos</Text>
        )}
      </View>

      <Pressable
        style={({ pressed }) => [styles.boton, pressed && styles.presionado]}
        onPress={atender}
      >
        <Text style={styles.textoBoton}>
          Atender siguiente {frente ? `(#${frente.numero})` : ''}
        </Text>
      </Pressable>

      {ultimoAtendido ? (
        <Text style={styles.ultimo}>
          Último atendido: turno #{ultimoAtendido.numero}
        </Text>
      ) : null}

      <Pressable
        style={({ pressed }) => [styles.botonCerrar, pressed && styles.presionado]}
        onPress={cerrarSesion}
      >
        <Text style={styles.textoCerrar}>Cerrar sesión</Text>
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
  titulo: {
    fontSize: 22,
    fontWeight: '700',
  },
  contador: {
    fontSize: 15,
    color: '#555',
  },
  tarjetaFrente: {
    backgroundColor: '#fff',
    borderWidth: 1,
    borderColor: '#e5e5e5',
    borderRadius: 12,
    padding: 16,
    gap: 6,
  },
  etiqueta: {
    fontSize: 13,
    color: '#888',
    textTransform: 'uppercase',
    letterSpacing: 0.5,
  },
  numero: {
    fontSize: 18,
    fontWeight: '700',
  },
  linea: {
    fontSize: 15,
    color: '#333',
  },
  total: {
    fontSize: 17,
    fontWeight: '800',
    color: '#15803d',
    marginTop: 4,
  },
  nota: {
    fontSize: 14,
    fontStyle: 'italic',
    color: '#555',
    backgroundColor: '#fef9c3',
    padding: 8,
    borderRadius: 6,
  },
  vacio: {
    fontSize: 15,
    color: '#666',
  },
  boton: {
    backgroundColor: '#15803d',
    padding: 16,
    borderRadius: 12,
    alignItems: 'center',
  },
  botonCerrar: {
    backgroundColor: '#fee2e2',
    padding: 14,
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
  textoCerrar: {
    color: '#b91c1c',
    fontSize: 15,
    fontWeight: '700',
  },
  ultimo: {
    fontSize: 13,
    color: '#888',
  },
});
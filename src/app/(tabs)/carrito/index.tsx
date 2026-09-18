import { Link, Stack } from 'expo-router';
import { FlatList, Pressable, StyleSheet, Text, View } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

import { DondeEstoy } from '@/components/DondeEstoy';
import { PlatoImagen } from '@/components/PlatoImagen';
import { useApp, type ItemCarrito } from '@/context/AppContext';
import { formatearPrecio } from '@/data/platos';
import { estilosComunes, tema } from '@/constantes/tema';

export default function Carrito() {
  const { carrito, nota, deshacerUltimo, pilaDeshacer, totalCarrito } = useApp();
  const total = totalCarrito();
  const vacio = carrito.length === 0;

  return (
    <FlatList
      style={styles.lista}
      contentContainerStyle={styles.contenido}
      data={carrito}
      keyExtractor={(item: ItemCarrito) => String(item.plato.id)}
      ListHeaderComponent={
        <>
          <Stack.Screen options={{ title: '' }} />
          <Text style={styles.titulo}>Tu carrito</Text>
          <Text style={styles.subtitulo}>
            {vacio ? 'Todavía no agregaste nada.' : `${carrito.length} ítem(s) listos para pedir.`}
          </Text>
        </>
      }
      renderItem={({ item }) => (
        <View style={styles.fila}>
          <PlatoImagen
            uri={item.plato.imagen}
            emoji={item.plato.emoji}
            categoria={item.plato.categoria}
            estilo={styles.miniatura}
          />
          <View style={styles.filaTexto}>
            <Text style={styles.nombre} numberOfLines={1}>
              {item.plato.nombre}
            </Text>
            <Text style={styles.subtotal}>
              {item.cantidad} × {formatearPrecio(item.plato.precio)}
            </Text>
          </View>
          <Text style={styles.precio}>{formatearPrecio(item.plato.precio * item.cantidad)}</Text>
        </View>
      )}
      ListEmptyComponent={
        <View style={styles.vacio}>
          <Ionicons name="cart-outline" size={34} color={tema.colores.textoSuave} />
          <Text style={styles.vacioTexto}>Andá al menú y elegí tus platos favoritos.</Text>
          <Link href="/menu" asChild>
            <Pressable style={styles.boton}>
              <Text style={styles.textoBoton}>Ver el menú</Text>
            </Pressable>
          </Link>
        </View>
      }
      ListFooterComponent={
        !vacio ? (
          <>
            {nota ? (
              <View style={styles.nota}>
                <Ionicons
                  name="chatbubble-ellipses-outline"
                  size={16}
                  color={tema.colores.textoSuave}
                />
                <Text style={styles.notaTexto}>{nota}</Text>
              </View>
            ) : null}

            <View style={styles.totales}>
              <Text style={styles.totalEtiqueta}>Total</Text>
              <Text style={styles.totalNumero}>{formatearPrecio(total)}</Text>
            </View>

            <Link href="/carrito/nota" asChild>
              <Pressable style={styles.botonSecundario}>
                <Ionicons name="create-outline" size={18} color={tema.colores.texto} />
                <Text style={styles.textoSecundario}>
                  {nota ? 'Editar nota' : 'Agregar nota'}
                </Text>
              </Pressable>
            </Link>

            <Pressable
              style={pilaDeshacer.vacia ? styles.botonDeshabilitado : styles.botonInverso}
              disabled={pilaDeshacer.vacia}
              onPress={deshacerUltimo}
            >
              <Ionicons name="arrow-undo" size={18} color={tema.colores.acento} />
              <Text style={styles.textoInverso}>Deshacer último</Text>
            </Pressable>

            <Link href="/confirmar" asChild>
              <Pressable style={styles.boton}>
                <Ionicons name="checkmark-circle-outline" size={20} color="#fff" />
                <Text style={styles.textoBoton}>Confirmar pedido</Text>
              </Pressable>
            </Link>

            <DondeEstoy />
          </>
        ) : null
      }
    />
  );
}

const styles = StyleSheet.create({
  lista: {
    flex: 1,
    backgroundColor: tema.colores.fondo,
  },
  contenido: {
    padding: 20,
    paddingBottom: 32,
    gap: 10,
  },
  titulo: {
    fontSize: 28,
    fontWeight: '800',
    color: tema.colores.texto,
    letterSpacing: -0.5,
  },
  subtitulo: {
    fontSize: 14,
    color: tema.colores.textoSuave,
    marginTop: 2,
    marginBottom: 6,
  },
  fila: {
    ...estilosComunes.tarjeta,
    flexDirection: 'row',
    alignItems: 'center',
    padding: 10,
    gap: 12,
  },
  miniatura: {
    width: 52,
    height: 52,
    borderRadius: 12,
  },
  filaTexto: {
    flex: 1,
    gap: 2,
  },
  nombre: {
    fontSize: 15,
    fontWeight: '600',
    color: tema.colores.texto,
  },
  subtotal: {
    fontSize: 13,
    color: tema.colores.textoSuave,
  },
  precio: {
    fontSize: 16,
    fontWeight: '800',
    color: tema.colores.acento,
  },
  vacio: {
    alignItems: 'center',
    gap: 10,
    paddingVertical: 28,
  },
  vacioTexto: {
    fontSize: 15,
    color: tema.colores.textoSuave,
    textAlign: 'center',
  },
  nota: {
    flexDirection: 'row',
    gap: 8,
    alignItems: 'center',
    backgroundColor: tema.colores.acentoSuave,
    borderRadius: tema.radios.suave,
    padding: 12,
    marginTop: 6,
  },
  notaTexto: {
    flex: 1,
    fontSize: 13,
    color: tema.colores.texto,
    lineHeight: 18,
  },
  totales: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 10,
    paddingHorizontal: 2,
  },
  totalEtiqueta: {
    fontSize: 16,
    fontWeight: '700',
    color: tema.colores.texto,
  },
  totalNumero: {
    fontSize: 26,
    fontWeight: '800',
    color: tema.colores.acento,
  },
  boton: {
    backgroundColor: tema.colores.acento,
    borderRadius: tema.radios.medio,
    paddingVertical: 16,
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'row',
    gap: 8,
    marginTop: 10,
  },
  botonSecundario: {
    backgroundColor: tema.colores.superficie,
    borderWidth: 1,
    borderColor: tema.colores.borde,
    borderRadius: tema.radios.medio,
    paddingVertical: 14,
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'row',
    gap: 8,
    marginTop: 8,
  },
  botonInverso: {
    backgroundColor: tema.colores.superficie,
    borderWidth: 1,
    borderColor: tema.colores.borde,
    borderRadius: tema.radios.medio,
    paddingVertical: 14,
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'row',
    gap: 8,
    marginTop: 8,
  },
  botonDeshabilitado: {
    backgroundColor: tema.colores.borde,
    borderRadius: tema.radios.medio,
    paddingVertical: 14,
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'row',
    gap: 8,
    marginTop: 8,
  },
  textoBoton: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '700',
  },
  textoSecundario: {
    color: tema.colores.texto,
    fontSize: 15,
    fontWeight: '600',
  },
  textoInverso: {
    color: tema.colores.acento,
    fontSize: 15,
    fontWeight: '600',
  },
});
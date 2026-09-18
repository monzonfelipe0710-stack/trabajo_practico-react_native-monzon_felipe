import { createContext, useContext, useMemo, useState, type ReactNode } from 'react';

import { Cola } from '@/estructuras/Cola';
import { Pila } from '@/estructuras/Pila';
import type { Plato } from '@/data/platos';

export const USUARIO_COCINA = 'cocina';
export const CLAVE_COCINA = 'ipf123';

export type ItemCarrito = {
  plato: Plato;
  cantidad: number;
};

export type Pedido = {
  numero: number;
  items: ItemCarrito[];
  total: number;
  nota: string;
  hora: string;
};

type EstadoApp = {
  usuario: string | null;
  iniciarSesion: (usuario: string, clave: string) => boolean;
  cerrarSesion: () => void;

  carrito: ItemCarrito[];
  nota: string;
  setNota: (nota: string) => void;
  agregarAlCarrito: (plato: Plato) => void;
  deshacerUltimo: () => void;
  pilaDeshacer: Pila<ItemCarrito>;
  totalCarrito: () => number;
  cantidadCarrito: () => number;

  pedidosCola: Cola<Pedido>;
  atendidosPila: Pila<Pedido>;
  confirmarPedido: () => number;
  atenderSiguiente: () => Pedido | undefined;
  version: number;
};

const AppContexto = createContext<EstadoApp | null>(null);

export function AppProvider({ children }: { children: ReactNode }) {
  const [usuario, setUsuario] = useState<string | null>(null);
  const [carrito, setCarrito] = useState<ItemCarrito[]>([]);
  const [nota, setNota] = useState('');
  const [pilaDeshacer, setPilaDeshacer] = useState<Pila<ItemCarrito>>(() => new Pila());
  const [colaPedidos] = useState<Cola<Pedido>>(() => new Cola());
  const [pilaAtendidos] = useState<Pila<Pedido>>(() => new Pila());
  const [correlativo, setCorrelativo] = useState(1);
  const [tick, setTick] = useState(0);

  const forzarRender = () => setTick((t) => t + 1);

  const valor = useMemo<EstadoApp>(() => {
    const totalCarrito = () =>
      carrito.reduce((acc, item) => acc + item.plato.precio * item.cantidad, 0);

    const cantidadCarrito = () => carrito.reduce((acc, item) => acc + item.cantidad, 0);

    const agregarAlCarrito = (plato: Plato) => {
      pilaDeshacer.push({ plato, cantidad: 1 });
      setCarrito((prev) => {
        const existente = prev.find((item) => item.plato.id === plato.id);
        if (existente) {
          return prev.map((item) =>
            item.plato.id === plato.id ? { ...item, cantidad: item.cantidad + 1 } : item,
          );
        }
        return [...prev, { plato, cantidad: 1 }];
      });
      forzarRender();
    };

    const deshacerUltimo = () => {
      const ultimo = pilaDeshacer.pop();
      if (!ultimo) return;
      setCarrito((prev) =>
        prev
          .map((item) =>
            item.plato.id === ultimo.plato.id
              ? { ...item, cantidad: item.cantidad - 1 }
              : item,
          )
          .filter((item) => item.cantidad > 0),
      );
      forzarRender();
    };

    const confirmarPedido = (): number => {
      const numero = correlativo;
      const pedido: Pedido = {
        numero,
        items: [...carrito],
        total: totalCarrito(),
        nota,
        hora: new Date().toLocaleTimeString('es-AR', {
          hour: '2-digit',
          minute: '2-digit',
        }),
      };
      colaPedidos.encolar(pedido);
      setCorrelativo((c) => c + 1);
      setPilaDeshacer(new Pila<ItemCarrito>());
      setCarrito([]);
      setNota('');
      forzarRender();
      return numero;
    };

    const atenderSiguiente = (): Pedido | undefined => {
      const pedido = colaPedidos.desencolar();
      if (pedido) {
        pilaAtendidos.push(pedido);
        forzarRender();
      }
      return pedido;
    };

    return {
      usuario,
      iniciarSesion: (usuarioIngresado: string, clave: string) => {
        if (usuarioIngresado === USUARIO_COCINA && clave === CLAVE_COCINA) {
          setUsuario(usuarioIngresado);
          return true;
        }
        return false;
      },
      cerrarSesion: () => {
        setUsuario(null);
        forzarRender();
      },

      carrito,
      nota,
      setNota,
      agregarAlCarrito,
      deshacerUltimo,
      pilaDeshacer,
      totalCarrito,
      cantidadCarrito,

      pedidosCola: colaPedidos,
      atendidosPila: pilaAtendidos,
      confirmarPedido,
      atenderSiguiente,
      version: tick,
    };
  }, [usuario, carrito, nota, pilaDeshacer, colaPedidos, pilaAtendidos, correlativo, tick]);

  return <AppContexto.Provider value={valor}>{children}</AppContexto.Provider>;
}

export function useApp(): EstadoApp {
  const contexto = useContext(AppContexto);
  if (!contexto) {
    throw new Error('useApp debe usarse dentro de AppProvider');
  }
  return contexto;
}
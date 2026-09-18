export type Categoria = {
  slug: string;
  nombre: string;
};

export const CATEGORIAS: Categoria[] = [
  { slug: 'desayuno', nombre: 'Desayuno' },
  { slug: 'almuerzo', nombre: 'Almuerzo' },
  { slug: 'bebidas', nombre: 'Bebidas' },
  { slug: 'kiosco', nombre: 'Kiosco' },
];

export type Plato = {
  id: number;
  nombre: string;
  precio: number;
  categoria: string;
  descripcion: string;
};

export const PLATOS: Plato[] = [
  {
    id: 1,
    nombre: 'Medialunas (3x)',
    precio: 450,
    categoria: 'desayuno',
    descripcion: 'Tres medialunas de manteca recién horneadas.',
  },
  {
    id: 2,
    nombre: 'Tostado de jamón y queso',
    precio: 900,
    categoria: 'desayuno',
    descripcion: 'Pan de miga tostado con jamón y queso, con café incluido.',
  },
  {
    id: 3,
    nombre: 'Café con leche',
    precio: 500,
    categoria: 'desayuno',
    descripcion: 'Café cortado con leche, servido bien caliente.',
  },
  {
    id: 4,
    nombre: 'Licuado de banana',
    precio: 600,
    categoria: 'desayuno',
    descripcion: 'Licuado de banana con leche, sin azúcar añadida.',
  },
  {
    id: 5,
    nombre: 'Milanesa con puré',
    precio: 2800,
    categoria: 'almuerzo',
    descripcion: 'Milanesa de carne con puré de papas y ensalada.',
  },
  {
    id: 6,
    nombre: 'Fideos con salsa',
    precio: 1800,
    categoria: 'almuerzo',
    descripcion: 'Fideos cabello de ángel con salsa de tomate casera.',
  },
  {
    id: 7,
    nombre: 'Empanadas (2x)',
    precio: 1600,
    categoria: 'almuerzo',
    descripcion: 'Dos empanadas de carne cortada a cuchillo.',
  },
  {
    id: 8,
    nombre: 'Guiso de lentejas',
    precio: 2200,
    categoria: 'almuerzo',
    descripcion: 'Guiso de lentejas con chorizo, calabaza y papa.',
  },
  {
    id: 9,
    nombre: 'Agua mineral 500ml',
    precio: 700,
    categoria: 'bebidas',
    descripcion: 'Botella de agua mineral sin gas, bien fría.',
  },
  {
    id: 10,
    nombre: 'Gaseosa 500ml',
    precio: 900,
    categoria: 'bebidas',
    descripcion: 'Gaseosa de cola o lima en botella descartable.',
  },
  {
    id: 11,
    nombre: 'Jugo de naranja',
    precio: 800,
    categoria: 'bebidas',
    descripcion: 'Jugo de naranja exprimido en el momento.',
  },
  {
    id: 12,
    nombre: 'Kit Kat',
    precio: 600,
    categoria: 'kiosco',
    descripcion: 'Barrita de chocolate con oblea crocante.',
  },
  {
    id: 13,
    nombre: 'Papas chips',
    precio: 700,
    categoria: 'kiosco',
    descripcion: 'Papas fritas de bolsa, variedad corte americano.',
  },
  {
    id: 14,
    nombre: 'Alfajor de dulce de leche',
    precio: 500,
    categoria: 'kiosco',
    descripcion: 'Alfajor clásico con dulce de leche y cobertura de chocolate.',
  },
];

export function platoPorId(id: number): Plato | undefined {
  return PLATOS.find((p) => p.id === id);
}

export function categoriaPorSlug(slug: string): Categoria | undefined {
  return CATEGORIAS.find((c) => c.slug === slug);
}

export function platosDeCategoria(slug: string): Plato[] {
  return PLATOS.filter((p) => p.categoria === slug);
}

export function platosPorCategoria(): { categoria: Categoria; platos: Plato[] }[] {
  return CATEGORIAS.map((categoria) => ({
    categoria,
    platos: platosDeCategoria(categoria.slug),
  }));
}

export function formatearPrecio(precio: number): string {
  return `$ ${precio.toLocaleString('es-AR')}`;
}
# Comedor IPF — Trabajo Práctico N° 2

Taller Complementario – React Native II · Instituto Politécnico Formosa
**Alumno/a:** Felipe Monzón

Una app para pedir comida al comedor del instituto desde el celular:

- Los clientes ven el menú, arman su carrito y piden.
- Cada pedido recibe un **número de turno**.
- La cocina atiende los pedidos **por orden de llegada** (en fila).
- En el carrito se puede **deshacer** la última acción.

Está hecha con Expo (React Native) y TypeScript.

---

## ¿Cómo se usa?

1. Instalá las dependencias: `npm install`
2. Arrancá la app: `npx expo start`
3. Escaneá el QR con la app **Expo Go** (o probala en el navegador con `npx expo start --web`).

**Acceso a la cocina (zona restringida):**
- Usuario: `cocina`
- Clave: `ipf123`

---

## Las pantallas

- **Inicio** → portada con accesos rápidos.
- **Menú** → platos con foto, ordenados por categoría (desayuno, almuerzo, bebidas y kiosco).
- **Detalle de plato** → ver y agregar al carrito.
- **Buscar** → buscar por nombre o filtrar por categoría.
- **Carrito** → ver lo que pediste, dejar una nota y deshacer.
- **Confirmar** → revisar el pedido y mandarlo a la cocina.
- **Turno** → el número que te toca y cuánto te falta.
- **Cocina** → la cola de pedidos y botón "Atender siguiente".
- **Ayuda** → artículos con preguntas frecuentes.
- También hay una pantalla de error **404** para rutas que no existen.

---

## Dónde está cada cosa

```
src/
├── app/            → las pantallas (las rutas)
├── components/     → pedacitos que se reusan (tarjetas, etc.)
├── context/        → datos que comparten todas las pantallas
├── data/           → la lista de platos
├── estructuras/    → la cola y la pila
└── constantes/     → los colores y estilos de la app
```

Las respuestas escritas del trabajo (Partes A a F) están en [`RESPUESTAS.md`](./RESPUESTAS.md).

---

## Captura

![Captura de la app](./capturas/sticker.png)
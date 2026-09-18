# Comedor IPF — Trabajo Práctico N° 2 (Expo Router)

Taller Complementario – React Native II · Instituto Politécnico Formosa
**Alumno/a:** Felipe Monzón

App desarrollada con **Expo Router (SDK 57) + TypeScript** que permite pedir comida del comedor del instituto desde el celular, mientras la cocina atiende los pedidos **en orden de llegada** (con una **cola**). El carrito, en cambio, usa una **pila** para poder **deshacer** acciones.

- 📄 Las respuestas de las **Partes A a F** están en [`RESPUESTAS.md`](./RESPUESTAS.md).
- 🖥️ El código del sistema (Parte G) está en este mismo repositorio.

---

## Requisitos técnicos cumplidos (G3)

- Creado con `npx create-expo-app@latest`, **Expo SDK 57**, TypeScript activo y rutas severamente tipadas (`experiments.typedRoutes`).
- `Tabs` importadas de **`expo-router/js-tabs`** con íconos de **`@expo/vector-icons`**.
- `Drawer` importado de **`expo-router/drawer`** con `GestureHandlerRootView` en el layout raíz (no se instaló `@react-navigation/drawer`).
- En `src/app` **solo hay rutas**: componentes → `src/components`, datos → `src/data`, estructuras → `src/estructuras`, contexto → `src/context`.
- `"scheme": "comedoripf"` configurado y `unstable_settings = { anchor: '(tabs)' }` para que los deep links dejen las pestañas debajo en la pila.
- Nada de `node_modules` en el repositorio (ver `.gitignore`).
- 14 platos de ejemplo en `src/data/platos.ts` repartidos en **desayuno, almuerzo, bebidas y kiosco**.

---

## Cómo correr la app

```bash
npm install        # instala las dependencias (ya fue ejecutado)
npx expo start     # abre el QR / menú de Expo Go o desarrollo web
```

- En **Expo Go**: escanear el QR (la app de desarrollo completa sirve, con el puerto de Metro).
- En **web**: `npx expo start --web` → `http://localhost:8081`
- **Credenciales de la cocina (fijas en el código):** usuario `cocina` · clave `ipf123`.

---

## Árbol de rutas de `src/app` y navegadores

```
src/app
├── _layout.tsx                        # Stack raíz (anchor: "(tabs)")
│   ├── (tabs)                         # Tabs (expo-router/js-tabs)  ── pestañas Inicio · Menú · Carrito
│   │   ├── index.tsx                  # /            Inicio
│   │   ├── menu/_layout.tsx           #   Stack propio de la tab "Menú"
│   │   │   ├── index.tsx              #     /menu       Lista de platos por categoría
│   │   │   └── [id].tsx               #     /menu/[id]  Detalle del plato + "Agregar al carrito"
│   │   └── carrito/_layout.tsx        #   Stack propio de la tab "Carrito"
│   │       ├── index.tsx              #     /carrito      Ítems + total + "Deshacer último"
│   │       └── nota.tsx               #     /carrito/nota Aclaración para la cocina (formSheet)
│   ├── categorias/[categoria].tsx     # /categorias/[categoria]  (Stack raíz) platos por categoría
│   ├── buscar.tsx                     # /buscar?q=&categoria=     (Stack raíz) búsqueda en la URL
│   ├── confirmar.tsx                  # /confirmar                (Stack raíz, presentation: modal)
│   ├── turno/[numero].tsx             # /turno/[numero]           (Stack raíz) turno + espera estimada
│   ├── login.tsx                      # /login                    (modal, SOLO sin sesión)
│   ├── cocina/_layout.tsx             # Drawer (expo-router/drawer) — SOLO con sesión
│   │   ├── index.tsx                  #   /cocina            frente de la cola + "Atender siguiente"
│   │   └── atendidos.tsx              #   /cocina/atendidos  histórico (del más reciente al más antiguo)
│   ├── ayuda/index.tsx                # /ayuda                  índice de artículos
│   ├── ayuda/[...slug].tsx            # /ayuda/...              catch-all de profundidad variable
│   ├── pedido.tsx                     # /pedido                 <Redirect> a /carrito
│   └── +not-found.tsx                 # 404                      muestra la URL inexistente
```

**Navegador de cada `_layout`:**

| Layout | Navegador | Hijos visibles |
|---|---|---|
| `src/app/_layout.tsx` | `Stack` raíz (con `Stack.Protected` para `login` y `cocina`) | `(tabs)`, `categorias/[categoria]`, `buscar`, `confirmar`, `turno/[numero]`, `ayuda/*`, `pedido`, +not-found |
| `src/app/(tabs)/_layout.tsx` | `Tabs` desde `expo-router/js-tabs` | Inicio, Menú, Carrito (badge con la cantidad) |
| `src/app/(tabs)/menu/_layout.tsx` | `Stack` propio | índice (`/menu`) y detalle (`/menu/[id]`) |
| `src/app/(tabs)/carrito/_layout.tsx` | `Stack` propio | índice y `nota` en `formSheet` |
| `src/app/cocina/_layout.tsx` | `Drawer` desde `expo-router/drawer` | Cocina y Atendidos |

---

## Decisiones de navegación importantes

### `replace` vs `push` en el flujo de confirmación (G2.5 · G6.1)

Al confirmar el pedido pasamos de `/confirmar` a `/turno/[numero]` con **`router.replace`** (en `src/app/confirmar.tsx`):

```tsx
const numero = confirmarPedido();
router.replace(`/turno/${numero}`);
```

- Con `push` la pila quedaría `[ (tabs), /confirmar, /turno/7 ]` con `/confirmar` como pantalla anterior; si el usuario toca "atrás" **volvería a la confirmación** de un pedido ya enviado (y podría confirmarlo de nuevo o quedar en un estado raro).
- Con `replace`, `/confirmar` **se reemplaza** por `/turno/7`: `[ (tabs), /turno/7 ]`. "Atrás" sale del turno y vuelve a las pestañas, sin pasar por la confirmación.

### El login se cierra solo (F2 · G6.2)

`/login` y `/cocina` están protegidas con `Stack.Protected` en el layout raíz. Al iniciar sesión el guard de `login` pasa a `false`: la ruta **deja de existir** y el modal se cierra solo (no hace falta `router.back()`). Al cerrar sesión desde la cocina, pasa lo mismo con `/cocina` -> la sección desaparece del historial.

### Por qué "Deshacer" es una pila y los pedidos una cola (G6.3)

- **Deshacer = pila:** la última acción agregada es la primera que se deshace (LIFO) — exactamente el comportamiento de Ctrl+Z.
- **Pedidos = cola:** el comedor atiende en **orden de llegada** (FIFO); nadie se puede "colar", ni siquiera el último movimiento del alumno. Si usáramos una pila, el último pedido recibido sería el primero en atenderse y eso sería injusto.
- La cola de `src/estructuras/Cola.ts` **no usa `shift()`** (reescribe la solución de A5: índice de frente + compactación).

### Deep links (F4 · G5.4)

- App instalada (build propia): `comedoripf://menu/7`
- Expo Go en desarrollo (IP de la compu de desarrollo `192.168.1.20`): `exp://192.168.1.20:8081/--/menu/7`
- Web: `http://localhost:8081/menu/7`

Gracias al `anchor: '(tabs)'`, al abrir `comedoripf://categorias/bebidas` (o cualquier deep link a una pantalla del Stack raíz) las pestañas quedan debajo en la pila y "atrás" regresa a ellas (G6.6).

---

## Capturas (entregable G5.3)

> ⚠️ Pendiente de añadir: reemplazar estas líneas por capturas o un video corto de la app corriendo.

- [ ] **Carrito con deshacer:** carrito con varios ítems + botón "Deshacer último" (deshabilitado con la pila vacía).
- [ ] **Turno:** `/turno/7` con la cantidad de pedidos por delante y el tiempo estimado.
- [ ] **Cocina atendiendo:** frente de la cola + "Atender siguiente" + historial.
- [ ] **Login / logout:** modal de ingreso (usuario `cocina` / clave `ipf123`) y cierre de sesión.
- [ ] **Pantalla 404:** `/no-existe` mostrando la URL inexistente.

---

## Desafíos opcionales implementados

- ✅ **Hoja inferior:** `/carrito/nota` en `presentation: 'formSheet'` con `sheetAllowedDetents`.
- ✅ **Tiempo estimado:** `/turno/[numero]` calcula `posición en la cola × 3 minutos`.
- ✅ **Tab protegida / contador de pila:** no implementados (dejados como mejora).

---

## Estructura de carpetas (orden del código, G3)

```
src/
├── app/            # rutas (nada más)
│   ├── _layout.tsx
│   ├── (tabs)/…
│   ├── categorias/
│   ├── buscar.tsx   confirmar.tsx   turno/   login.tsx   cocina/
│   ├── ayuda/   pedido.tsx   +not-found.tsx
├── components/      # PlatoCard · TarjetaAcceso · DondeEstoy
├── context/         # AppContext (sesión, carrito, cola, pilas)
├── data/            # platos.ts (categorías + 14 platos)
├── estructuras/     # Pila.ts · Cola.ts (sin shift)
```

---

## Entregables

1. ✅ Repositorio con el proyecto funcionando (sin `node_modules`).
2. ✅ `RESPUESTAS.md` con las respuestas de las Partes A a F.
3. ⏳ `README.md` con árbol de rutas, justificación de `replace` y (falta agregar) capturas.
4. ✅ Deep link de prueba para Expo Go anotado arriba.
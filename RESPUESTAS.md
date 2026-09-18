# RESPUESTAS — Trabajo Práctico N° 2: Expo Router

Taller Complementario – React Native II · Alumno/a: Felipe Monzón · Instituto Politécnico Formosa

---

## Parte A · Estructuras de datos: la pila y la cola

### A1. Conceptos

**a)** LIFO = *Last In, First Out* (el último que entra, es el primero que sale) y corresponde a la **pila**. FIFO = *First In, First Out* (el primero que entra, es el primero que sale) y corresponde a la **cola**.

**b)**
- Pila: entra y sale **por el mismo extremo**, llamado **tope** (push agrega al tope y pop saca del tope).
- Cola: entra **por un extremo** (el final o lomo, con `encolar`) y sale **por el extremo opuesto**, el **frente** (con `desencolar`).

**c)**
- **Pila**: *vida real*: una pila de platos en un restaurante, sacás siempre el de arriba (el último apilado). *App móvil*: el historial de navegación — el botón "atrás" desapila la pantalla que está arriba; también la función "Deshacer" (los pasos se deshacen en orden inverso).
- **Cola**: *vida real*: la fila de una caja del supermercado, entra al final y sale el primero de la fila. *App móvil*: una cola de reproducción de música (las canciones se escuchan en el orden en que se encolaron) o los pedidos que llegan a la cocina, atendidos en orden de llegada (nuestra app de la Parte G usa una cola exactamente para eso).

### A2. Seguimiento de una pila

```js
const p = new Pila();
p.push('Inicio');      // [Inicio]
p.push('Productos');   // [Inicio, Productos]
p.push('Detalle 3');   // [Inicio, Productos, Detalle 3]
p.pop();               // desapila 'Detalle 3' -> [Inicio, Productos]
p.push('Perfil');      // [Inicio, Productos, Perfil]

console.log(p.tope());    // (1) -> "Perfil"
console.log(p.pop());     // (2) -> "Perfil"   (queda [Inicio, Productos])
console.log(p.tope());    // (3) -> "Productos"
console.log(p.vacia);     // (4) -> false
```

**Estado final** (de base a tope): `[ Inicio, Productos ]`

### A3. Seguimiento de una cola

```js
const c = new Cola();
c.encolar('Ana');      // [Ana]
c.encolar('Beto');     // [Ana, Beto]
c.desencolar();        // sale 'Ana' -> [Beto]
c.encolar('Caro');     // [Beto, Caro]
c.encolar('Dani');     // [Beto, Caro, Dani]

console.log(c.frente());      // (1) -> "Beto"
console.log(c.desencolar());  // (2) -> "Beto"  (queda [Caro, Dani])
console.log(c.vacia);         // (3) -> false
```

**Estado final** (de frente a final): `[ Caro, Dani ]`

### A4. Análisis de la implementación

**a)** El `#` declara **campos privados reales de JavaScript** (ECMAScript): el arreglo `#items` no se puede leer ni modificar desde afuera (`p.#items` da error). Evita que el estado interno de la estructura se corrompa desde afuera (por ejemplo, `p.items.push(...)` directo, que rompería la invariante de la cola si no pasa por `encolar`).

**b)** `array.shift()` **reubica todos los elementos** del arreglo (es O(n)) en cada desencolada. En colas muy grandes cada operación es cada vez más costosa y la app se "traba". Las colas **"serias"** lo resuelven **sin mover datos**: guardan el **índice del frente** que avanza y solo compactan/reinician el arreglo cuando hay muchos huecos (o directamente usan una cola circular o una lista enlazada). Es la solución que implementamos en la parte A5 y en la `Cola` del sistema.

**c)** La pila usa **`pop()`** (saca del extremo final, donde entra) y la cola usa **`shift()`** en la versión de clase (saca del extremo inicial). No pueden usar el mismo porque **cada estructura saca por un extremo distinto**: la pila agrega y quita por el final (mismo extremo), mientras que la cola agrega por el final y quita por el frente. Si la cola usara `pop()`, un `desencolar()` sacaría el último elemento en vez del primero (y con `shift()` la pila tampoco funcionaría como pila).

### A5. Programación: una cola eficiente

```js
class ColaEficiente {
  #items = [];
  #frente = 0;

  encolar(x) {
    this.#items.push(x);
  }

  desencolar() {
    if (this.vacia) return undefined;
    const valor = this.#items[this.#frente];
    this.#frente++;
    // Compactación perezosa: evita que el arreglo crezca sin límite
    // con huecos al frente, y evita reubicar en cada operación.
    if (this.#frente > 10 && this.#frente * 2 > this.#items.length) {
      this.#items = this.#items.slice(this.#frente);
      this.#frente = 0;
    }
    return valor;
  }

  frente() {
    return this.#items[this.#frente];
  }

  get vacia() {
    return this.#frente >= this.#items.length;
  }

  get tamanio() {
    return this.#items.length - this.#frente;
  }
}
```

El truco está en `#frente`: `desencolar()` **no borra nada**, solo avanza el índice. Eso hace que cada operación sea O(1), salvo la compactación ocasional O(n). La `Cola` que usa el sistema (Parte G) en `src/estructuras/Cola.ts` es esta misma versión.

### A6. Pila y cola dentro de Expo Router

**a)** El historial de pantallas de un Stack se describe con una **pila**: cada `push` apila la pantalla encima, la pantalla **visible es la que está en el tope**, y el "atrás" (`router.back()`) hace **pop** — desapila el tope y queda visible la anterior.

**b)** Las **acciones de navegación** (los toques en links, `router.push(...)`, etc.) Expo Router las procesa con una **cola** (en orden FIFO): se encolan y se ejecutan una por una. Si el usuario toca dos links muy rápido, las dos acciones se encolan y se resuelven **en el orden en que llegaron**, una tras otra, sin perderse ni ejecutarse en paralelo.

---

## Parte B · Rutas basadas en archivos

### B1. Del archivo a la URL

| Archivo | URL que genera / función |
|---|---|
| `src/app/(tabs)/index.tsx` | `/` — la pantalla inicial; el grupo `(tabs)` no forma parte de la URL. |
| `src/app/acerca.tsx` | `/acerca` |
| `src/app/(tabs)/perfil.tsx` | `/perfil` (los paréntesis del grupo no aparecen en la URL). |
| `src/app/(tabs)/productos/index.tsx` | `/productos` |
| `src/app/(tabs)/productos/[id].tsx` | `/productos/1`, `/productos/abc`, …: un segmento dinámico por plato. |
| `src/app/docs/[...slug].tsx` | `/docs/react`, `/docs/react/hooks/useState`…: catch-all (profundidad variable); también matchea `/docs` con `slug = []` si no existe `index.tsx`. |
| `src/app/_layout.tsx` | No genera URL: define un layout/navegador (el raíz) que envuelve a toda la app. |
| `src/app/+not-found.tsx` | No genera URL navegable: pantalla 404 que aparece cuando ninguna ruta matchea. |
| `src/app/Boton.tsx` | No genera URL: los archivos que empiezan con mayúscula se tratan como **componentes reutilizables** y no como rutas. |

### B2. De la URL al archivo

| URL | Archivo |
|---|---|
| `/categorias/bebidas` (y cualquier otra categoría) | `src/app/categorias/[categoria].tsx` |
| `/buscar?q=mate&categoria=kiosco` | `src/app/buscar.tsx` (los query params no generan archivos). |
| `/ayuda/pagos/tarjeta` y `/ayuda/horarios` | `src/app/ayuda/[...slug].tsx` |
| `/ayuda` (con una pantalla propia) | `src/app/ayuda/index.tsx` |

### B3. Verdadero o falso

**a) Falso.** Con Expo Router las rutas se definen con el **sistema de archivos** (`src/app`); no hay que registrar nada en una tabla de configuración.

**b) Falso.** Los archivos `_layout.tsx` definen layouts/navegadores y estilos comunes; no son pantallas que el usuario visita.

**c) Verdadero.** Los grupos entre paréntesis `(tabs)` no figuran en la URL; se usan para organizar sin cambiar la ruta.

**d) Falso.** `npm install` trae siempre la última versión, que puede no coincidir con la soportada por el SDK (y en Expo Go romper la app). Conviene `npx expo install <paquete>` para obtener la versión correcta del SDK actual.

**e) Verdadero.** `"main": "expo-router/entry"` hace que el arranque lo maneje Expo Router, reemplazando al viejo `App.tsx`.

**f) Verdadero.** «ruta `/_sitemap` lista todas las rutas de la app y sirve para depurar» es correcto (se puede desactivar con `sitemap: false` en el plugin `expo-router`).

**g) Verdadero.** Si existen `docs/index.tsx` y `docs/[...slug].tsx`, la URL `/docs` muestra `docs/index.tsx` (la de mayor especificidad).

**h) Verdadero.** En SDK 57, la versión de `expo-router` usa el mismo número de versión mayor que el SDK (57.0.x).

---

## Parte C · Navegar: `<Link>`, router y la pila

### C1. Métodos de router

| Método | Qué le hace a la pila del Stack |
|---|---|
| `router.push(href)` | **Apila** la pantalla: la agrega al tope y pasa a ser la visible. |
| `router.navigate(href)` | Si la pantalla ya está en la pila **salta a ella** (desapila las de arriba); si no está, la apila como `push`. |
| `router.replace(href)` | **Reemplaza** la pantalla actual por la nueva: no cambia el tamaño de la pila (la actual se saca). |
| `router.back()` | Hace **pop**: desapila el tope y muestra la pantalla anterior. |
| `router.dismissTo(href)` | **Desapila hasta** la pantalla indicada (la deja como tope) si está en la pila. |
| `router.dismissAll()` | Desapila todo hasta **la primera pantalla** del stack (solo queda la base). |
| `router.canGoBack()` | No cambia la pila: devuelve `true`/`false` según exista una pantalla debajo a la que volver. |
| `router.setParams({...})` | No navega: **actualiza los parámetros** de la pantalla actual (misma posición en la pila). |

### C2. Simulación de la pila

Pila inicial: `[ /productos ]`

| # | Instrucción | Pila resultante |
|---|---|---|
| 1 | `router.push("/productos/1")` | `[ /productos, /productos/1 ]` |
| 2 | `router.push("/productos/2")` | `[ /productos, /productos/1, /productos/2 ]` |
| 3 | `router.navigate("/productos/5")` (no está) | `[ /productos, /productos/1, /productos/2, /productos/5 ]` |
| 4 | `router.push("/perfil")` | `[ /productos, /productos/1, /productos/2, /productos/5, /perfil ]` |
| 5 | `router.replace("/buscar")` | `[ /productos, /productos/1, /productos/2, /productos/5, /buscar ]` |
| 6 | `router.back()` | `[ /productos, /productos/1, /productos/2, /productos/5 ]` |
| 7 | `router.dismissTo("/productos")` | `[ /productos ]` |
| 8 | `router.canGoBack()` | Devuelve **false** (solo queda la base, no hay adónde volver). |

### C3. ¿`<Link>` o `router`?

**a)** **`<Link>`** con `href` como objeto (`{ pathname: "/productos/[id]", params: { id } }`). El usuario toca una tarjeta en una lista: navegación declarativa, el link ya es el elemento tocable.

**b)** **`router`**: hay lógica/momento posterior a una API (el guardado respondió OK). Uso `router.replace("/exito")` para que "atrás" no reabra el formulario ya guardado.

**c)** **`router.back()`**: "Cancelar" cierra el modal desapilándolo (es el gesto natural "volver").

**d)** **`router.replace("/")`** tras el login exitoso: reemplaza la pantalla de login para que "atrás" **no vuelva a un login ya resuelto**.

**e)** **`router.dismissTo("/pedidos")`**: permite saltar de un golpe a una pantalla que quedó varias posiciones abajo en la pila, descartando las intermedias.

### C4. Escribí el código

```tsx
// a) Link que abre el producto con id 8 usando href como objeto
<Link href={{ pathname: "/productos/[id]", params: { id: 8 } }}>
  Ver producto 8
</Link>

// b) Link a /perfil que siempre apile aunque la pantalla ya exista
<Link href="/perfil" push>Ir a perfil</Link>

// c) Pressable propio que funcione como link a /carrito usando asChild
<Link href="/carrito" asChild>
  <Pressable>
    <Text>Ver carrito</Text>
  </Pressable>
</Link>
```

### C5. Pensar

En la web cada `<Link>` se transforma en un `<a href>` real. Para el usuario eso significa que puede **copiar/pegar la URL, abrir en una pestaña nueva, clic derecho (abrir en otra pestaña, copiar dirección), guardar en favoritos y compartir** la pantalla; además los buscadores pueden indexar cada ruta. En el celular **no hay barra de direcciones** ni clic derecho, así que ese beneficio desaparece: la navegación es interna. Aun así los links siguen sirviendo porque la misma URL funciona como **deep link** — otra app, una notificación o un código QR pueden abrir directamente esa pantalla dentro de la app instalada.

---

## Parte D · Navegadores: Stack, Tabs y Drawer

### D1. Comparación

| | Stack | Tabs | Drawer |
|---|---|---|---|
| ¿Apila pantallas? | Sí, guarda todo el historial. | No apila al cambiar de pestaña (aunque cada tab puede tener su propio Stack). | No es una pila; puede tener su propio stack por sección. |
| ¿Cómo cambia de pantalla el usuario? | Navegando hacia adelante y con "atrás". | Toca las pestañas de la barra inferior. | Desliza el dedo desde el borde o toca el ícono del menú (hamburguesa). |
| ¿Desde dónde se importa en SDK 57? | `import { Stack } from 'expo-router'` | `import { Tabs } from 'expo-router/js-tabs'` | `import { Drawer } from 'expo-router/drawer'` |
| Un caso de uso típico | Detalle de producto, flujos lineales, modales. | Secciones principales: Inicio, Menú, Carrito. | Apps con menú lateral: configuración, secciones de cocina. |

### D2. Cada tab tiene su pila

El usuario abre el detalle del producto 4 dentro de la tab Productos y pasa a Inicio. Al volver a Productos, **ve el detalle del producto 4**, porque **cada tab conserva su propia pila** (el estado de su stack no se pierde al cambiar de pestaña). Aplico que usás todos los días: **WhatsApp** — si dejás un chat abierto, pasás a otra conversación y volvés, el chat sigue donde estaba; también Instagram o Telegram.

### D3. ¿Dónde va cada pantalla?

**a)** El detalle de un producto que debe mantener visible la barra de pestañas → **dentro de la tab** (en nuestra app, `(tabs)/menu/[id]`).
**b)** Un modal para confirmar una compra que tapa la barra → **en el Stack raíz** con `presentation: 'modal'` (`/confirmar`).
**c)** El login que se abre como modal → **en el Stack raíz** (`/login`).
**d)** "Mis pedidos anteriores" dentro de la sección Perfil → **dentro de la tab Perfil** (en su propio stack).

Regla: lo que debe conservar la barra de pestañas vive en la tab; lo que la tapa (modales, pantallas fuera de contexto) vive en el Stack raíz.

### D4. Configurar el Stack

**a)** `screenOptions` aplica **opciones por defecto a todas las pantallas** del Stack; `options` de un `<Stack.Screen>` puntual **sobreescribe** esas opciones para una pantalla específica.

**b)** `(tabs)` tiene `headerShown: false` porque ese grupo ya renderiza su **propia barra de pestañas**; si el Stack raíz también mostrara un header, quedarían dos headers superpuestos. El header "real" lo ponen los stacks internos.

**c)** Sí, la pantalla `perfil-publico.tsx` **existe igual** aunque no esté declarada en el `Stack` (las rutas se crean por archivos). Declararla sirve para **configurar opciones** (título, `presentation: 'modal'`, `headerShown`) y para usarla con `Stack.Protected` u otras opciones.

**d)** Cuatro valores de `presentation`: `'card'`, `'modal'`, `'formSheet'`, `'transparentModal'` (también `'containedModal'`, `'fullScreenModal'`). Para una hoja inferior que se abre al 50% uso **`presentation: 'formSheet'`** con `sheetAllowedDetents: [0.5, 0.9]`.

**e)** Desde la propia pantalla:

```tsx
<Stack.Screen options={{ title: `Producto ${id}` }} />
```

Al renderizarlo dentro del componente, el header del Stack raíz usa esas opciones dinámicamente (equivale a `navigation.setOptions`).

### D5. Tabs y Drawer en SDK 57

**a)** En SDK 57 importar `Tabs` desde `expo-router/js-tabs` pasó a ser la forma recomendada, y el `Tabs` exportado desde `'expo-router'` quedó deprecado. La alternativa experimental es **`NativeTabs`** (`expo-router/unstable-native-tabs`), que usa las barras nativas del sistema, y también existen los tabs *headless* de **`expo-router/ui`** para UI totalmente personalizada.

**b)** El Drawer necesita **`react-native-gesture-handler`** y **`react-native-reanimated`**; y en el layout raíz conviene envolver con **`GestureHandlerRootView`** para que los gestos del drawer funcionen en todas las plataformas.

**c)** **No hace falta** instalar `@react-navigation/drawer` en SDK 57: `expo-router/drawer` ya lo incluye/maneja internamente (y en SDK 56+ no se importan paquetes `@react-navigation/*` en el código de la app).

**d)** `router.back()` actúa sobre el **navegador que tiene enfocada la pantalla actual** — el más interno si hay navegadores anidados (por ejemplo, vuelve dentro del Stack de la tab, no toda la app).

---

## Parte E · Rutas dinámicas, parámetros y hooks

### E1. Encontrá el error

```tsx
export default function DetalleProducto() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const producto = productos.find((p) => p.id === id);   // ❌ comparación number === string
  if (id === 3) console.log('Es el chipá');               // ❌ nunca se cumple
  if (!producto) return <Text>No existe el producto {id}</Text>;
  return <Text>{producto.nombre}</Text>;
}
```

**Causa:** los parámetros de URL (incluidos los dinámicos) **siempre llegan como `string`**. `p.id` es numérico (3) y `id` llega como `"3"`; la comparación `p.id === id` es `number === string` y **nunca da `true`**, por lo que `producto` siempre es `undefined`.

**Corrección:** convertir el parámetro a número antes de comparar:

```tsx
const { id } = useLocalSearchParams<{ id: string }>();
const idNumero = Number(id);
const producto = productos.find((p) => p.id === idNumero);
if (idNumero === 3) console.log('Es el chipá');
```

### E2. Catch-all

Para `src/app/docs/[...slug].tsx`:

| URL | `slug` |
|---|---|
| `/docs/react` | `['react']` |
| `/docs/react/hooks/useState` | `['react', 'hooks', 'useState']` |
| `/docs` | `[]` (arreglo vacío: el catch-all también matchea la raíz de su carpeta) |

### E3. Anatomía de una URL

Dada `rutasipf://buscar?q=mate&categoria=bebidas`:

**a)** *scheme*: `rutasipf` · ruta: `/buscar` · parámetros de búsqueda (query): `q=mate` y `categoria=bebidas`.

**b)** `useLocalSearchParams()` en `buscar.tsx` devuelve `{ q: 'mate', categoria: 'bebidas' }`.

**c)** **No** hacen falta corchetes: los corchetes generan *segmentos dinámicos de la ruta* (`/buscar/[x]`), pero `q` es un **query param** y no forma parte del path. Un archivo `buscar.tsx` recibe `?q=...` directamente.

**d)** Dos razones para usar `router.setParams` en vez de `router.push`:
1. **No apila pantallas**: cada tecla no agrega una entrada a la pila (si no, "atrás" tendría que pasar por cada carácter escrito).
2. **La búsqueda vive en la URL**: al actualizar los parámetros de la pantalla actual, la URL queda reflejando la búsqueda y se puede **compartir / abrir desde un deep link** con ese estado exacto.

### E4. ¿Dónde estoy?

| Hook | En `/productos/3` | En `/buscar?q=chipa` |
|---|---|---|
| `usePathname()` | `/productos/3` | `/buscar` |
| `useSegments()` | `['productos', '3']` (sin incluir el grupo `(tabs)`) | `['buscar']` |
| `useLocalSearchParams()` | `{ id: '3' }` | `{ q: 'chipa' }` |

### E5. Local vs global

**a)** `useLocalSearchParams` devuelve los parámetros **del segmento de la ruta actual** (los suyos, más los query params de esa URL); `useGlobalSearchParams` devuelve **todos los parámetros** de la URL completa, incluso de rutas anidadas/por encima. La **opción por defecto es local**. Eso evita choques: si dos pantallas de la misma URL (p. ej. dos tabs sobre la misma ruta) leyeran parámetros globales, una podría "verse" los parámetros de la otra.

**b)** `useFocusEffect` ejecuta un efecto **cada vez que la pantalla gana el foco** (no solo al montarse) y lo limpia al perderlo. Ejemplo: en la tab Carrito se revalida/refresca el contenido cada vez que el usuario vuelve a esa pestaña (por ejemplo, para recalcular el total si se agregó algo desde el detalle):

```tsx
useFocusEffect(
  useCallback(() => {
    recalcularCarrito();
  }, [])
);
```

**c)** **No es un error de Expo Router**: `/productos/mate` matchea perfectamente la ruta dinámica `/productos/[id]`. La responsabilidad es **de la app/pantalla**: debe validar el parámetro y, si el plato no existe, **mostrar un mensaje** ("No existe el plato"). Es lo que hace el sistema en la Parte G (`/menu/[id]` valida y avisa).

---

## Parte F · Redirecciones, rutas protegidas y deep links

### F1. Redirect

**a)** `<Redirect href="/productos" />` navega automáticamente a `/productos` **reemplazando** la pantalla actual: equivale a `router.replace("/productos")`.

**b)** Debe **reemplazar y no apilar** porque si apilara, la pantalla de la que se salió (por ejemplo el login) **quedaría en la pila** y "atrás" te devolvería a ella (volviendo a un flujo ya resuelto o a una pantalla que no debería existir en ese momento). Con replace el historial queda limpio: no hay vuelta a la pantalla descartada.

### F2. Stack.Protected

```tsx
function NavegacionRaiz() {
  const { usuario } = useAuth();
  const conSesion = usuario !== null;
  return (
    <Stack>
      <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
      <Stack.Protected guard={conSesion}>
        <Stack.Screen name="privado" />
      </Stack.Protected>
      <Stack.Protected guard={!conSesion}>
        <Stack.Screen name="login" options={{ presentation: 'modal' }} />
      </Stack.Protected>
    </Stack>
  );
}
```

**a)** Cuando su guard es `false`, la pantalla **desaparece del árbol de rutas**: queda como si no existiera. Si se intenta navegar a ella, se muestra la pantalla `+not-found` (404).

**b)** Al iniciar sesión, el `usuario` cambia, el guard de `login` pasa a `false` y **la ruta deja de existir**: el modal se desmonta y se cierra solo. No hace falta `router.back()` porque no es un "volver" sino una desaparición de la ruta por el estado.

**c)** Ese aviso aparece cuando se ejecuta una acción de navegación hacia una ruta **que en ese momento no existe en el navegador** (típico al querer ir a `/privado` (o a `/cocina`) sin sesión). Se evita **comprobando la sesión antes de navegar** (mostrando login si no hay sesión) y/o apoyándose en los guards para que la ruta exista solo cuando corresponde.

**d)** `Stack.Protected` **centraliza la regla en un solo lugar** (el layout) y además **elimina la pantalla del árbol de navegación**, no solo la redirige. Con un `<Redirect>` condicional en cada pantalla, la ruta sigue existiendo en la pila y es fácil que queden accesibles entradas viejas en el historial; con protected eso es imposible, y el código no se repite pantalla por pantalla.

### F3. 404, anchor y rutas tipadas

**a)** **`+not-found.tsx`**: pantalla que se muestra cuando una URL no matchea ninguna ruta. Se define en `src/app/+not-found.tsx`. (Muestra la URL inexistente con `usePathname()`.)

**b)** **`export const unstable_settings = { anchor: "(tabs)" }`**: define la **ruta inicial (ancla)** que queda *debajo* en la pila cuando la app se abre por un deep link. Se declara en el `_layout.tsx` (en nuestro caso en el raíz, `src/app/_layout.tsx`). Así, al abrir `comedoripf://categorias/bebidas`, debajo queda el grupo `(tabs)` y el "atrás" vuelve a las pestañas.

**c)** **`typedRoutes`**: activa el tipado de rutas. Si escribís `<Link href="/prodcutos" />`, TypeScript **tira error en compilación** ("la ruta no existe"), evitando links rotos. Los tipos se **generan automáticamente** cada vez que arranca el dev server (`npx expo start`), en `.expo/types/router.d.ts` (referenciado desde `expo-env.d.ts`).

### F4. Deep links

La app tiene `"scheme": "comedoripf"` y la compu de desarrollo tiene la IP `192.168.1.20`.

| Dónde | URL que abre el plato 7 (`/menu/7`) |
|---|---|
| App instalada (build propia) | `comedoripf://menu/7` |
| Expo Go en desarrollo | `exp://192.168.1.20:8081/--/menu/7` |
| Web (`npx expo start --web`) | `http://localhost:8081/menu/7` |

La parte **`/--/`** separa la **dirección del servidor Metro** (`exp://ip:puerto`) de la **ruta dentro de la app** (`menu/7`). El scheme propio (`comedoripf://`) no funciona dentro de Expo Go porque Expo Go es la única app dueña de su propio scheme (`exp://`) para abrir proyectos en desarrollo; los schemes propios solo funcionan en **builds standalone / development builds**.

### F5. Errores comunes

**a)** Al usar `<Link href="/perfil" asChild>` con un `<Pressable style={[estilos.boton, activo && estilos.activo]}>` aparece: *"You are passing an array of styles to a child of `<Slot>`"*.
- **Causa:** el componente hijo del `asChild` recibe las props del link a través del `Slot` de expo-router, y en desarrollo rechaza que el `style` sea un **arreglo** (no puede combinarlo correctamente; entra en conflicto con el `style` que el propio Link intenta poner en web).
- **Solución:** aplanar el estilo antes de pasarlo, por ejemplo `style={StyleSheet.flatten([estilos.boton, activo && estilos.activo])}` (o pasar estilos únicos/objects, no arrays).

**b)** Un compañero creó `src/app/TarjetaProducto.tsx` para reutilizar un componente y ahora la app tiene una ruta nueva.
- **Causa:** **todo** archivo `.tsx` de `src/app` se convierte en una ruta (los que no empiezan con `_`, `+`, `(`, `[`). La barra `TarjetaProducto` generó una ruta no deseada.
- **Solución:** moverlo fuera de `src/app` (a `src/components/`) o, si debe quedar ahí, renombrarlo con prefijo `_` (p. ej. `_TarjetaProducto.tsx`), que no genera ruta.

**c)** Después de iniciar sesión se usa `router.push("/")` y, al tocar "atrás", el usuario vuelve al login.
- **Causa:** `push` **apiló** la pantalla de inicio encima del login; el login quedó en la pila.
- **Solución:** usar `router.replace("/")` (o `dismissTo`/`dismissAll`) para que el login **se reemplace o se descarte** de la pila y "atrás" no pueda volver a él.

**d)** Expo Go dice que el proyecto es incompatible después de instalar un paquete con `npm install`.
- **Causa:** con `npm install` se instaló una versión **no soportada por el SDK** (más nueva o que usa módulos nativos diferentes a los que Expo Go embarca).
- **Solución:** desinstalarlo (`npm uninstall`) y volver a instalarlo con `npx expo install <paquete>`, que baja la **versión exacta compatible** con tu SDK. Si el paquete exige un módulo nativo nuevo, Expo Go no puede ejecutarlo y se necesita una build propia (*development build*).

---

## Aplicación de las respuestas en el sistema (Parte G)

Estos conceptos se implementan directamente en la app **Comedor IPF**:

- **Cola eficiente** (A5) en `src/estructuras/Cola.ts` — se usa para **encolar pedidos** en la cocina (G2.2, G2.4, G3).
- **Pila** en `src/estructuras/Pila.ts` — usada para **deshacer** en el carrito (G2.3) y para el **historial de atendidos** (G2.4).
- **`Stack.Protected`** (F2) en `src/app/_layout.tsx` protege `/cocina` (solo con sesión) y `/login` (solo sin sesión).
- **`<Redirect>`** (F1) en `src/app/pedido.tsx` manda `/pedido` → `/carrito`.
- **`+not-found.tsx`** (F3a) muestra 404 con la URL inexistente.
- **Anchor** (F3b) en `(tabs)` para deep links.
- **`typedRoutes`** activo (F3c), **`scheme: "comedoripf"`** (F4).
- **`router.setParams`** en `/buscar` (C1/E3) para que la búsqueda viva en la URL.
- **`router.replace`** (C1/F1/F5c) al pasar de `/confirmar` → `/turno/[numero]`.
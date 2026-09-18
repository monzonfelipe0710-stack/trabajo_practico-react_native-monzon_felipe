import { Stack } from 'expo-router';
import { GestureHandlerRootView } from 'react-native-gesture-handler';

import { AppProvider, useApp } from '@/context/AppContext';
import { tema } from '@/constantes/tema';

export const unstable_settings = {
  anchor: '(tabs)',
};

const SCREEN_OPTIONS = {
  animation: 'fade' as const,
  headerBackButtonDisplayMode: 'minimal' as const,
  headerStyle: { backgroundColor: tema.colores.fondo },
  headerTintColor: tema.colores.texto,
  headerTitleStyle: { fontWeight: '800' as const },
  headerShadowVisible: false,
  contentStyle: { backgroundColor: tema.colores.fondo },
};

function NavegacionRaiz() {
  const { usuario } = useApp();
  const conSesion = usuario !== null;

  return (
    <Stack screenOptions={SCREEN_OPTIONS}>
      <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
      <Stack.Screen
        name="buscar"
        options={{ title: 'Buscar', animation: 'fade' }}
      />
      <Stack.Screen
        name="categorias/[categoria]"
        options={{ title: 'Categoría', animation: 'slide_from_right' }}
      />
      <Stack.Screen
        name="confirmar"
        options={{ title: 'Confirmar pedido', presentation: 'modal' }}
      />
      <Stack.Screen
        name="turno/[numero]"
        options={{ title: 'Tu turno', animation: 'fade' }}
      />
      <Stack.Screen
        name="ayuda/index"
        options={{ title: 'Ayuda', animation: 'slide_from_right' }}
      />
      <Stack.Screen
        name="ayuda/[...slug]"
        options={{ title: 'Ayuda', animation: 'slide_from_right' }}
      />
      <Stack.Screen name="pedido" options={{ headerShown: false }} />
      <Stack.Protected guard={!conSesion}>
        <Stack.Screen
          name="login"
          options={{ title: 'Acceso cocina', presentation: 'modal' }}
        />
      </Stack.Protected>
      <Stack.Protected guard={conSesion}>
        <Stack.Screen name="cocina" options={{ headerShown: false }} />
      </Stack.Protected>
    </Stack>
  );
}

export default function LayoutRaiz() {
  return (
    <GestureHandlerRootView style={{ flex: 1, backgroundColor: tema.colores.fondo }}>
      <AppProvider>
        <NavegacionRaiz />
      </AppProvider>
    </GestureHandlerRootView>
  );
}
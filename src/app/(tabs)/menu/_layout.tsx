import { Stack } from 'expo-router';

import { tema } from '@/constantes/tema';

export default function MenuLayout() {
  return (
    <Stack
      screenOptions={{
        headerBackButtonDisplayMode: 'minimal',
        headerStyle: { backgroundColor: tema.colores.fondo },
        headerTintColor: tema.colores.texto,
        headerTitleStyle: { fontWeight: '800' },
        headerShadowVisible: false,
        contentStyle: { backgroundColor: tema.colores.fondo },
      }}
    >
      <Stack.Screen name="index" options={{ title: 'Menú', animation: 'fade' }} />
      <Stack.Screen name="[id]" options={{ title: '', animation: 'slide_from_right' }} />
    </Stack>
  );
}
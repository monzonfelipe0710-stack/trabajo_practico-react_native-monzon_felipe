import { Stack } from 'expo-router';

import { tema } from '@/constantes/tema';

export default function CarritoLayout() {
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
      <Stack.Screen name="index" options={{ title: 'Carrito', animation: 'fade' }} />
      <Stack.Screen
        name="nota"
        options={{
          title: 'Nota para la cocina',
          presentation: 'formSheet',
          sheetAllowedDetents: [0.5, 0.9],
          sheetCornerRadius: 24,
        }}
      />
    </Stack>
  );
}
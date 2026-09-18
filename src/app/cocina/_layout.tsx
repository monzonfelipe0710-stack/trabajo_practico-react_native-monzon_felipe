import { Drawer } from 'expo-router/drawer';

import { tema } from '@/constantes/tema';

export default function CocinaLayout() {
  return (
    <Drawer
      screenOptions={{
        headerStyle: { backgroundColor: tema.colores.fondo },
        headerTintColor: tema.colores.texto,
        headerTitleStyle: { fontWeight: '800' },
        headerShadowVisible: false,
        drawerActiveTintColor: tema.colores.acento,
        drawerInactiveTintColor: tema.colores.texto,
        drawerContentStyle: { backgroundColor: tema.colores.fondo },
        drawerContentContainerStyle: { backgroundColor: tema.colores.fondo },
      }}
    >
      <Drawer.Screen name="index" options={{ title: 'Cocina', drawerLabel: 'Cocina' }} />
      <Drawer.Screen
        name="atendidos"
        options={{ title: 'Atendidos', drawerLabel: 'Atendidos' }}
      />
    </Drawer>
  );
}
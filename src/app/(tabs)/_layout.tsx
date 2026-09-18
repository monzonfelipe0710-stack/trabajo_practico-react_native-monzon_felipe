import { Ionicons } from '@expo/vector-icons';
import { Tabs } from 'expo-router/js-tabs';

import { useApp } from '@/context/AppContext';

export default function TabsLayout() {
  const { cantidadCarrito } = useApp();
  const cantidad = cantidadCarrito();

  return (
    <Tabs screenOptions={{ headerShown: false, tabBarActiveTintColor: '#15803d' }}>
      <Tabs.Screen
        name="index"
        options={{
          title: 'Inicio',
          tabBarIcon: ({ color, size }) => <Ionicons name="home" size={size} color={color} />,
        }}
      />
      <Tabs.Screen
        name="menu"
        options={{
          title: 'Menú',
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="restaurant" size={size} color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="carrito"
        options={{
          title: 'Carrito',
          tabBarIcon: ({ color, size }) => <Ionicons name="cart" size={size} color={color} />,
          tabBarBadge: cantidad > 0 ? cantidad : undefined,
        }}
      />
    </Tabs>
  );
}
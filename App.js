import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

// Pantallas
import LoginScreen from './screens/LoginScreen';
import RegisterScreen from './screens/RegisterScreen';
import HomeScreen from './screens/HomeScreen';
import RememberScreen from './screens/RememberScreen';
import GlosarioScreen from './screens/GlosarioScreen';
import PerfilScreen from './screens/PerfilScreen';
import ComidasScreen from './screens/ComidasScreen';
import AnimalesScreen from './screens/AnimalesScreen';
import ObjetosScreen from './screens/ObjetosScreen';
import TareasScreen from './screens/TareasScreen';
import ContenidoScreen from './screens/ContenidoScreen'; // Importa aquí

import { supabase } from './supabase';

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Login">
        <Stack.Screen
          name="Login"
          component={LoginScreen}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="Register"
          component={RegisterScreen}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="Remember"
          component={RememberScreen}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="Home"
          component={HomeScreen}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="Glosario"
          component={GlosarioScreen}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="Perfil"
          component={PerfilScreen}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="Comidas"
          component={ComidasScreen}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="Animales"
          component={AnimalesScreen}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="Objetos"
          component={ObjetosScreen}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="Tareas"
          component={TareasScreen}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="Contenido" // Nombre para la navegación
          component={ContenidoScreen}
          options={{ headerShown: false }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

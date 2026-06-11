import React from 'react';
import { TouchableOpacity } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Ionicons } from '@expo/vector-icons';
import { StackActions } from '@react-navigation/native';

// Importações corrigidas para aestrutura /src
import LoginScreen from './src/login';
import ListScreen from './src/lista';
import CadastroScreen from './src/cadastro';

const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();

// Navegação por Abas (Bottom Tabs)
function HomeTabs() {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarIcon: ({ color, size }) => {
          let iconName: any;
          if (route.name === 'Inventario') iconName = 'archive';
          else if (route.name === 'NovoItem') iconName = 'add-circle';
          return <Ionicons name={iconName} size={size} color={color} />;
        },
        tabBarActiveTintColor: '#0052CC',
        tabBarInactiveTintColor: '#8E8E93',
        tabBarStyle: { height: 60, paddingBottom: 8 },
      })}
    >
<Tab.Screen 
  name="Inventario" 
  component={ListScreen} 
  options={({ navigation }) => ({
    title: 'Inventário',
    headerTitle: 'Patrimônio Escolar',
    headerRight: () => (
    <TouchableOpacity 
       onPress={() => navigation.dispatch(StackActions.replace('Login'))}
       style={{ marginRight: 20 }}
      >
     <Ionicons name="log-out" size={24} color="#FF3B30" />
    </TouchableOpacity>
),
  })} 
/>

      {/* Aba que abre o Modal de Cadastro */}
      <Tab.Screen 
        name="NovoItem" 
        component={ListScreen} 
        listeners={({ navigation }) => ({
          tabPress: (e) => {
            e.preventDefault();
            navigation.navigate('Cadastro');
          },
        })}
        options={{ title: 'Adicionar' }} 
      />
    </Tab.Navigator>
  );
}

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
          name="Home" 
          component={HomeTabs} 
          options={{ headerShown: false }} 
        />

        <Stack.Screen 
          name="Cadastro" 
          component={CadastroScreen} 
          options={{ 
            presentation: 'modal',
            headerTitle: 'Novo Registro de Item' 
          }} 
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
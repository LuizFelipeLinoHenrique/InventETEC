import React, { useState } from 'react';
import { View, TextInput, TouchableOpacity, Text, Alert } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { styles } from './style';

export default function LoginScreen({ navigation }: { navigation: any }) {
  const [credencialEmail, setCredencialEmail] = useState('');
  const [credencialSenha, setCredencialSenha] = useState('');

  const autenticarUsuario = () => {
    if (!credencialEmail.trim() || !credencialSenha.trim()) {
      Alert.alert('Atenção', 'Por favor, informe suas credenciais de acesso!');
      return;
    }

    if (credencialEmail.trim() === 'admin@admin.com' && credencialSenha === '1234') {
      navigation.navigate('Home');
    } else {
      Alert.alert('Erro de Acesso', 'E-mail ou senha incorretos.');
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Ionicons name="school" size={80} color="#0052CC" />
        <Text style={styles.title}>InventETEC</Text>
        <Text style={styles.subtitle}>Gestão de Patrimônio Escolar</Text>
      </View>
      
      <View style={styles.inputContainer}>
        <TextInput
          style={styles.input}
          placeholder="E-mail institucional"
          placeholderTextColor="#999"
          value={credencialEmail}
          onChangeText={setCredencialEmail}
          autoCapitalize="none"
          keyboardType="email-address"
        />
        <Ionicons name="mail" size={20} color="#0052CC" style={styles.icon} />
      </View>

      <View style={styles.inputContainer}>
        <TextInput
          style={styles.input}
          placeholder="Senha de acesso"
          placeholderTextColor="#999"
          value={credencialSenha}
          onChangeText={setCredencialSenha}
          secureTextEntry
        />
        <Ionicons name="lock-closed" size={20} color="#0052CC" style={styles.icon} />
      </View>

      <TouchableOpacity style={styles.button} onPress={autenticarUsuario}>
        <Text style={styles.buttonText}>Acessar Sistema</Text>
      </TouchableOpacity>
    </View>
  );
}
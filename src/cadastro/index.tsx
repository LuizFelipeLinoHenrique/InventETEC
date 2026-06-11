import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, Alert, ScrollView } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { styles } from './style';

const CadastroScreen = () => {
  const navigation = useNavigation();
  const [nomeEquipamento, setNomeEquipamento] = useState('');
  const [descricaoEquipamento, setDescricaoEquipamento] = useState('');
  const [localizacaoSala, setLocalizacaoSala] = useState('');

const salvarNovoEquipamento = async () => {
  if (!nomeEquipamento.trim() || !descricaoEquipamento.trim() || !localizacaoSala.trim()) {
    Alert.alert('Atenção', 'Por favor, preencha todos os campos corretamente!');
    return;
  }

  try {
    const equipamentosSalvos = await AsyncStorage.getItem('@inventario_escolar');
    const listaEquipamentos = equipamentosSalvos ? JSON.parse(equipamentosSalvos) : [];

    const novoRegistro = {
      idUnico: Math.random().toString(36).slice(2, 11),
      nome: nomeEquipamento.trim(),
      descricao: descricaoEquipamento.trim(),
      sala: localizacaoSala.trim(),
      dataRegistro: new Date().toISOString()
    };

    const listaAtualizada = [...listaEquipamentos, novoRegistro];

    await AsyncStorage.setItem('@inventario_escolar', JSON.stringify(listaAtualizada));

    Alert.alert('Sucesso', 'Equipamento registrado no inventário!');
    navigation.goBack();
  } catch (erro) {
    console.error(erro);
    Alert.alert('Falha', 'Não foi possível salvar o registro.');
  }
};

  return (
    <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
      <Text style={styles.title}>Registro</Text>
      
      <Text style={styles.label}>Nome do Equipamento</Text>
      <TextInput
        style={styles.input}
        placeholder="Ex: Projetor Epson"
        placeholderTextColor="#AAA"
        value={nomeEquipamento}
        onChangeText={setNomeEquipamento}
      />

      <Text style={styles.label}>Sala / Laboratório</Text>
      <TextInput
        style={styles.input}
        placeholder="Ex: Laboratório de Informática 02"
        placeholderTextColor="#AAA"
        value={localizacaoSala}
        onChangeText={setLocalizacaoSala}
      />

      <Text style={styles.label}>Descrição Detalhada</Text>
      <TextInput
        style={[styles.input, { height: 120, textAlignVertical: 'top', paddingTop: 15 }]}
        placeholder="Informe as condições e especificações..."
        placeholderTextColor="#AAA"
        value={descricaoEquipamento}
        onChangeText={setDescricaoEquipamento}
        multiline
      />

      <TouchableOpacity style={styles.button} onPress={salvarNovoEquipamento}>
        <Text style={styles.buttonText}>Confirmar Registro</Text>
      </TouchableOpacity>

      <TouchableOpacity 
        style={styles.cancelButton} 
        onPress={() => navigation.goBack()}
      >
        <Text style={styles.cancelText}>Voltar</Text>
      </TouchableOpacity>
      <View style={{ height: 40 }} />
    </ScrollView>
  );
};

export default CadastroScreen;
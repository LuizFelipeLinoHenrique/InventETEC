import React, { useState } from 'react';
import { View, Text, FlatList, TouchableOpacity, Alert } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { SafeAreaView } from 'react-native-safe-area-context';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { styles } from './style';
import { useFocusEffect } from '@react-navigation/native'; 

interface ItemInventario {
  idUnico: string;
  nome: string;
  descricao: string;
  sala: string;
}

const ListScreen = () => {
  const [inventarioEquipamentos, setInventarioEquipamentos] = useState<ItemInventario[]>([]);

  useFocusEffect(
    React.useCallback(() => {
      carregarInventario();
    }, [])
  );

  const carregarInventario = async () => {
    try {
      const dadosSalvos = await AsyncStorage.getItem('@inventario_escolar');
      if (dadosSalvos) {
        setInventarioEquipamentos(JSON.parse(dadosSalvos));
      }
    } catch (erro) {
      Alert.alert("Erro de Sistema", "Não foi possível acessar a base de dados do inventário.");
    }
  };

  const removerEquipamento = (idParaRemover: string) => {
    Alert.alert(
      "Confirmar Exclusão",
      "Deseja realmente remover este item do inventário escolar?",
      [
        { text: "Manter", style: "cancel" },
        { 
          text: "Remover", 
          style: "destructive", 
          onPress: async () => {
            const inventarioAtualizado = inventarioEquipamentos.filter(item => item.idUnico !== idParaRemover);
            setInventarioEquipamentos(inventarioAtualizado);
            await AsyncStorage.setItem('@inventario_escolar', JSON.stringify(inventarioAtualizado));
          } 
        }
      ]
    );
  };

  const renderizarEquipamento = ({ item }: { item: ItemInventario }) => (
    <View style={styles.card}>
      <View style={styles.textContainer}>
        <Text style={styles.titulo}>{item.nome}</Text>
        <View style={styles.salaContainer}>
          <Text style={styles.sala}>{item.sala}</Text>
        </View>
        <Text style={styles.descricao} numberOfLines={2}>{item.descricao}</Text>
      </View>
      
      <TouchableOpacity 
        style={styles.deleteButton} 
        onPress={() => removerEquipamento(item.idUnico)}
      >
        <Ionicons 
          name="trash-sharp" 
          size={22} 
          color="#FF3B30" 
        />
      </TouchableOpacity>
    </View>
  );

  return (
    <SafeAreaView style={styles.container} edges={['left', 'right', 'bottom']}>
      <FlatList
        data={inventarioEquipamentos}
        renderItem={renderizarEquipamento}
        keyExtractor={item => item.idUnico}
        contentContainerStyle={styles.listContent}
        ListEmptyComponent={
          <Text style={styles.emptyText}>Nenhum item registrado no inventário.</Text>
        }
      />
    </SafeAreaView>
  );
};

export default ListScreen;
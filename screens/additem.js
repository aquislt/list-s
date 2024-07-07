import React, { useState } from 'react';
import { View, TextInput, Button, StyleSheet, TouchableOpacity, Text } from 'react-native';

export default function AddItemScreen({ route, navigation }) {
  const [item, setItem] = useState('');
  const { addItem } = route.params;

  return (
    <View style={styles.container}>
      <TextInput
        style={styles.input}
        placeholder="Nome do Item"
        value={item}
        onChangeText={setItem}
      />
      <TouchableOpacity
        style={styles.addButton}
        onPress={() => {
          addItem(item);
          navigation.goBack();
        }}
      >
        <Text style={styles.addButtonText}>Adicionar</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff',
  },
  input: {
    height: 40,
    borderColor: '#AF6238',
    borderWidth: 1,
    borderRadius: 10,
    marginBottom: 20,
    paddingHorizontal: 10,
    width: '80%',
    fontFamily: 'CustomFont',
  },
  addButton: {
    backgroundColor: '#AF6238',
    padding: 10,
    borderRadius: 10,
    alignItems: 'center',
    margin: 10,
  },
  addButtonText: {
    color: '#FFF',
    fontSize: 18,
    fontFamily: 'CustomFont',
  },
});
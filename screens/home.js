import React, { useState, useEffect } from 'react';
import { View, Text, Button, StyleSheet, TouchableOpacity } from 'react-native';
import { SwipeListView } from 'react-native-swipe-list-view';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Animated, { Layout, LightSpeedInRight, LightSpeedOutLeft } from 'react-native-reanimated';
import LottieView from 'lottie-react-native';

export default function HomeScreen({ navigation }) {
  const [items, setItems] = useState([]);
  const [showPoof, setShowPoof] = useState(false);
  const [poofPosition, setPoofPosition] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const loadItems = async () => {
      try {
        const storedItems = await AsyncStorage.getItem('@shopping_list');
        if (storedItems) {
          setItems(JSON.parse(storedItems));
        }
      } catch (error) {
        console.error('Failed to load items', error);
      }
    };

    loadItems();
  }, []);

  const addItem = async (item) => {
    const newItems = [...items, { key: `${items.length}`, text: item }];
    setItems(newItems);
    try {
      await AsyncStorage.setItem('@shopping_list', JSON.stringify(newItems));
    } catch (error) {
      console.error('Erro ao salvar item', error);
    }
  };

  const deleteItem = async (rowKey, position) => {
    setPoofPosition(position);
    setShowPoof(true);
    setTimeout(async () => {
      const newData = [...items];
      const prevIndex = items.findIndex(item => item.key === rowKey);
      newData.splice(prevIndex, 1);
      setItems(newData);
      setShowPoof(false);
      try {
        await AsyncStorage.setItem('@shopping_list', JSON.stringify(newData));
      } catch (error) {
        console.error('Erro ao excluir item', error);
      }
    }, 500);
  };

  const updateItem = async (key, newText) => {
    const newData = items.map(item => {
      if (item.key === key) {
        return { ...item, text: newText };
      }
      return item;
    });
    setItems(newData);
    try {
      await AsyncStorage.setItem('@shopping_list', JSON.stringify(newData));
    } catch (error) {
      console.error('Erro ao editar item', error);
    }
  };

  return (
    <View style={styles.container}>
      <SwipeListView
        data={items}
        renderItem={({ item }) => (
          <Animated.View
            entering={LightSpeedInRight}
            exiting={LightSpeedOutLeft}
            layout={Layout.springify()}
          >
            <TouchableOpacity
              style={styles.rowFront}
              onPress={() => navigation.navigate('EditItem', { item, updateItem })}
            >
              <Text style={styles.itemText}>{item.text}</Text>
            </TouchableOpacity>
          </Animated.View>
        )}
        renderHiddenItem={({ item }, rowMap) => (
          <View style={styles.rowBack}>
            <TouchableOpacity
              style={styles.backRightBtn}
              onPress={(event) => {
                const position = {
                  x: event.nativeEvent.pageX,
                  y: event.nativeEvent.pageY,
                };
                deleteItem(item.key, position);
              }}
            >
              <Text style={styles.backTextWhite}>Excluir</Text>
            </TouchableOpacity>
          </View>
        )}
        rightOpenValue={-75}
      />
      {showPoof && (
        <LottieView
          source={require('../assets/poof.json')}
          autoPlay
          loop={false}
          style={{
            position: 'absolute',
            width: 100,
            height: 100,
            left: poofPosition.x - 50,
            top: poofPosition.y - 50,
          }}
        />
      )}
      <TouchableOpacity
        style={styles.addButton}
        onPress={() => navigation.navigate('AddItem', { addItem })}
      >
        <Text style={styles.addButtonText}>Adicionar Item</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  rowFront: {
    backgroundColor: '#fff',
    borderRadius: 10,
    height: 60,
    margin: 5,
    justifyContent: 'center',
    paddingLeft: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.8,
    shadowRadius: 2,
    elevation: 1,
  },
  rowBack: {
    alignItems: 'center',
    backgroundColor: '#AF6238',
    borderRadius: 10,
    height: 60,
    margin: 5,
    justifyContent: 'center',
    paddingLeft: 15,
    right: 0,
  },
  backRightBtn: {
    alignItems: 'center',
    bottom: 0,
    justifyContent: 'center',
    position: 'absolute',
    top: 0,
    width: 75,
    backgroundColor: '#AF6238',
    right: 0,
    borderRadius: 10,
  },
  backTextWhite: {
    color: '#FFF',
  },
  itemText: {
    fontSize: 18,
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
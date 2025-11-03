// screens/AnimalesScreen.js
import React from 'react';
import { View, Text, StyleSheet, ScrollView, SafeAreaView, TouchableOpacity, Dimensions, Image } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

export default function AnimalesScreen({ navigation }) {
  const animales = [
    { nombre: 'Jaguar', descripcion: 'Felino salvaje y símbolo de poder en la cultura maya.', imagen: '' },
    { nombre: 'Quetzal', descripcion: 'Ave colorida considerada sagrada por los mayas.', imagen: '' },
    { nombre: 'Venado', descripcion: 'Animal presente en muchos mitos y leyendas mayas.', imagen: '' },
    { nombre: 'Serpiente Emplumada', descripcion: 'Deidad representada como una serpiente alada, importante en la mitología.', imagen: '' },
    { nombre: 'Mono Araña', descripcion: 'Animal asociado a la creatividad y el juego en la mitología maya.', imagen: '' },
    { nombre: 'Tortuga', descripcion: 'Representa la tierra y la vida en la cosmovisión maya.', imagen: '' },
  ];

  const screenWidth = Dimensions.get('window').width;
  const cardWidth = (screenWidth - 60) / 2;

  return (
    <SafeAreaView style={styles.container}>
      {/* Header con flecha de regreso */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
          <Ionicons name="arrow-back" size={28} color="#075eec" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Animales Mayas</Text>
      </View>

      <ScrollView contentContainerStyle={styles.content}>
        <View style={styles.grid}>
          {animales.map((item, index) => (
            <View key={index} style={[styles.card, { width: cardWidth }]}>
              {/* Espacio para la imagen */}
              <View style={styles.imagePlaceholder}>
                {item.imagen ? (
                  <Image source={{ uri: item.imagen }} style={styles.image} />
                ) : (
                  <Text style={styles.imageText}>Imagen</Text>
                )}
              </View>
              <Text style={styles.title}>{item.nombre}</Text>
              <Text style={styles.description}>{item.descripcion}</Text>
            </View>
          ))}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#e6f0ff' },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingBottom: 20,
    paddingTop: 55,
    backgroundColor: '#fff',
    borderBottomWidth: 1,
    borderBottomColor: '#C9D3DB',
    shadowColor: '#000',
    shadowOpacity: 0.05,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 5,
    elevation: 3,
    justifyContent: 'center',
  },
  backButton: {
    position: 'absolute',
    left: 20,
    top: 55,
    zIndex: 10,
  },
  headerTitle: {
    flex: 1,
    fontSize: 22,
    fontWeight: '700',
    color: '#075eec',
    textAlign: 'center',
    marginTop: 0,
  },
  content: {
    padding: 20,
  },
  grid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  card: {
    backgroundColor: '#fff',
    padding: 15,
    marginBottom: 15,
    borderRadius: 15,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 5,
    alignItems: 'center',
    justifyContent: 'center',
  },
  imagePlaceholder: {
    width: '100%',
    height: 100,
    borderRadius: 12,
    backgroundColor: '#f2f6ff',
    marginBottom: 10,
    alignItems: 'center',
    justifyContent: 'center',
  },
  imageText: {
    color: '#999',
    fontWeight: '700',
  },
  image: {
    width: '100%',
    height: '100%',
    borderRadius: 12,
  },
  title: {
    fontSize: 16,
    fontWeight: '700',
    color: '#075eec',
    marginBottom: 6,
    textAlign: 'center',
  },
  description: {
    fontSize: 14,
    color: '#1D2A32',
    textAlign: 'left',
  },
});

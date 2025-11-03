// screens/ObjetosScreen.js
import React from 'react';
import { View, Text, StyleSheet, ScrollView, SafeAreaView, TouchableOpacity, Dimensions, Image } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

export default function ObjetosScreen({ navigation }) {
  const objetos = [
    { nombre: 'Calendario Maya', descripcion: 'Instrumento utilizado por los mayas para medir el tiempo y organizar eventos rituales.', imagen: '' },
    { nombre: 'Estela', descripcion: 'Monumento de piedra tallada con inscripciones y figuras que narran la historia de los gobernantes.', imagen: '' },
    { nombre: 'Máscara de Jade', descripcion: 'Objeto ceremonial hecho de jade utilizado en rituales funerarios y religiosos.', imagen: '' },
    { nombre: 'Vasija Cerámica', descripcion: 'Recipiente de barro decorado con pinturas y símbolos mayas.', imagen: '' },
    { nombre: 'Cetro Real', descripcion: 'Símbolo de autoridad de los gobernantes mayas, usado en ceremonias.', imagen: '' },
    { nombre: 'Escultura de Dios', descripcion: 'Figuras talladas en piedra o madera representando a deidades mayas.', imagen: '' },
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
        <Text style={styles.headerTitle}>Objetos Mayas</Text>
      </View>

      <ScrollView contentContainerStyle={styles.content}>
        <View style={styles.grid}>
          {objetos.map((item, index) => (
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
    borderRadius: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 5,
    elevation: 3,
    alignItems: 'center',
    justifyContent: 'center',
  },
  imagePlaceholder: {
    width: '100%',
    height: 100,
    borderRadius: 10,
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
    borderRadius: 10,
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
    textAlign: 'center',
  },
});

// screens/GlosarioScreen.js
import React from 'react';
import { View, Text, StyleSheet, ScrollView, SafeAreaView, TouchableOpacity, Dimensions } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

export default function GlosarioScreen({ navigation }) {
  const glosario = [
    { termino: 'Chak', definicion: 'Dios de la lluvia en la mitología maya.' },
    { termino: 'Popol Vuh', definicion: 'Libro sagrado de los mayas quiché.' },
    { termino: "K'in", definicion: 'Palabra maya para referirse al "día".' },
    { termino: 'Ahau', definicion: 'Título de los gobernantes mayas.' },
    { termino: 'Pok-ta-pok', definicion: 'Juego de pelota ritual de los mayas.' },
    { termino: 'Glyph', definicion: 'Símbolo escrito utilizado en los códices mayas.' },
    { termino: 'Itzamná', definicion: 'Dios creador y sabio en la mitología maya.' },
    { termino: 'Bacab', definicion: 'Cada uno de los cuatro dioses que sostenían el cielo.' },
    { termino: 'Hunahpu', definicion: 'Héroe gemelo del Popol Vuh, jugador de pelota.' },
    { termino: 'Uxmal', definicion: 'Importante ciudad maya en la península de Yucatán.' },
    { termino: 'Tikal', definicion: 'Ciudad-estado maya ubicada en Guatemala.' },
    { termino: 'Chichen Itzá', definicion: 'Famosa ciudad maya, centro ceremonial y astronómico.' },
    { termino: 'Ah Mun', definicion: 'Dios del maíz, elemento vital para la civilización maya.' },
    { termino: 'Nohoch', definicion: 'Significa "grande" o "importante" en maya.' },
    { termino: 'Ixchel', definicion: 'Diosa de la luna y la fertilidad en la mitología maya.' },
    { termino: 'Kukulkán', definicion: 'Serpiente emplumada, deidad importante para los mayas.' },
    { termino: 'Balam', definicion: 'Jaguar sagrado, símbolo de poder y protección.' },
    { termino: 'Ah Puch', definicion: 'Dios de la muerte en la mitología maya.' },
    { termino: 'Yaxché', definicion: 'Árbol sagrado de los mayas, conocido como ceiba.' },
    { termino: 'Cenote', definicion: 'Pozo natural de agua usado para rituales y abastecimiento.' },
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
        <Text style={styles.headerTitle}>Glosario Maya</Text>
      </View>

      <ScrollView contentContainerStyle={styles.content}>
        <View style={styles.grid}>
          {glosario.map((item, index) => (
            <View key={index} style={[styles.card, { width: cardWidth }]}>
              <Text style={styles.term}>{item.termino}</Text>
              <Text style={styles.definition}>{item.definicion}</Text>
            </View>
          ))}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#e6f0ff' }, // Fondo azul claro
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingBottom: 20,
    paddingTop: 55, // <- Aquí bajamos el título y el botón
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
  term: {
    fontSize: 16,
    fontWeight: '700',
    color: '#075eec',
    marginBottom: 6,
    textAlign: 'center',
  },
  definition: {
    fontSize: 14,
    color: '#1D2A32',
    textAlign: 'center',
  },
});

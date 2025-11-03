import React, { useState } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
  SafeAreaView,
  Modal,
  Alert,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";

export default function HomeScreen({ navigation, route }) {
  const [menuVisible, setMenuVisible] = useState(false);
  const usuario = route.params?.usuario;
  const nombreUsuario = usuario ? usuario.nombre : "Usuario";

  const handleLogout = () => {
    Alert.alert(
      "Cerrar sesión",
      "¿Estás seguro que quieres cerrar sesión?",
      [
        { text: "No", style: "cancel" },
        {
          text: "Sí",
          onPress: () => {
            setMenuVisible(false);
            navigation.goBack(); // Regresa al Login
          },
        },
      ],
      { cancelable: true }
    );
  };

  // 🔹 Opciones del menú principal
  const opciones = [
    {
      title: "Tareas",
      subtitle: "Refuerza tus conocimientos",
      icon: "school-outline",
      screen: "Tareas",
      color: "#075eec",
    },
    {
      title: "Contenido de Apoyo",
      subtitle: "Material adicional de estudio",
      icon: "help-circle-outline",
      screen: "Contenido", // <-- coincide con App.js
      color: "#f59e0b",
    },
    {
      title: "Comidas",
      subtitle: "Descubre la gastronomía maya",
      icon: "restaurant-outline",
      screen: "Comidas",
      color: "#075eec",
    },
    {
      title: "Objetos cotidianos",
      subtitle: "Aprende vocabulario útil",
      icon: "cube-outline",
      screen: "Objetos",
      color: "#075eec",
    },
    {
      title: "Animales",
      subtitle: "Conoce su nombre en maya",
      icon: "paw-outline",
      screen: "Animales",
      color: "#075eec",
    },
    {
      title: "Glosario",
      subtitle: "Consulta términos y definiciones",
      icon: "book-outline",
      screen: "Glosario",
      color: "#075eec",
    },
  ];

  return (
    <SafeAreaView style={styles.container}>
      {/* 🔹 Encabezado */}
      <View style={styles.header}>
        <TouchableOpacity
          onPress={() => setMenuVisible(true)}
          style={styles.menuButton}
        >
          <Ionicons name="menu" size={28} color="#075eec" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Hola, {nombreUsuario}</Text>
      </View>

      {/* 🔹 Contenido principal */}
      <ScrollView contentContainerStyle={styles.scrollView}>
        {opciones.map((item, index) => (
          <TouchableOpacity
            key={index}
            style={[
              styles.card,
              item.title === "Contenido de Apoyo"
                ? { borderLeftColor: item.color, backgroundColor: "#fff8e1" }
                : { borderLeftColor: item.color },
            ]}
            onPress={() => navigation.navigate(item.screen, { usuario })}
          >
            <Ionicons name={item.icon} size={40} color={item.color} />
            <Text style={[styles.cardTitle, { color: item.color }]}>
              {item.title}
            </Text>
            <Text style={styles.cardSubtitle}>{item.subtitle}</Text>
          </TouchableOpacity>
        ))}
      </ScrollView>

      {/* 🔹 Menú lateral */}
      <Modal
        visible={menuVisible}
        transparent={true}
        animationType="slide"
        onRequestClose={() => setMenuVisible(false)}
      >
        <TouchableOpacity
          style={styles.modalBackground}
          activeOpacity={1}
          onPressOut={() => setMenuVisible(false)}
        >
          <View style={styles.menuContainer}>
            <Text style={styles.menuTitle}>Menú</Text>

            {[
              { name: "Perfil", icon: "person-outline", color: "#333", screen: "Perfil" },
              { name: "Configuración", icon: "settings-outline", color: "#333" },
              { name: "Notificaciones", icon: "notifications-outline", color: "#333" },
            ].map((item, index) => (
              <TouchableOpacity
                key={index}
                style={styles.menuItem}
                onPress={() => {
                  setMenuVisible(false);
                  if (item.screen) navigation.navigate(item.screen, { usuario });
                }}
              >
                <Ionicons name={item.icon} size={22} color={item.color} />
                <Text style={styles.menuText}>{item.name}</Text>
              </TouchableOpacity>
            ))}

            <TouchableOpacity
              style={[
                styles.menuItem,
                { borderTopWidth: 1, borderTopColor: "#ccc", marginTop: 10 },
              ]}
              onPress={handleLogout}
            >
              <Ionicons name="log-out-outline" size={22} color="red" />
              <Text style={[styles.menuText, { color: "red" }]}>Cerrar sesión</Text>
            </TouchableOpacity>
          </View>
        </TouchableOpacity>
      </Modal>
    </SafeAreaView>
  );
}

// 🎨 Estilos
const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#e6f0ff" },
  header: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 20,
    paddingVertical: 15,
    backgroundColor: "#fff",
    borderBottomWidth: 1,
    borderBottomColor: "#ccc",
    shadowColor: "#000",
    shadowOpacity: 0.05,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 5,
    elevation: 3,
    paddingTop: 55,
  },
  menuButton: {
    padding: 6,
    borderRadius: 8,
    backgroundColor: "#d0e4ff",
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: "bold",
    marginLeft: 15,
    color: "#075eec",
  },
  scrollView: { padding: 20 },
  card: {
    backgroundColor: "#fff",
    borderRadius: 15,
    padding: 25,
    marginBottom: 15,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.1,
    shadowRadius: 6,
    elevation: 4,
    borderLeftWidth: 5,
  },
  cardTitle: { fontSize: 16, fontWeight: "bold", marginTop: 10 },
  cardSubtitle: { color: "#555", fontSize: 14, textAlign: "center", marginTop: 5 },
  modalBackground: { flex: 1, backgroundColor: "rgba(0,0,0,0.3)", justifyContent: "flex-start" },
  menuContainer: {
    width: "75%",
    backgroundColor: "#fff",
    height: "100%",
    paddingTop: 60,
    paddingHorizontal: 20,
    borderTopRightRadius: 20,
    borderBottomRightRadius: 20,
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowOffset: { width: 2, height: 0 },
    shadowRadius: 5,
    elevation: 5,
  },
  menuTitle: { fontSize: 22, fontWeight: "bold", marginBottom: 25, color: "#075eec" },
  menuItem: { flexDirection: "row", alignItems: "center", paddingVertical: 15 },
  menuText: { fontSize: 16, marginLeft: 12, color: "#000" },
});

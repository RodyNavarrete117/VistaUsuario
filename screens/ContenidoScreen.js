// screens/ContenidoScreen.js
import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  ScrollView,
  SafeAreaView,
  TouchableOpacity,
  StyleSheet,
  Dimensions,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { supabase } from "../supabase";

export default function ContenidoScreen({ route, navigation }) {
  const { usuario } = route.params;
  const [contenidos, setContenidos] = useState([]);

  useEffect(() => {
    obtenerContenidos();
  }, []);

  const obtenerContenidos = async () => {
    const { data, error } = await supabase
      .from("contenido_aprendizaje")
      .select("*")
      .order("id", { ascending: true });

    if (!error) setContenidos(data);
    else console.error("Error al obtener contenidos:", error);
  };

  const screenWidth = Dimensions.get("window").width;
  const cardWidth = screenWidth - 40;

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
          <Ionicons name="arrow-back" size={28} color="#075eec" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Contenido Educativo Maya</Text>
      </View>

      <ScrollView contentContainerStyle={styles.content}>
        {contenidos.length > 0 ? (
          contenidos.map((c) => (
            <View key={c.id} style={[styles.card, { width: cardWidth }]}>
              <Text style={styles.title}>{c.titulo}</Text>
              <Text style={styles.description}>{c.descripcion}</Text>
              <Text style={styles.subinfo}>Tipo: {c.tipo_contenido}</Text>
              {c.url_contenido ? (
                <Text style={[styles.subinfo, { color: "#2563eb", textDecorationLine: "underline" }]}>
                  {c.url_contenido}
                </Text>
              ) : null}
            </View>
          ))
        ) : (
          <Text style={styles.noContent}>No hay contenidos registrados.</Text>
        )}
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#e6f0ff" },
  header: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 20,
    paddingVertical: 15,
    backgroundColor: "#fff",
    borderBottomWidth: 1,
    borderBottomColor: "#C9D3DB",
    shadowColor: "#000",
    shadowOpacity: 0.05,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 5,
    elevation: 3,
    paddingTop: 55,
  },
  backButton: { position: "absolute", left: 20, top: 55, zIndex: 10 },
  headerTitle: { flex: 1, fontSize: 18, fontWeight: "700", color: "#075eec", textAlign: "center" },
  content: { padding: 20, alignItems: "center" },

  // 🔹 Estilos de cards mejorados y con fuentes más grandes
  card: {
    backgroundColor: "#fff",
    padding: 22,
    marginBottom: 15,
    borderRadius: 16,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.15,
    shadowRadius: 8,
    elevation: 5,
    borderLeftWidth: 5,
    borderLeftColor: "#075eec",
  },
  title: { fontSize: 20, fontWeight: "700", color: "#075eec", marginBottom: 10 },
  description: { fontSize: 16, color: "#1D2A32", marginBottom: 8, lineHeight: 22 },
  subinfo: { fontSize: 14, color: "#64748b", marginBottom: 4 },
  noContent: { fontSize: 16, color: "#64748b", marginTop: 20 },
});

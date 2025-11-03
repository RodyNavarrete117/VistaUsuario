// screens/TareasScreen.js
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

export default function TareasScreen({ route, navigation }) {
  const { usuario } = route.params;
  const [tareas, setTareas] = useState([]);

  useEffect(() => {
    if (usuario?.id) {
      obtenerTareas(usuario.id);
    }
  }, [usuario]);

  const obtenerTareas = async (usuario_id) => {
    const { data, error } = await supabase
      .from("tareas_asignadas")
      .select("*")
      .eq("usuario_id", usuario_id)
      .order("fecha_entrega", { ascending: true });

    if (error) console.error("Error al obtener tareas:", error);
    else setTareas(data);
  };

  const marcarCompletada = async (id) => {
    const { error } = await supabase
      .from("tareas_asignadas")
      .update({ estado: "Completada" })
      .eq("id", id);

    if (error) console.error("Error al actualizar tarea:", error);
    else obtenerTareas(usuario.id);
  };

  const screenWidth = Dimensions.get("window").width;
  const cardWidth = screenWidth - 30;

  return (
    <SafeAreaView style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity
          onPress={() => navigation.goBack()}
          style={styles.backButton}
        >
          <Ionicons name="arrow-back" size={28} color="#075eec" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>{usuario?.nombre} - Mis Tareas</Text>
      </View>

      <ScrollView contentContainerStyle={styles.content}>
        {tareas.length > 0 ? (
          tareas.map((t) => (
            <View key={t.id} style={[styles.card, { width: cardWidth }]}>
              <Text style={styles.title}>{t.titulo}</Text>
              <Text style={styles.description}>{t.descripcion}</Text>
              <Text style={styles.fecha}>
                Fecha de entrega: {t.fecha_entrega || "—"}
              </Text>
              <Text style={styles.estado}>Estado: {t.estado}</Text>

              {t.estado !== "Completada" && (
                <TouchableOpacity
                  onPress={() => marcarCompletada(t.id)}
                  style={styles.completeButton}
                >
                  <Text style={styles.completeButtonText}>
                    Marcar como Completada
                  </Text>
                </TouchableOpacity>
              )}
            </View>
          ))
        ) : (
          <Text style={styles.noTareas}>No tienes tareas asignadas.</Text>
        )}
      </ScrollView>
    </SafeAreaView>
  );
}

// 🎨 Estilos ajustados
const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#f0f4f8" },
  header: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 20,
    paddingBottom: 20,
    paddingTop: 55,
    backgroundColor: "#fff",
    borderBottomWidth: 1,
    borderBottomColor: "#d1d5db",
    shadowColor: "#000",
    shadowOpacity: 0.05,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 5,
    elevation: 3,
  },
  backButton: {
    position: "absolute",
    left: 20,
    top: 55,
    zIndex: 10,
  },
  headerTitle: {
    flex: 1,
    fontSize: 22, // Mismo tamaño que la flecha
    fontWeight: "700",
    color: "#075eec",
    textAlign: "center",
  },
  content: {
    padding: 20,
    alignItems: "center",
  },
  card: {
    backgroundColor: "#fff",
    padding: 25, // Más padding
    marginBottom: 20,
    borderRadius: 16,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 5 },
    shadowOpacity: 0.15,
    shadowRadius: 10,
    elevation: 6,
  },
  title: { fontSize: 20, fontWeight: "700", color: "#075eec", marginBottom: 10 },
  description: { fontSize: 17, color: "#1f2937", marginBottom: 8 },
  fecha: { fontSize: 15, color: "#374151", marginBottom: 4 },
  estado: { fontSize: 15, color: "#374151", marginBottom: 12 },
  completeButton: {
    backgroundColor: "#10b981",
    paddingVertical: 12,
    borderRadius: 12,
    alignItems: "center",
  },
  completeButtonText: { color: "#fff", fontWeight: "700", fontSize: 16 },
  noTareas: { fontSize: 18, color: "#6b7280", marginTop: 30, textAlign: "center" },
});

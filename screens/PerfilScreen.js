import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  TouchableOpacity,
  Image,
  ActivityIndicator,
} from "react-native";
import { Ionicons, MaterialIcons } from "@expo/vector-icons";
import { supabase } from "../supabase";

export default function PerfilScreen({ navigation }) {
  const [usuario, setUsuario] = useState(null);
  const [grupo, setGrupo] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    obtenerPerfil();
  }, []);

  // 🔹 Consulta directa a Supabase (sin Auth)
  const obtenerPerfil = async () => {
    try {
      setLoading(true);

      // 🔸 Aquí defines el ID del usuario que quieres mostrar
      const usuarioId = 1; // Cambia este valor según el registro que quieras ver

      // Obtener datos del usuario
      const { data: usuarioData, error: usuarioError } = await supabase
        .from("usuarios")
        .select("id, nombre, matricula, correo, grupo_id")
        .eq("id", usuarioId)
        .single();

      if (usuarioError) throw usuarioError;
      setUsuario(usuarioData);

      // Obtener el grupo del usuario
      if (usuarioData?.grupo_id) {
        const { data: grupoData, error: grupoError } = await supabase
          .from("grupos")
          .select("nombre, nivel")
          .eq("id", usuarioData.grupo_id)
          .single();

        if (!grupoError) setGrupo(grupoData);
      }
    } catch (err) {
      console.error("⚠️ Error al obtener perfil:", err.message);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <SafeAreaView style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#075eec" />
        <Text style={{ marginTop: 10, color: "#075eec" }}>Cargando perfil...</Text>
      </SafeAreaView>
    );
  }

  if (!usuario) {
    return (
      <SafeAreaView style={styles.loadingContainer}>
        <Text style={{ color: "#075eec", fontSize: 16 }}>
          No se encontró información del usuario.
        </Text>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.container}>
      {/* Header con flecha y título */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
          <Ionicons name="arrow-back" size={28} color="#075eec" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Perfil</Text>
      </View>

      {/* Contenedor del perfil */}
      <View style={styles.profileCard}>
        <View style={styles.iconContainer}>
          <Image
            source={{
              uri: "https://cdn-icons-png.flaticon.com/512/149/149071.png",
            }}
            style={styles.profileIcon}
          />
        </View>

        <Text style={styles.name}>{usuario.nombre}</Text>
        <Text style={styles.role}>Estudiante del Idioma Maya</Text>

        <View style={styles.infoContainer}>
          <View style={styles.infoRow}>
            <MaterialIcons name="email" size={20} color="#075eec" />
            <Text style={styles.infoLabel}>Correo:</Text>
            <Text style={styles.infoValue}>{usuario.correo}</Text>
          </View>

          <View style={styles.infoRow}>
            <MaterialIcons name="badge" size={20} color="#075eec" />
            <Text style={styles.infoLabel}>Matrícula:</Text>
            <Text style={styles.infoValue}>{usuario.matricula}</Text>
          </View>

          <View style={styles.infoRow}>
            <Ionicons name="school-outline" size={20} color="#075eec" />
            <Text style={styles.infoLabel}>Grupo:</Text>
            <Text style={styles.infoValue}>
              {grupo ? `${grupo.nombre} (${grupo.nivel})` : "Sin grupo"}
            </Text>
          </View>
        </View>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#e6f0ff" },
  loadingContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#e6f0ff",
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 20,
    paddingTop: 40,
    paddingBottom: 20,
    backgroundColor: "#fff",
    borderBottomWidth: 1,
    borderBottomColor: "#C9D3DB",
    shadowColor: "#000",
    shadowOpacity: 0.05,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 5,
    elevation: 3,
    justifyContent: "center",
    position: "relative",
  },
  backButton: {
    position: "absolute",
    left: 20,
    top: 55,
  },
  headerTitle: {
    fontSize: 22,
    fontWeight: "700",
    color: "#075eec",
    textAlign: "center",
  },
  profileCard: {
    backgroundColor: "#fff",
    margin: 20,
    borderRadius: 25,
    paddingVertical: 35,
    paddingHorizontal: 25,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 5 },
    shadowOpacity: 0.12,
    shadowRadius: 12,
    elevation: 6,
  },
  iconContainer: {
    borderWidth: 4,
    borderColor: "#075eec",
    borderRadius: 65,
    padding: 5,
    marginBottom: 15,
    shadowColor: "#000",
    shadowOpacity: 0.15,
    shadowOffset: { width: 0, height: 4 },
    shadowRadius: 6,
  },
  profileIcon: {
    width: 110,
    height: 110,
    borderRadius: 55,
  },
  name: {
    fontSize: 23,
    fontWeight: "700",
    color: "#075eec",
    marginBottom: 6,
    textAlign: "center",
  },
  role: {
    fontSize: 16,
    color: "#555",
    marginBottom: 30,
    textAlign: "center",
  },
  infoContainer: {
    width: "100%",
  },
  infoRow: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 14,
    paddingHorizontal: 20,
    marginBottom: 15,
    backgroundColor: "#f2f6ff",
    borderRadius: 15,
    shadowColor: "#000",
    shadowOpacity: 0.05,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 3,
    elevation: 2,
  },
  infoLabel: {
    fontWeight: "700",
    color: "#075eec",
    marginLeft: 10,
    width: 100,
  },
  infoValue: {
    flex: 1,
    color: "#1D2A32",
    fontWeight: "500",
  },
});

import React, { useState, useEffect } from "react";
import {
  StyleSheet,
  SafeAreaView,
  View,
  Image,
  Text,
  TouchableOpacity,
  TextInput,
  ActivityIndicator,
  ScrollView,
  KeyboardAvoidingView,
  Platform,
  Alert
} from "react-native";
import { supabase } from "../supabase";

export default function LoginScreen({ navigation }) {
  const [form, setForm] = useState({ email: "", password: "" });
  const [loading, setLoading] = useState(false);
  const [loadingDB, setLoadingDB] = useState(true);

  // Verificar conexión a la base de datos
  useEffect(() => {
    const checkSupabaseConnection = async () => {
      try {
        await supabase.from("usuarios").select("id").limit(1);
      } catch (err) {
        console.error("❌ Error conectando a Supabase:", err);
        Alert.alert("Error", "No se pudo conectar con la base de datos.");
      } finally {
        setLoadingDB(false);
      }
    };
    checkSupabaseConnection();
  }, []);

  // Función para login real
  const handleLogin = async () => {
    const { email, password } = form;

    if (!email || !password) {
      Alert.alert("Campos vacíos", "Por favor, completa todos los campos.");
      return;
    }

    setLoading(true);

    try {
      // Buscar usuario con correo y contraseña correctos
      const { data, error } = await supabase
        .from("usuarios")
        .select("*")
        .eq("correo", email)
        .eq("contrasena", password)
        .single();

      if (error || !data) {
        Alert.alert("Error de inicio de sesión", "Correo o contraseña incorrectos.");
      } else {
        Alert.alert("Bienvenido", `Hola, ${data.nombre}`);
        navigation.navigate("Home", { usuario: data });
      }
    } catch (err) {
      console.error("⚠️ Error al iniciar sesión:", err);
      Alert.alert("Error", "Hubo un problema al conectar con la base de datos.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: "#e8ecf4" }}>
      <KeyboardAvoidingView
        style={{ flex: 1 }}
        behavior={Platform.OS === "ios" ? "padding" : "height"}
      >
        <ScrollView
          contentContainerStyle={styles.container}
          keyboardShouldPersistTaps="handled"
        >
          <View style={styles.headerCentered}>
            <Image
              alt="App Logo"
              resizeMode="contain"
              style={styles.headerImg}
              source={{ uri: "https://cdn-profiles.tunein.com/p2391096/images/logog.png?t=1" }}
            />
            <Text style={styles.titleCentered}>
              Inicia sesión en{"\n"}
              <Text style={{ color: "#075eec", fontWeight: "700" }}>
                Aprendizaje MayaYucateco
              </Text>
            </Text>
            <Text style={styles.subtitle}>Accede a tu cuenta y más funciones</Text>

            {loadingDB && (
              <View style={{ flexDirection: "row", alignItems: "center", marginTop: 10 }}>
                <ActivityIndicator size="small" color="#075eec" />
                <Text style={{ marginLeft: 8 }}>Cargando contenido...</Text>
              </View>
            )}
          </View>

          {!loadingDB && (
            <View style={styles.form}>
              <View style={styles.input}>
                <Text style={styles.inputLabel}>Correo electrónico</Text>
                <TextInput
                  autoCapitalize="none"
                  keyboardType="email-address"
                  placeholder="usuario@ejemplo.com"
                  placeholderTextColor="#6b7280"
                  style={styles.inputControl}
                  value={form.email}
                  onChangeText={(email) => setForm({ ...form, email })}
                />
              </View>

              <View style={styles.input}>
                <Text style={styles.inputLabel}>Contraseña</Text>
                <TextInput
                  placeholder="********"
                  placeholderTextColor="#6b7280"
                  style={styles.inputControl}
                  secureTextEntry
                  value={form.password}
                  onChangeText={(password) => setForm({ ...form, password })}
                />
              </View>

              <View style={styles.formAction}>
                <TouchableOpacity onPress={handleLogin} disabled={loading} style={styles.btn}>
                  {loading ? (
                    <ActivityIndicator color="#fff" />
                  ) : (
                    <Text style={styles.btnText}>Iniciar sesión</Text>
                  )}
                </TouchableOpacity>
              </View>

              <TouchableOpacity onPress={() => navigation.navigate("Remember")}>
                <Text style={styles.formLink}>¿Olvidaste tu contraseña?</Text>
              </TouchableOpacity>

              <TouchableOpacity onPress={() => navigation.navigate("Register")}>
                <Text style={styles.formFooter}>
                  ¿No tienes una cuenta?{" "}
                  <Text style={{ textDecorationLine: "underline" }}>Regístrate</Text>
                </Text>
              </TouchableOpacity>
            </View>
          )}
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

// 🎨 Estilos
const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    padding: 24,
    justifyContent: "center",
    backgroundColor: "#e8ecf4",
  },
  headerCentered: {
    alignItems: "center",
    marginBottom: 30,
    marginTop: 40,
  },
  headerImg: {
    width: 100,
    height: 100,
    marginBottom: 20,
  },
  titleCentered: {
    fontSize: 28,
    fontWeight: "700",
    color: "#1D2A32",
    textAlign: "center",
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 16,
    fontWeight: "500",
    color: "#929292",
    textAlign: "center",
    marginBottom: 20,
  },
  form: { flexGrow: 1 },
  input: { marginBottom: 18 },
  inputLabel: {
    fontSize: 17,
    fontWeight: "600",
    color: "#222",
    marginBottom: 6,
  },
  inputControl: {
    height: 50,
    backgroundColor: "#fff",
    paddingHorizontal: 16,
    borderRadius: 12,
    fontSize: 15,
    fontWeight: "500",
    color: "#222",
    borderWidth: 1,
    borderColor: "#C9D3DB",
  },
  formAction: {
    marginTop: 10,
    marginBottom: 18,
  },
  btn: {
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 30,
    paddingVertical: 12,
    backgroundColor: "#075eec",
  },
  btnText: {
    fontSize: 18,
    fontWeight: "600",
    color: "#fff",
  },
  formLink: {
    fontSize: 16,
    fontWeight: "600",
    color: "#075eec",
    textAlign: "center",
    marginTop: 6,
  },
  formFooter: {
    paddingVertical: 24,
    fontSize: 15,
    fontWeight: "600",
    color: "#222",
    textAlign: "center",
  },
});

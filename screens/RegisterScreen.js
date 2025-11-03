import React, { useState, useRef } from "react";
import {
  StyleSheet,
  SafeAreaView,
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Alert,
  ScrollView,
  KeyboardAvoidingView,
  Platform
} from "react-native";
import { Ionicons } from "@expo/vector-icons";

export default function RegisterScreen({ navigation }) {
  const [form, setForm] = useState({ name: "", email: "", password: "", confirmPassword: "" });
  const [errors, setErrors] = useState({});
  const scrollViewRef = useRef();

  const handleRegister = () => {
    let valid = true;
    let newErrors = {};

    if (!form.name) { newErrors.name = "Ingresa tu nombre"; valid = false; }
    if (!form.email) { newErrors.email = "Ingresa tu correo"; valid = false; }
    if (!form.password) { newErrors.password = "Ingresa tu contraseña"; valid = false; }
    if (form.password !== form.confirmPassword) { newErrors.confirmPassword = "Las contraseñas no coinciden"; valid = false; }

    setErrors(newErrors);
    if (!valid) return;

    Alert.alert("Registro exitoso", `Bienvenido ${form.name}`);
    navigation.navigate("Home");
  };

  const scrollToInput = (reactNode) => {
    scrollViewRef.current?.scrollTo({ y: reactNode, animated: true });
  };

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: "#e8ecf4" }}>
      <KeyboardAvoidingView
        style={{ flex: 1 }}
        behavior={Platform.OS === "ios" ? "padding" : "height"}
      >
        <ScrollView
          ref={scrollViewRef}
          contentContainerStyle={{ flexGrow: 1, justifyContent: "center", padding: 24 }}
          keyboardShouldPersistTaps="handled"
        >
          <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backArrow}>
            <Ionicons name="arrow-back" size={28} color="#075eec" />
          </TouchableOpacity>

          <View style={styles.headerCentered}>
            <Text style={styles.titleCentered}>
              Crea tu cuenta{"\n"}
              <Text style={{ color: "#075eec", fontWeight: "700" }}>Aprendizaje MayaYucateco</Text>
            </Text>
            <Text style={styles.subtitle}>Regístrate para acceder a la app</Text>
          </View>

          <View style={styles.form}>
            <View style={styles.input}>
              <Text style={styles.inputLabel}>Nombre completo</Text>
              <TextInput
                placeholder="Tu nombre"
                placeholderTextColor="#6b7280"
                style={styles.inputControl}
                value={form.name}
                onChangeText={(name) => setForm({ ...form, name })}
                onFocus={(event) => scrollToInput(event.nativeEvent.target)}
              />
              {errors.name && <Text style={styles.errorText}>{errors.name}</Text>}
            </View>

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
                onFocus={(event) => scrollToInput(event.nativeEvent.target)}
              />
              {errors.email && <Text style={styles.errorText}>{errors.email}</Text>}
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
                onFocus={(event) => scrollToInput(event.nativeEvent.target)}
              />
              {errors.password && <Text style={styles.errorText}>{errors.password}</Text>}
            </View>

            <View style={styles.input}>
              <Text style={styles.inputLabel}>Confirmar contraseña</Text>
              <TextInput
                placeholder="********"
                placeholderTextColor="#6b7280"
                style={styles.inputControl}
                secureTextEntry
                value={form.confirmPassword}
                onChangeText={(confirmPassword) => setForm({ ...form, confirmPassword })}
                onFocus={(event) => scrollToInput(event.nativeEvent.target)}
              />
              {errors.confirmPassword && <Text style={styles.errorText}>{errors.confirmPassword}</Text>}
            </View>

            <View style={styles.formAction}>
              <TouchableOpacity onPress={handleRegister} style={styles.btn}>
                <Text style={styles.btnText}>Registrarse</Text>
              </TouchableOpacity>
            </View>

            <TouchableOpacity onPress={() => navigation.navigate("Login")}>
              <Text style={styles.formLink}>
                ¿Ya tienes cuenta? <Text style={{ textDecorationLine: "underline" }}>Inicia sesión</Text>
              </Text>
            </TouchableOpacity>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#e8ecf4" },
  backArrow: { marginTop: 25, marginBottom: 15 },
  headerCentered: { alignItems: "center", justifyContent: "center", marginBottom: 20 },
  titleCentered: { fontSize: 28, fontWeight: "700", color: "#1D2A32", textAlign: "center", marginBottom: 4 },
  subtitle: { fontSize: 16, fontWeight: "500", color: "#929292", marginBottom: 15, textAlign: "center" },
  form: { flexGrow: 1 },
  input: { marginBottom: 18 },
  inputLabel: { fontSize: 17, fontWeight: "600", color: "#222", marginBottom: 6 },
  inputControl: { height: 50, backgroundColor: "#fff", paddingHorizontal: 16, borderRadius: 12, fontSize: 15, fontWeight: "500", color: "#222", borderWidth: 1, borderColor: "#C9D3DB" },
  errorText: { color: "#e63946", marginTop: 5, fontSize: 13, fontWeight: "500" },
  formAction: { marginTop: 10, marginBottom: 18 },
  btn: { alignItems: "center", justifyContent: "center", borderRadius: 30, paddingVertical: 12, backgroundColor: "#075eec" },
  btnText: { fontSize: 18, fontWeight: "600", color: "#fff" },
  formLink: { fontSize: 16, fontWeight: "600", color: "#075eec", textAlign: "center", marginTop: 6 },
});

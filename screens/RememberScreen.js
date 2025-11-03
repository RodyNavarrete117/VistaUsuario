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
  Platform,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";

export default function RememberScreen({ navigation }) {
  const [email, setEmail] = useState("");
  const [error, setError] = useState("");
  const scrollViewRef = useRef();

  const handleRecover = () => {
    setError("");

    if (!email) {
      setError("Ingresa tu correo electrónico");
      return;
    }

    // Simulación de envío
    Alert.alert(
      "Correo enviado",
      `Se ha enviado un enlace de recuperación a ${email}`
    );
    navigation.navigate("Login");
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
          contentContainerStyle={{
            flexGrow: 1,
            justifyContent: "center",
            padding: 24,
          }}
          keyboardShouldPersistTaps="handled"
        >
          {/* Flecha para regresar */}
          <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backArrow}>
            <Ionicons name="arrow-back" size={28} color="#075eec" />
          </TouchableOpacity>

          {/* Encabezado */}
          <View style={styles.headerCentered}>
            <Text style={styles.titleCentered}>
              Recupera tu{"\n"}
              <Text style={{ color: "#075eec", fontWeight: "700" }}>contraseña</Text>
            </Text>
            <Text style={styles.subtitle}>
              Ingresa tu correo electrónico para restablecer tu contraseña
            </Text>
          </View>

          {/* Formulario */}
          <View style={styles.form}>
            <View style={styles.input}>
              <Text style={styles.inputLabel}>Correo electrónico</Text>
              <TextInput
                autoCapitalize="none"
                keyboardType="email-address"
                placeholder="usuario@ejemplo.com"
                placeholderTextColor="#6b7280"
                style={styles.inputControl}
                value={email}
                onChangeText={setEmail}
                onFocus={(event) => scrollToInput(event.nativeEvent.target)}
              />
              {error ? <Text style={styles.errorText}>{error}</Text> : null}
            </View>

            <View style={styles.formAction}>
              <TouchableOpacity onPress={handleRecover} style={styles.btn}>
                <Text style={styles.btnText}>Enviar enlace</Text>
              </TouchableOpacity>
            </View>

            <TouchableOpacity onPress={() => navigation.navigate("Login")}>
              <Text style={styles.formLink}>
                ¿Recordaste tu contraseña?{" "}
                <Text style={{ textDecorationLine: "underline" }}>Inicia sesión</Text>
              </Text>
            </TouchableOpacity>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  backArrow: {
    marginTop: 50,
    marginBottom: 15,
  },
  headerCentered: {
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 20,
  },
  titleCentered: {
    fontSize: 28,
    fontWeight: "700",
    color: "#1D2A32",
    textAlign: "center",
    marginBottom: 4,
  },
  subtitle: {
    fontSize: 16,
    fontWeight: "500",
    color: "#929292",
    marginBottom: 15,
    textAlign: "center",
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
  errorText: {
    color: "#e63946",
    marginTop: 5,
    fontSize: 13,
    fontWeight: "500",
  },
  formAction: { marginTop: 10, marginBottom: 18 },
  btn: {
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 30,
    paddingVertical: 12,
    backgroundColor: "#075eec",
  },
  btnText: { fontSize: 18, fontWeight: "600", color: "#fff" },
  formLink: {
    fontSize: 16,
    fontWeight: "600",
    color: "#075eec",
    textAlign: "center",
    marginTop: 6,
  },
});

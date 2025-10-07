import { useNavigation } from "@react-navigation/native";
import React from "react";
import { StyleSheet, Text, View } from "react-native";

export default function ModalScreen() {
  const navigation = useNavigation();

  return (
    <View style={mStyles.container}>
      <View style={mStyles.headerLine}>
        <Text style={mStyles.arrowText}>▼</Text>
      </View>

      <View style={mStyles.card}>
        <Text style={mStyles.title}>About BMI</Text>
        <Text style={mStyles.text}>
          BMI (Body Mass Index) is a simple measure of body fat based on your
          weight and height.
          {"\n\n"}
          Formula:{" "}
          <Text style={mStyles.bold}>BMI = weight (kg) / height (m²)</Text>
        </Text>

        <View style={mStyles.divider} />

        <Text style={mStyles.subtitle}>BMI Categories:</Text>
        <View style={mStyles.categoryBox}>
          <Text style={mStyles.categoryText}>
            <Text style={mStyles.bold}>Underweight:</Text> Below 18.5
          </Text>
          <Text style={mStyles.categoryText}>
            <Text style={mStyles.bold}>Normal weight:</Text> 18.5 – 24.9
          </Text>
          <Text style={mStyles.categoryText}>
            <Text style={mStyles.bold}>Overweight:</Text> 25 – 29.9
          </Text>
          <Text style={mStyles.categoryText}>
            <Text style={mStyles.bold}>Obese (Class I):</Text> 30 – 34.9
          </Text>
          <Text style={mStyles.categoryText}>
            <Text style={mStyles.bold}>Obese (Class II):</Text> 35 – 39.9
          </Text>
        </View>
      </View>
    </View>
  );
}

const mStyles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "flex-start",
    alignItems: "center",
    backgroundColor: "#f9fafc",
    paddingTop: 60,
    paddingHorizontal: 20,
  },
  headerLine: {
    position: "absolute",
    top: 0,
    width: "100%",
    height: 40,
    backgroundColor: "#FA5080",
    alignItems: "center",
    justifyContent: "center",
    shadowColor: "#FA5080",
    shadowOpacity: 0.4,
    shadowRadius: 6,
    elevation: 3,
  },
  arrowText: {
    color: "#fff",
    fontSize: 28,
  },
  card: {
    backgroundColor: "#fff",
    borderRadius: 18,
    padding: 24,
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowRadius: 10,
    elevation: 6,
    width: "100%",
    marginTop: 50,
  },
  title: {
    fontSize: 24,
    fontWeight: "700",
    textAlign: "center",
    color: "#222",
    marginBottom: 12,
  },
  subtitle: {
    fontSize: 18,
    fontWeight: "600",
    color: "#333",
    marginBottom: 8,
  },
  text: {
    fontSize: 16,
    color: "#555",
    textAlign: "center",
    marginBottom: 16,
    lineHeight: 22,
  },
  divider: {
    height: 1,
    backgroundColor: "#eee",
    marginVertical: 12,
  },
  categoryBox: {
    backgroundColor: "#fff5fb",
    borderRadius: 12,
    padding: 16,
    marginBottom: 24,
  },
  categoryText: {
    fontSize: 15,
    color: "#444",
    marginBottom: 6,
  },
  bold: {
    fontWeight: "700",
  },
  button: {
    backgroundColor: "#FA5080",
    paddingVertical: 12,
    borderRadius: 10,
    alignItems: "center",
    shadowColor: "#FA5080",
    shadowOpacity: 0.3,
    shadowRadius: 4,
    elevation: 4,
  },
  buttonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "600",
  },
});

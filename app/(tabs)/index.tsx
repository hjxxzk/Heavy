import AsyncStorage from "@react-native-async-storage/async-storage";
import React, { useState } from "react";
import {
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import BmiEntry from "./Entry.types";

export default function HomeScreen() {
  const [weight, setWeight] = useState("");
  const [height, setHeight] = useState("");
  const [bmi, setBmi] = useState<string | null>(null);
  const [weightStatus, setWeightStatus] = useState("");

  const calculateBMI = async () => {
    if (weight && height) {
      const weightClean = weight.replace(",", ".");
      const heightClean = height.replace(",", ".");

      const w = Number(weightClean);
      const h = Number(heightClean);

      if (isNaN(w) || isNaN(h) || w <= 0 || h <= 0) {
        alert("Enter valid positive numbers for weight and height.");
        return;
      }

      const bmiValue = w / (h / 100) ** 2;
      setBmi(bmiValue.toFixed(1));

      switch (true) {
        case bmiValue < 18.5:
          setWeightStatus("underweight");
          break;
        case bmiValue >= 18.5 && bmiValue < 25:
          setWeightStatus("at a healthy weight.");
          break;
        case bmiValue >= 25 && bmiValue < 30:
          setWeightStatus("overweight");
          break;
        case bmiValue >= 30 && bmiValue < 35:
          setWeightStatus("obese (stage 1)");
          break;
        case bmiValue >= 35:
          setWeightStatus("obese (stage 2)");
          break;
        default:
          setWeightStatus("Error");
      }

      saveBmiData(w, h, bmiValue.toFixed(1));
    }
  };

  const saveBmiData = async (w: number, h: number, bmi: string) => {
    const currentDate = new Date().toISOString();
    const newEntry: BmiEntry = {
      weight: w,
      height: h,
      bmi: bmi,
      date: currentDate,
    };

    try {
      const existingData = await AsyncStorage.getItem("bmiData");
      let dataArray = existingData ? JSON.parse(existingData) : [];

      dataArray.push(newEntry);

      await AsyncStorage.setItem("bmiData", JSON.stringify(dataArray));
    } catch (error) {
      alert("Błąd podczas zapisywania danych:");
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.inputContainer}>
        <Text style={styles.text}>Enter weight (kg):</Text>
        <TextInput
          style={styles.input}
          value={weight}
          onChangeText={setWeight}
          keyboardType="numeric"
        />
      </View>
      <View style={styles.inputContainer}>
        <Text style={styles.text}>Enter height (cm):</Text>
        <TextInput
          style={styles.input}
          value={height}
          onChangeText={setHeight}
          keyboardType="numeric"
        />
      </View>
      <TouchableOpacity style={styles.button} onPress={calculateBMI}>
        <Text style={styles.buttonText}>Submit</Text>
      </TouchableOpacity>
      {bmi && (
        <View style={styles.resultContainer}>
          <Text style={styles.result}>
            Your BMI is: <Text style={styles.bmiValue}>{bmi}</Text>
          </Text>
          <Text style={styles.result}>
            You are: <Text style={styles.bmiValue}>{weightStatus}</Text>
          </Text>
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 30,
    paddingTop: 100,
    justifyContent: "flex-start",
    alignItems: "center",
    flex: 1,
    gap: 30,
  },
  inputContainer: {
    gap: 10,
  },
  input: {
    borderWidth: 1,
    borderColor: "#000",
    backgroundColor: "#FFFFFF",
    fontSize: 24,
    marginBottom: 10,
    padding: 8,
    width: 250,
    height: 65,
  },
  text: {
    fontSize: 16,
  },
  button: {
    backgroundColor: "#FA5080",
    justifyContent: "center",
    padding: 12,
    borderRadius: 5,
    marginTop: 10,
    marginBottom: 10,
    width: 170,
    height: 60,
  },
  buttonText: {
    color: "#fff",
    textAlign: "center",
    fontSize: 18,
  },
  resultContainer: {
    width: "80%",
    marginTop: 40,
    gap: 10,
    fontSize: 22,
    alignItems: "flex-start",
    justifyContent: "flex-start",
  },
  result: {
    fontSize: 22,
  },
  bmiValue: {
    color: "#f69",
    fontWeight: "bold",
    fontSize: 22,
  },
});

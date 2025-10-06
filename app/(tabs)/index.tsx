import AsyncStorage from "@react-native-async-storage/async-storage";
import { useFocusEffect } from "@react-navigation/native";
import React, { useCallback, useEffect, useState } from "react";
import {
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import BmiEntry from "./Entry.types";

const STORAGE_KEY = "bmiDataArray";

export default function HomeScreen() {
  const [weight, setWeight] = useState("");
  const [height, setHeight] = useState("");
  const [bmi, setBmi] = useState<string | null>(null);
  const [weightStatus, setWeightStatus] = useState("");
  const [alreadyStoredToday, setAlreadyStoredToday] = useState(false);

  const isSameDay = (isoA: string, isoB: string) => {
    const a = new Date(isoA);
    const b = new Date(isoB);
    return (
      a.getFullYear() === b.getFullYear() &&
      a.getMonth() === b.getMonth() &&
      a.getDate() === b.getDate()
    );
  };

  useFocusEffect(
    useCallback(() => {
      setBmi(null);
      setWeightStatus("");
    }, [])
  );

  useEffect(() => {
    const checkStored = async () => {
      try {
        const storedString = await AsyncStorage.getItem(STORAGE_KEY);
        const storedData: BmiEntry[] = storedString
          ? JSON.parse(storedString)
          : [];
        const todayIso = new Date().toISOString();
        const existsToday = storedData.some((entry) =>
          isSameDay(entry.date, todayIso)
        );
        setAlreadyStoredToday(existsToday);
      } catch (error) {
        console.error("Error reading storage", error);
      }
    };

    checkStored();
  }, []);

  const calculateBMI = useCallback(async () => {
    if (!weight || !height) {
      alert("Enter both weight and height.");
      return;
    }

    const weightClean = weight.replace(",", ".").trim();
    const heightClean = height.replace(",", ".").trim();

    const w = Number(weightClean);
    const h = Number(heightClean);

    if (isNaN(w) || isNaN(h) || w <= 0 || h <= 0) {
      alert("Enter valid positive numbers.");
      return;
    }

    const bmiValue = w / (h / 100) ** 2;
    const bmiStr = bmiValue.toFixed(1);
    setBmi(bmiStr);

    if (bmiValue < 18.5) setWeightStatus("underweight");
    else if (bmiValue < 25) setWeightStatus("at a healthy weight.");
    else if (bmiValue < 30) setWeightStatus("overweight");
    else if (bmiValue < 35) setWeightStatus("obese (stage 1)");
    else setWeightStatus("obese (stage 2)");

    try {
      const storedString = await AsyncStorage.getItem(STORAGE_KEY);
      const storedData: BmiEntry[] = storedString
        ? JSON.parse(storedString)
        : [];

      const todayIso = new Date().toISOString();
      if (storedData.some((entry) => isSameDay(entry.date, todayIso))) {
        setAlreadyStoredToday(true);
        return;
      }

      const newEntry: BmiEntry = {
        weight: w,
        height: h,
        bmi: parseFloat(bmiStr),
        date: todayIso,
      };

      storedData.push(newEntry);
      await AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(storedData));
      setAlreadyStoredToday(true);
    } catch (error) {
      alert("Error saving data");
    }
  }, [weight, height]);

  return (
    <View style={styles.container}>
      {!alreadyStoredToday ? (
        <>
          <View style={styles.inputContainer}>
            <Text style={styles.text}>Enter weight (kg):</Text>
            <TextInput
              style={styles.input}
              value={weight}
              onChangeText={setWeight}
              keyboardType="decimal-pad"
            />
          </View>

          <View style={styles.inputContainer}>
            <Text style={styles.text}>Enter height (cm):</Text>
            <TextInput
              style={styles.input}
              value={height}
              onChangeText={setHeight}
              keyboardType="decimal-pad"
            />
          </View>

          <TouchableOpacity style={styles.button} onPress={calculateBMI}>
            <Text style={styles.buttonText}>Submit</Text>
          </TouchableOpacity>
        </>
      ) : (
        <>
          <Text style={styles.result}>Today's data already entered.</Text>
          <Text style={styles.result}>Come back tomorrow!</Text>
        </>
      )}

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

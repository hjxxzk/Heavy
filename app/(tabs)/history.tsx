import AsyncStorage from "@react-native-async-storage/async-storage";
import React, { useEffect, useState } from "react";
import {
  Modal,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import BmiEntry from "./Entry.types";

export default function HistoryScreen() {
  const [data, setData] = useState<BmiEntry[]>([]);

  const [modalVisible, setModalVisible] = useState(false);
  const [selectedIndex, setSelectedIndex] = useState<number | null>(null);
  const [editWeight, setEditWeight] = useState("");

  // helper to color BMI cell
  const getBMIColor = (bmi: number) => {
    if (bmi < 18.5) return "#4ea8ff"; // underweight
    if (bmi < 25) return "#4cff7a"; // normal
    if (bmi < 30) return "#ffe84c"; // overweight
    if (bmi < 35) return "#ff6906"; // obese type 1
    return "#f71717"; // obese type 2
  };

  const openModal = (index: number) => {
    setSelectedIndex(index);
    setEditWeight(data[index].weight.toString());
    setModalVisible(true);
  };

  const HEIGHT = 1.7; // Hard coded

  const handleEdit = () => {
    if (selectedIndex === null) return;
    const newData = [...data];
    const newWeight = parseFloat(editWeight);
    newData[selectedIndex].weight = newWeight;
    // Recalculate BMI
    newData[selectedIndex].bmi = parseFloat(
      (newWeight / (HEIGHT * HEIGHT)).toFixed(1)
    );
    setData(newData);
    saveDataToStorage(newData);
    setModalVisible(false);
  };

  const handleDelete = () => {
    if (selectedIndex === null) return;
    const newData = data.filter((_, i) => i !== selectedIndex);
    setData(newData);
    saveDataToStorage(newData);
    setModalVisible(false);
  };

  // Save updated data array to AsyncStorage
  const saveDataToStorage = async (newData: typeof data) => {
    try {
      await AsyncStorage.setItem("bmiDataArray", JSON.stringify(newData));
    } catch (error) {
      console.error("Error saving data", error);
    }
  };

  // Load data from AsyncStorage on mount
  useEffect(() => {
    const loadData = async () => {
      try {
        const storedDataString = await AsyncStorage.getItem("bmiDataArray");
        if (storedDataString) {
          const storedData = JSON.parse(storedDataString);
          setData(storedData);
        }
      } catch (error) {
        console.error("Error loading data", error);
      }
    };
    loadData();
  }, []);

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <View style={styles.table}>
        {/* Header */}
        <View style={[styles.row, styles.headerRow]}>
          <Text style={[styles.cell, styles.headerText]}>Date</Text>
          <Text style={[styles.cell, styles.headerText]}>Weight</Text>
          <Text style={[styles.cell, styles.headerText]}>BMI</Text>
        </View>

        {/* Rows */}
        {data.map((item, index) => (
          <View key={index} style={styles.row}>
            <Text style={styles.cell}>
              {new Date(item.date).toLocaleDateString()}
            </Text>

            <TouchableOpacity
              style={styles.cell}
              onPress={() => openModal(index)}
            >
              <Text>{item.weight.toFixed(1)}</Text>
            </TouchableOpacity>

            <View
              style={[styles.cell, { backgroundColor: getBMIColor(item.bmi) }]}
            >
              <Text style={styles.bmiText}>{item.bmi.toFixed(1)}</Text>
            </View>
          </View>
        ))}
      </View>

      {/* Modal code remains unchanged */}
      <Modal
        visible={modalVisible}
        transparent
        animationType="fade"
        onRequestClose={() => setModalVisible(false)}
      >
        <View style={styles.modalOverlay}>
          <View style={styles.modalBox}>
            <Text style={styles.modalTitle}>Edit</Text>

            <TextInput
              style={styles.input}
              value={editWeight}
              onChangeText={setEditWeight}
              keyboardType="numeric"
            />

            <View style={styles.buttonRow}>
              <Pressable
                style={[styles.button, styles.deleteBtn]}
                onPress={handleDelete}
              >
                <Text style={styles.deleteText}>Delete</Text>
              </Pressable>

              <Pressable
                style={[styles.button, styles.editBtn]}
                onPress={handleEdit}
              >
                <Text style={styles.editText}>Edit</Text>
              </Pressable>
            </View>

            <Pressable
              style={styles.closeButton}
              onPress={() => setModalVisible(false)}
            >
              <Text style={styles.closeText}>×</Text>
            </Pressable>
          </View>
        </View>
      </Modal>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingTop: 30,
    paddingHorizontal: 40,
    backgroundColor: "#fff",
    flexGrow: 1,
  },
  table: {
    borderTopWidth: 1,
    borderLeftWidth: 1,
    borderColor: "#000",
  },
  row: {
    flexDirection: "row",
    borderBottomWidth: 1,
    borderColor: "#000",
  },
  cell: {
    flex: 1,
    textAlign: "center",
    paddingVertical: 24,
    borderRightWidth: 1,
    borderColor: "#000",
    justifyContent: "center",
    alignItems: "center",
  },
  headerRow: {
    backgroundColor: "#f4f4f4",
  },
  headerText: {
    fontWeight: "bold",
  },
  bmiText: {
    color: "#000",
    fontWeight: "600",
    textAlign: "center",
  },
  modalOverlay: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0,0,0,0.3)",
  },
  modalBox: {
    backgroundColor: "#fff",
    borderRadius: 10,
    padding: 20,
    width: 250,
    alignItems: "center",
    elevation: 4,
    borderWidth: 1,
  },
  modalTitle: {
    fontSize: 22,
    fontWeight: "600",
    marginBottom: 15,
  },
  input: {
    borderWidth: 1,
    borderColor: "#000",
    width: "80%",
    padding: 8,
    textAlign: "center",
    fontSize: 16,
    marginBottom: 20,
  },
  buttonRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    width: "80%",
  },
  button: {
    flex: 1,
    paddingVertical: 10,
    marginHorizontal: 5,
    borderRadius: 6,
    alignItems: "center",
    borderWidth: 1,
  },
  deleteBtn: {
    borderColor: "#d33",
  },
  deleteText: {
    color: "#d33",
    fontWeight: "600",
  },
  editBtn: {
    backgroundColor: "#e94f6e",
    borderColor: "#e94f6e",
  },
  editText: {
    color: "#fff",
    fontWeight: "600",
  },
  closeButton: {
    position: "absolute",
    top: 8,
    right: 10,
  },
  closeText: {
    fontSize: 26,
    color: "#333",
  },
});

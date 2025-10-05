import AsyncStorage from "@react-native-async-storage/async-storage";
import React, { useEffect, useState } from "react";
import {
  Dimensions,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { LineChart } from "react-native-chart-kit";
import BmiEntry from "./Entry.types";

const screenWidth = Dimensions.get("window").width;

export default function WeightChart() {
  const [entries, setEntries] = useState<BmiEntry[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      const stored = await AsyncStorage.getItem("bmiData");
      const data: BmiEntry[] = stored ? JSON.parse(stored) : [];

      const dataWithFormattedDates = data.map((entry: BmiEntry) => {
        const dateObj = new Date(entry.date);
        const day = dateObj.getDate().toString().padStart(2, "0");
        const month = (dateObj.getMonth() + 1).toString().padStart(2, "0");
        const year = dateObj.getFullYear();

        return {
          ...entry,
          date: `${day}.${month}.${year}`,
        };
      });

      setEntries(
        Array.isArray(dataWithFormattedDates) ? dataWithFormattedDates : []
      );
    };
    fetchData();
  }, []);

  const [startIndex, setStartIndex] = useState<number>(0);

  useEffect(() => {
    if (entries.length > 0) {
      const newStartIndex =
        entries.length > windowSize ? entries.length - windowSize : 0;
      setStartIndex(newStartIndex);
    }
  }, [entries]);

  const windowSize = 5;

  const endIndex = startIndex + windowSize;
  const displayEntries = entries.slice(startIndex, endIndex);

  const labels = displayEntries.map((e) => e.date);
  const weights = displayEntries.map((e) => e.weight);

  const scrollLeft = () => {
    setStartIndex((prev) => Math.max(prev - 1, 0));
  };

  const scrollRight = () => {
    setStartIndex((prev) =>
      Math.min(prev + 1, Math.max(entries.length - windowSize, 0))
    );
  };

  return (
    <View style={styles.container}>
      <ScrollView horizontal>
        <LineChart
          data={{
            labels: labels,
            datasets: [{ data: weights }],
          }}
          width={screenWidth * 0.95}
          height={350}
          yAxisSuffix=" kg"
          chartConfig={{
            backgroundColor: "#fff",
            backgroundGradientFrom: "#fff",
            backgroundGradientTo: "#fff",
            decimalPlaces: 1,
            color: (opacity = 1) => `rgba(246,105,153,${opacity})`,
            labelColor: (opacity = 1) => `#666`,
          }}
          bezier
          style={styles.chart}
        />
      </ScrollView>

      <View style={styles.buttonsContainer}>
        <TouchableOpacity onPress={scrollLeft} style={styles.arrowButton}>
          <Text style={styles.arrowText}>◀</Text>
        </TouchableOpacity>

        <TouchableOpacity onPress={scrollRight} style={styles.arrowButton}>
          <Text style={styles.arrowText}>▶</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "flex-start",
    alignItems: "center",
    backgroundColor: "#fff",
  },
  chart: {
    marginTop: 16,
    borderRadius: 12,
    alignSelf: "center",
  },
  buttonsContainer: {
    flexDirection: "row",
    width: "90%",
    justifyContent: "space-between",
    marginBottom: 20,
  },
  arrowButton: {
    marginHorizontal: 20,
    backgroundColor: "#f69",
    paddingVertical: 7,
    paddingHorizontal: 10,
    borderRadius: 8,
  },
  arrowText: {
    color: "#fff",
    fontSize: 16,
  },
});

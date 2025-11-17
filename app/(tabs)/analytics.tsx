import {StyleSheet, ScrollView, View, Text, Dimensions} from 'react-native';
import { BarChart, PieChart } from "react-native-chart-kit";

const { width } = Dimensions.get("window");
const CHART_WIDTH = width - 40;

export default function Analytics() {

  const chartConfig = {
    backgroundGradientFrom: "#fff",
    backgroundGradientTo: "#fff",
    color: (opacity = 1) => `rgba(17,24,39,${opacity})`,
    labelColor: (opacity = 1) => `rgba(17,24,39,${opacity})`,
    barPercentage: 0.80,
  };

  return(
    <ScrollView
      showsVerticalScrollIndicator={false}
      style={styles.container}
    >
      <View style={styles.card}>
        <Text style={styles.title}>Income vs Expenses</Text>
        <BarChart
          data={{
            labels: ["Jan", "Feb", "Mar", "Apr", "May", "Jun"],
            datasets: [{
              data: [23, 43, 24, 24, 35, 24],
              color: () => "#10B981"
            }]
          }}
          fromZero
          width={CHART_WIDTH}
          height={220}
          chartConfig={chartConfig}
        />
        {/*<PieChart*/}
        {/*  data={{*/}
        {/*    datasets: [{*/}
        {/*      data: [23, 43, 24, 24, 35, 24],*/}
        {/*      color: () => "#10B981"*/}
        {/*    }]*/}
        {/*  }}*/}
        {/*  width={CHART_WIDTH}*/}
        {/*  height={220}*/}
        {/*  accessor={"population"}*/}
        {/*  backgroundColor={"transparent"}*/}
        {/*  paddingLeft={"16"}*/}
        {/*  absolute*/}
        {/*/>*/}
      </View>
    </ScrollView>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16
  },
  card: {
    backgroundColor: "#fff",
    borderRadius: 16,
    padding: 12,
    marginBottom: 12,
  },
  title: {
    fontSize: 18,
    fontWeight: "700",
    marginBottom: 18
  }
});
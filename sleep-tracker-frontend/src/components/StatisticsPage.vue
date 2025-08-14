<template>
  <div class="container">
    <h2>📊 Sleep Statistics</h2>
    <canvas id="sleepChart"></canvas>

    <button @click="$router.push('/sleep-entry')">🔙 Back</button>
  </div>
</template>

<script>
import { Chart, registerables } from 'chart.js';
import axios from "axios";

// important: register chart modules
Chart.register(...registerables);

export default {
  name: "StatisticsPage",
  data() {
    return {
      chart: null,
    };
  },
  async mounted() {
    try {
      const res = await axios.get("http://localhost:5000/api/sleep", {
        withCredentials: true,
      });

      const entries = res.data;

      if (!entries.length) {
        alert("No sleep data found.");
        return;
      }

      const labels = entries.map(entry => entry.date);
      const durations = entries.map(entry => entry.duration);

      const ctx = document.getElementById("sleepChart").getContext("2d");
      this.chart = new Chart(ctx, {
        type: "bar",
        data: {
          labels,
          datasets: [{
            label: "Sleep Duration (hours)",
            data: durations,
            backgroundColor: "#4CAF50",
            borderRadius: 10,
          }],
        },
        options: {
          responsive: true,
          plugins: {
            legend: {
              display: true,
            },
          },
          scales: {
            y: {
              beginAtZero: true,
              title: {
                display: true,
                text: "Hours Slept"
              }
            },
          },
        },
      });

    } catch (err) {
      console.error("Chart load error:", err);
      alert("Failed to load statistics.");
    }
  },
};
</script>

<style scoped>
.container {
  padding: 60px;
  text-align: center;
}
canvas {
  max-width: 900px;
  margin: 50px auto;
}
button {
  margin-top: 60px;
  padding: 10px 20px;
  background: #1976d2;
  color: white;
  border: none;
  border-radius: 18px;
  cursor: pointer;
}
</style>

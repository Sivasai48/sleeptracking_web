<template>
  <div class="container">
    <h1>🛌 Sleep Tracker</h1>
    <button @click="logout">Logout</button>

    <form @submit.prevent="addEntry">
      <input type="date" v-model="form.date" required />
      <input type="time" v-model="form.sleepTime" required />
      <input type="time" v-model="form.wakeTime" required />
      <button type="submit">Add Entry</button>
    </form>

    <div v-if="entries.length">
      <h3>🗂 Sleep Entries</h3>
      <ul>
        <li v-for="entry in entries" :key="entry._id">
          {{ entry.date }}: {{ entry.sleepTime }} - {{ entry.wakeTime }} ({{ entry.duration.toFixed(2) }} hrs)
          <button @click="deleteEntry(entry._id)">Delete</button>
        </li>
      </ul>
    </div>

    <div v-if="entries.length" class="dashboard">
      <h3>📊 Sleep Summary</h3>
      <p>Total Days Tracked: {{ entries.length }}</p>
      <p>Average Sleep Duration: {{ averageSleep.toFixed(2) }} hrs</p>
    </div>

    <button @click="$router.push('/statistics')">📊 View Statistics</button>
  </div>
</template>

<script>
import axios from "axios";
axios.defaults.withCredentials = true;

export default {
  name: "SleepEntryPage",
  data() {
    return {
      form: {
        date: "",
        sleepTime: "",
        wakeTime: ""
      },
      entries: [],
      averageSleep: 0,
    };
  },
  methods: {
    async fetchEntries() {
      try {
        const res = await axios.get("http://localhost:5000/api/sleep");
        this.entries = res.data;
        this.calculateAverage();
      } catch (err) {
        console.error("❌ Error fetching entries:", err);
        this.$router.push("/login"); // Redirect to login if session expired
      }
    },
    async addEntry() {
      const duration = this.calculateDuration(this.form.sleepTime, this.form.wakeTime);
      const data = { ...this.form, duration };
      try {
        await axios.post("http://localhost:5000/api/sleep", data);
        this.form = { date: "", sleepTime: "", wakeTime: "" };
        this.fetchEntries();
      } catch (err) {
        console.error("❌ Error adding entry:", err);
      }
    },
    async deleteEntry(id) {
      try {
        await axios.delete(`http://localhost:5000/api/sleep/${id}`);
        this.fetchEntries();
      } catch (err) {
        console.error("❌ Error deleting entry:", err);
      }
    },
    calculateDuration(sleep, wake) {
      const [sh, sm] = sleep.split(":").map(Number);
      const [wh, wm] = wake.split(":").map(Number);
      let start = sh * 60 + sm;
      let end = wh * 60 + wm;
      if (end <= start) end += 24 * 60;
      return (end - start) / 60;
    },
    calculateAverage() {
      if (this.entries.length === 0) {
        this.averageSleep = 0;
        return;
      }
      const total = this.entries.reduce((sum, entry) => sum + entry.duration, 0);
      this.averageSleep = total / this.entries.length;
    },
    async logout() {
      await axios.post("http://localhost:5000/api/auth/logout");
      localStorage.removeItem("userId");
      this.$router.push("/login");
    }
  },
  mounted() {
    if (!localStorage.getItem("userId")) {
      this.$router.push("/login");
    } else {
      this.fetchEntries();
    }
  }
};
</script>

<style scoped>
.container {
  max-width: 500px;
  margin: auto;
  text-align: center;
}
input {
  display: block;
  margin: 10px auto;
}
button {
  margin: 5px;
}
.dashboard {
  margin-top: 20px;
  padding: 10px;
  background-color: #eef;
  border-radius: 8px;
}
</style>

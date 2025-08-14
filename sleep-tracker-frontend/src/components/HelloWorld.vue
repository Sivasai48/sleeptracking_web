<template>
  <div class="container">
    <h1>🛌 Sleep Tracker</h1>
    
    <button @click="logout" class="logout-btn">Logout</button>

    <form @submit.prevent="addEntry">
      <input type="date" v-model="form.date" required />
      <input type="time" v-model="form.sleepTime" required />
      <input type="time" v-model="form.wakeTime" required />
      <button type="submit">Add Entry</button>
    </form>

    <ul v-if="entries.length">
      <li v-for="entry in entries" :key="entry._id">
        {{ entry.date }}: {{ entry.sleepTime }} - {{ entry.wakeTime }} ({{ entry.duration.toFixed(2) }} hrs)
        <button @click="deleteEntry(entry._id)">Delete</button>
      </li>
    </ul>
  </div>
</template>

<script>
import axios from "axios";

export default {
  data() {
    return {
      form: {
        date: "",
        sleepTime: "",
        wakeTime: ""
      },
      entries: []
    };
  },
  methods: {
    async fetchEntries() {
      try {
        const res = await axios.get("http://localhost:5000/api/sleep", {
          withCredentials: true,
        });
        this.entries = res.data;
      } catch (err) {
        console.error("❌ Error fetching entries:", err);
        if (err.response && err.response.status === 401) {
          this.$router.push("/login");
        }
      }
    },
    async logout() {
      try {
        await axios.post("http://localhost:5000/api/auth/logout", {}, {
          withCredentials: true,
        });
        localStorage.removeItem("token");
        this.$router.push("/login");
      } catch (err) {
        console.error("❌ Logout error:", err);
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
    async addEntry() {
      const duration = this.calculateDuration(this.form.sleepTime, this.form.wakeTime);
      const data = { ...this.form, duration };
      try {
        await axios.post("http://localhost:5000/api/sleep", data, {
          withCredentials: true,
        });
        this.form = { date: "", sleepTime: "", wakeTime: "" };
        this.fetchEntries();
      } catch (err) {
        console.error("❌ Error adding entry:", err);
        if (err.response && err.response.status === 401) {
          this.$router.push("/login");
        }
      }
    },
    async deleteEntry(id) {
      try {
        await axios.delete(`http://localhost:5000/api/sleep/${id}`, {
          withCredentials: true,
        });
        this.fetchEntries();
      } catch (err) {
        console.error("❌ Error deleting entry:", err);
      }
    }
  },
  mounted() {
    this.fetchEntries();
  }
};
</script>

<style scoped>
.container {
  max-width: 600px;
  margin: 30px auto;
  padding: 20px;
  text-align: center;
  border: 1px solid #eee;
  border-radius: 8px;
  box-shadow: 0 2px 10px rgba(0,0,0,0.1);
  background-color: #fff;
}

input, button {
  display: block;
  margin: 10px auto;
  padding: 10px;
  width: 80%;
  max-width: 300px;
}

.logout-btn {
  background-color: crimson;
  color: white;
  border: none;
  padding: 10px 16px;
  border-radius: 5px;
  margin-bottom: 20px;
  cursor: pointer;
}
</style>

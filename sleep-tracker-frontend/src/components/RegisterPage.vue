<template>
  <div class="auth-container">
    <h2>Register</h2>
    <form @submit.prevent="register">
      <input type="text" v-model="username" placeholder="Username" required />
      <input type="password" v-model="password" placeholder="Password" required />
      <button type="submit">Register</button>
    </form>
    <p>Already have an account? <router-link to="/login">Login</router-link></p>
  </div>
</template>

<script>
import axios from "axios";

// Send cookies with every request (needed for session auth)
axios.defaults.withCredentials = true;

export default {
  name: "RegisterPage",
  data() {
    return {
      username: "",
      password: "",
    };
  },
  methods: {
    async register() {
      try {
        // ✅ Corrected endpoint: /register not /signup
        await axios.post("http://localhost:5000/api/auth/register", {
          username: this.username,
          password: this.password,
        });

        // 🔁 After registration, redirect to login
        this.$router.push("/login");
      } catch (err) {
        alert("Registration failed. Please try again.");
        console.error("Register error:", err);
      }
    },
  },
};
</script>

<style scoped>
.auth-container {
  max-width: 400px;
  margin: 50px auto;
  padding: 20px;
  border: 1px solid #ddd;
  border-radius: 8px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
  background-color: #fff;
  text-align: center;
}
input {
  display: block;
  width: 100%;
  padding: 10px;
  margin: 10px 0;
}
button {
  padding: 10px 20px;
  cursor: pointer;
}
</style>
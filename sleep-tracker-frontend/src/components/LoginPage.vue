<template>
  <div class="auth-container">
    <h2>Login</h2>
    <form @submit.prevent="login">
      <input type="text" v-model="username" placeholder="Username" required />
      <input type="password" v-model="password" placeholder="Password" required />
      <button type="submit">Login</button>
    </form>
    <p>Don't have an account ? <router-link to="/register">Register</router-link></p>
  </div>
</template>

<script>
import axios from "axios";

axios.defaults.withCredentials = true;

export default {
  name: "LoginPage",
  data() {
    return {
      username: "",
      password: "",
    };
  },
  methods: {
    async login() {
      try {
        const res = await axios.post("http://localhost:5000/api/auth/login", {
          username: this.username,
          password: this.password,
        });

        // Store userId in localStorage to keep session info
        localStorage.setItem("userId", res.data.userId);

        // ✅ Redirect to sleep-entry after login
        this.$router.push("/sleep-entry");
      } catch (err) {
        alert("Login failed: Invalid username or password");
        console.error("Login error:", err);
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
  background: #fff;
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

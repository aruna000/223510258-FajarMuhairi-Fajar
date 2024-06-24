<template>
  <nav class="navbar">
    <ul>
      <li><button @click="$emit('show-todos')">Todos</button></li>
      <li><button @click="$emit('show-posts')">Post</button></li>
      <li><button @click="$emit('show-albums')">Albums</button></li>
    </ul>
  </nav>
</template>

<script>
export default {
  name: "Navbar",
};
</script>

<style scoped>
.navbar {
  text-align: center;
  margin-bottom: 20px;
}

.navbar ul {
  list-style: none;
}

.navbar ul li {
  display: inline;
  margin-right: 10px;
}

.navbar ul li button {
  background-color: #08104d;
  cursor: pointer;
  font-size: 18px;
  color: #ffffff;
  padding: 10px 20px;
  border-radius: 5px;
  transition: color 0.3s ease;
  border: none;
}

.navbar ul li button:hover {
  background-color: #060d41;
}
</style>

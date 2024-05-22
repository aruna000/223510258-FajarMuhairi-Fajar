<template>
  <div>
    <header>
      <Navbar @show-todos="showTodos" @show-posts="showPosts" />
    </header>
    <div v-if="activeMenu === 'todos'" class="menu-container">
      <link
        rel="stylesheet"
        href="https://unicons.iconscout.com/release/v4.0.0/css/line.css"
      />
      <Todos
        :todos="todos"
        :newTodo="newTodo"
        :hideCompleted="hideCompleted"
        :pesan="pesan"
        @update:newTodo="updateNewTodo"
        @add-todo="addTodo"
        @update-todo="updateTodo"
        @remove-todo="removeTodo"
        @clear-all-todos="clearAllTodos"
        @toggle-hide-completed="toggleHideCompleted"
      />
    </div>
    <div v-else-if="activeMenu === 'posts'" class="menu-container">
      <Posts
        :users="users"
        :posts="posts"
        :selectedUser="selectedUser"
        @update:selectedUser="updateSelectedUser"
      />
    </div>
    <div v-else></div>
  </div>
</template>

<script>
import Navbar from "./components/Navbar.vue";
import Todos from "./components/Todos.vue";
import Posts from "./components/Posts.vue";

export default {
  components: {
    Navbar,
    Todos,
    Posts,
  },
  data() {
    return {
      users: [],
      posts: [],
      activeMenu: "",
      selectedUser: null,
      newTodo: "",
      hideCompleted: false,
      todos: [{ id: 0, text: "Tugas PBK", done: true }],
      pesan: "",
    };
  },
  methods: {
    async fetchUsers() {
      try {
        const response = await fetch(
          `https://jsonplaceholder.typicode.com/users`
        );
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        const json = await response.json();
        this.users = json;
      } catch (error) {
        console.error("Error fetching users data:", error);
      }
    },
    async fetchPosts() {
      try {
        const response = await fetch(
          `https://jsonplaceholder.typicode.com/posts`
        );
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        const json = await response.json();
        this.posts = json;
      } catch (error) {
        console.error("Error fetching posts data:", error);
      }
    },
    showTodos() {
      this.activeMenu = "todos";
    },
    showPosts() {
      this.activeMenu = "posts";
      this.fetchPosts();
    },
    addTodo() {
      if (this.newTodo.trim() !== "") {
        this.todos.push({
          id: this.todos.length,
          text: this.newTodo,
          done: false,
        });
        this.newTodo = "";
      }
    },
    updateTodo() {},
    removeTodo(todo) {
      this.todos = this.todos.filter((t) => t.id !== todo.id);
    },
    clearAllTodos() {
      this.todos = [];
    },
    toggleHideCompleted() {
      this.hideCompleted = !this.hideCompleted;
    },
    updateSelectedUser(newSelectedUser) {
      this.selectedUser = newSelectedUser;
    },
    updateNewTodo(newNewTodo) {
      this.newTodo = newNewTodo;
    },
  },
  mounted() {
    this.fetchUsers();
  },
};
</script>

<style scoped>
@import url("https://fonts.googleapis.com/css2?family=Poppins:wght@300;400;500;600&display=swap");

* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
  font-family: "Poppins", sans-serif;
}

html {
  min-height: 100%;
}

body {
  background-image: url("https://source.unsplash.com/random/1920x1080");
  background-repeat: no-repeat;
  background-size: cover;
  background-position: center center;
  height: 100vh;
  margin: 0;
  padding: 0;
  background-attachment: fixed;
}

.menu-container {
  border: 0px solid white;
  border-radius: 5px;
  padding: 20px;
  margin: 20px auto;
  max-width: 480px;
  background-color: rgba(255, 255, 255, 0.5);
}
</style>

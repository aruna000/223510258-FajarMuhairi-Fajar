<template>
  <div>
    <div id="app">
      <Navbar
        @show-todos="navigateTo('todos')"
        @show-posts="navigateTo('posts')"
        @show-albums="navigateTo('albums')"
      />
      <router-view />
    </div>
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
    <div v-else-if="activeMenu === 'albums'" class="menu-container">
      <Albums
        :albums="albums"
        :loading="loading"
        :selectedAlbum="selectedAlbum"
        :photos="photos"
        :selectedPhoto="selectedPhoto"
        @fetch-album-photos="fetchAlbumPhotos"
        @fetch-album="fetchAlbum"
      ></Albums>
    </div>
  </div>
  <footer class="footer">
    <div class="footer-content">
      <p>&copy; 2024 Fajar. All rights reserved.</p>
    </div>
  </footer>
</template>

<script>
import Navbar from "./components/Navbar.vue";
import Todos from "./components/Todos.vue";
import Posts from "./components/Posts.vue";
import Albums from "./components/Albums.vue";
import { createRouter, createWebHistory } from "vue-router";

const router = createRouter({
  history: createWebHistory(),
  routes: [
    { path: "/", redirect: "/todos" },
    { path: "/todos", component: Todos },
    { path: "/posts", component: Posts },
    {
      path: "/albums",
      component: Albums,
      children: [{ path: ":id", component: Albums }],
    },
  ],
});

export default {
  components: {
    Navbar,
    Todos,
    Posts,
    Albums,
  },
  data() {
    return {
      users: [],
      posts: [],
      activeMenu: "todos", // Active menu state
      selectedUser: null,
      newTodo: "",
      hideCompleted: false,
      todos: [],
      pesan: "",
      albums: [], // Albums data
      loading: true, // Loading state
      photos: [],
      selectedAlbum: null,
      selectedPhoto: null,
    };
  },
  methods: {
    navigateTo(menu) {
      this.activeMenu = menu;
      router.push(menu);
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
    async fetchAlbumPhotos(id) {
      this.loading = true;
      try {
        const response = await fetch(
          `https://jsonplaceholder.typicode.com/albums/${id}/photos`
        );
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        const json = await response.json();
        this.photos = json;
      } catch (error) {
        console.error("Error fetching photos:", error);
      } finally {
        this.loading = false;
      }
    },
    async fetchAlbum(id) {
      this.loading = true;
      try {
        const response = await fetch(
          `https://jsonplaceholder.typicode.com/albums/${id}`
        );
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        const json = await response.json();
        this.selectedAlbum = json;
      } catch (error) {
        console.error("Error fetching album:", error);
      } finally {
        this.loading = false;
      }
    },
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
    async fetchAlbums() {
      this.loading = true;
      try {
        const response = await fetch(
          `https://jsonplaceholder.typicode.com/albums`
        );
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        const json = await response.json();
        this.albums = json;
      } catch (error) {
        console.error("Error fetching albums:", error);
      } finally {
        this.loading = false;
      }
    },
  },
  mounted() {
    if (this.$route.path !== "/") {
      router.push("/home");
    }
    this.fetchUsers();
    this.fetchPosts();
    this.fetchAlbums();
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

footer {
  background-color: transparent;
  color: var(--color-text);
  padding: 2px 0;
  text-align: center;
  margin-top: 1px;
  border-top: 1px solid var(--color-border);
  width: 100%;
  position: fixed;
  bottom: 0;
}

.footer-content {
  max-width: 480px;
  margin: 0 auto;
  padding: 1px;
}

.footer-content p {
  margin: 3px 0;
  font-size: 12px;
  color: rgba(255, 255, 255, 0.212);
}
</style>

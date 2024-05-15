<template>
  <div>
    <header>
      <nav class="navbar">
        <ul>
          <li><button @click="showTodos">Todos</button></li>
          <li><button @click="showPosts">Post</button></li>
        </ul>
      </nav>
    </header>
    <div v-if="activeMenu === 'todos'" class="menu-container">
      <link
        rel="stylesheet"
        href="https://unicons.iconscout.com/release/v4.0.0/css/line.css"
      />
      <div class="container">
        <!-- Container utama untuk aplikasi todo -->
        <form @submit.prevent="addTodo" class="input-field">
          <!-- Form untuk menambahkan todo baru -->
          <input
            v-model="newTodo"
            required
            placeholder="new todo"
            class="input-text"
          />
          <!-- Input teks untuk todo baru -->
          <button type="submit" class="todo-button">
            <i class="uil uil-notes note-icon"></i>
          </button>
          <!-- Tombol untuk menambahkan todo -->
        </form>

        <ul class="todoLists">
          <!-- Daftar todo -->
          <li v-for="todo in filteredTodos" :key="todo.id" class="list">
            <!-- Loop untuk menampilkan todo -->
            <input type="checkbox" v-model="todo.done" />
            <!-- Kotak centang untuk menandai todo selesai -->
            <span :class="{ done: todo.done }">{{ todo.text }}</span>
            <!-- Teks todo, garis bawah jika selesai -->
            <button @click="removeTodo(todo)" class="delete-button">
              <i class="uil uil-trash"></i>
            </button>
            <!-- Tombol untuk menghapus todo -->
          </li>
        </ul>

        <div class="pending-tasks">
          <span>{{ remainingTodos }} tasks remaining</span>
          <button @click="clearAllTodos" class="clear-button">Clear All</button>
          <!-- Tombol untuk menghapus semua todo -->
        </div>

        <button
          @click="hideCompleted = !hideCompleted"
          class="toggle-completed"
        >
          <!-- Tombol untuk menyembunyikan/menampilkan todo yang selesai -->
          {{ hideCompleted ? "Show all" : "Hide completed" }}
          <!-- Teks tombol sesuai status -->
        </button>

        <p>{{ pesan }}</p>
      </div>
    </div>
    <div v-else-if="activeMenu === 'posts'" class="menu-container">
      <h2>Fitur Postingan</h2>
      <select v-model="selectedUser">
        <option v-for="user in users" :key="user.id" :value="user.id">
          {{ user.name }}
        </option>
      </select>
      <div v-if="posts.length > 0">
        <h3>Postingan oleh {{ selectedUserName }}</h3>
        <ul>
          <li v-for="post in filteredPosts" :key="post.id">
            {{ post.title }}
          </li>
        </ul>
      </div>
      <div v-else>
        <p>Tidak ada postingan untuk pengguna ini.</p>
      </div>
    </div>
    <div v-else></div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      users: [],
      posts: [],
      activeMenu: "",
      selectedUser: null,
      newTodo: "",
      hideCompleted: false,
      todos: [{ id: 0, text: "Tugas Prak PBK", done: true }],
    };
  },
  computed: {
    selectedUserName() {
      const user = this.users.find((u) => u.id === this.selectedUser);
      return user ? user.name : "";
    },
    filteredTodos() {
      return this.hideCompleted
        ? this.todos.filter((t) => !t.done)
        : this.todos;
    },
    remainingTodos() {
      return this.todos.filter((todo) => !todo.done).length;
    },
    filteredPosts() {
      return this.posts.filter((post) => post.userId === this.selectedUser);
    },
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
      this.fetchPosts(); // Panggil metode fetchPosts() ketika tombol "Post" diklik
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
    removeTodo(todo) {
      this.todos = this.todos.filter((t) => t.id !== todo.id);
    },
    clearAllTodos() {
      this.todos = [];
    },
  },
  mounted() {
    this.fetchUsers();
  },
};
</script>

<style scoped>
/* Google Fonts - Poppins */
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
  background-image: url("https://source.unsplash.com/random/1920x1080"); /* Example background image */
  background-repeat: no-repeat;
  background-size: cover;
  background-position: center center;
  height: 100vh;
  margin: 0;
  padding: 0;
  background-attachment: fixed;
}

.menu-container {
  border: 1px solid #ffffffea;
  border-radius: 5px;
  padding: 20px;
  margin: 20px auto;
  max-width: 480px;
  background-color: rgba(255, 255, 255, 0.5);
}

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
  background-color: #08104d; /* Ubah latar belakang tombol menjadi transparan */
  border: none;
  cursor: pointer;
  font-size: 18px;
  color: #000; /* Ubah warna teks menjadi hitam */
  padding: 10px 20px;
  border-radius: 5px;
  transition: color 0.3s ease; /* Tambahkan transisi warna */
}

.navbar ul li button:hover {
  background-color: #060d41; /* Tetapkan latar belakang tombol menjadi transparan saat dihover */
}

.container {
  position: relative;
  max-width: 480px;
  width: 100%;
  border-radius: 8px;
  padding: 25px;
  margin: 85px auto 0;
  background-color: rgba(255, 255, 255, 0.333);
  box-shadow: 0 5px 10px rgba(0, 0, 0, 0.1);
  color: #383737;
}

.input-field {
  display: flex;
  align-items: center;
  margin-bottom: 20px;
}

.input-text {
  background: #383737;
  flex-grow: 1;
  padding: 10px 15px;
  border: 0px solid #ffffff;
  border-radius: 4px;
  font-size: 16px;
}

.todo-button {
  background: transparent;
  border: none;
  cursor: pointer;
  margin-left: 10px;
}

.note-icon {
  font-size: 24px;
  color: white;
}

.todoLists {
  list-style: none;
  padding: 0;
  margin: 0;
}

.list {
  display: flex;
  align-items: center;
  background: #383737;
  padding: 10px;
  border-radius: 3px;
  margin-bottom: 10px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
}

.list input[type="checkbox"] {
  margin-right: 10px;
}

.list .done {
  text-decoration: line-through;
}

.delete-button {
  background: none;
  border: none;
  cursor: pointer;
  margin-left: auto;
  color: #143f8a;
  font-size: 18px;
}

.pending-tasks {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-top: 20px;
}

.clear-button {
  background: #143f8a;
  color: white;
  border: none;
  padding: 5px 10px;
  border-radius: 4px;
  cursor: pointer;
}

.clear-button:hover {
  background: #060d41;
}

.toggle-completed {
  background: none;
  border: none;
  color: #143f8a;
  cursor: pointer;
  margin-top: 20px;
}

.toggle-completed:hover {
  text-decoration: underline;
}
</style>

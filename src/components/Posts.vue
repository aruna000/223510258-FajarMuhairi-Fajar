<template>
  <div class="posts-container">
    <h2>Fitur Postingan</h2>
    <select v-model="localSelectedUser" @change="emitUpdateSelectedUser">
      <option value="" disabled>Select a user</option>
      <option v-for="user in users" :key="user.id" :value="user.id">
        {{ user.name }}
      </option>
    </select>
    <div v-if="filteredPosts.length > 0">
      <h3>Postingan oleh {{ selectedUserName }}</h3>
      <ul>
        <li v-for="post in filteredPosts" :key="post.id">{{ post.title }}</li>
      </ul>
    </div>
    <div v-else>
      <p>Tidak ada postingan untuk pengguna ini.</p>
    </div>
    <footer-fajar></footer-fajar>
  </div>
</template>

<script>
export default {
  props: ["users", "posts", "selectedUser"],
  data() {
    return {
      localSelectedUser: this.selectedUser,
    };
  },
  watch: {
    selectedUser(newVal) {
      this.localSelectedUser = newVal;
    },
  },
  computed: {
    selectedUserName() {
      const user = this.users.find((u) => u.id === this.localSelectedUser);
      return user ? user.name : "";
    },
    filteredPosts() {
      return this.posts.filter(
        (post) => post.userId === this.localSelectedUser
      );
    },
  },
  methods: {
    emitUpdateSelectedUser() {
      this.$emit("update:selectedUser", this.localSelectedUser);
    },
  },
};
</script>

<style scoped>
.posts-container {
  padding: 20px;
  margin: 20px auto;
  max-width: 480px;
  background-color: rgba(255, 255, 255, 0.5);
  border-radius: 5px;
}

.posts-container select {
  width: 100%;
  padding: 10px;
  margin-bottom: 20px;
  border-radius: 4px;
  border: 1px solid #ccc;
}

.posts-container ul {
  list-style: none;
  padding: 0;
}

.posts-container ul li {
  background: #383737;
  color: #fff;
  padding: 10px;
  border-radius: 4px;
  margin-bottom: 10px;
}

.posts-container h2 {
  margin-bottom: 20px;
}
</style>

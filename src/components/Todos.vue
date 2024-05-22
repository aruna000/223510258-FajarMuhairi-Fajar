<template>
  <div class="container">
    <form @submit.prevent="emitAddTodo" class="input-field">
      <input
        v-model="localNewTodo"
        required
        placeholder="new todo"
        class="input-text"
      />
      <button type="submit" class="todo-button">
        <i class="uil uil-notes note-icon"></i>
      </button>
    </form>

    <ul class="todoLists">
      <li v-for="todo in filteredTodos" :key="todo.id" class="list">
        <input
          type="checkbox"
          v-model="todo.done"
          @change="emitUpdateTodo(todo)"
        />
        <span :class="{ done: todo.done }">{{ todo.text }}</span>
        <button @click="emitRemoveTodo(todo)" class="delete-button">
          <i class="uil uil-trash"></i>
        </button>
      </li>
    </ul>

    <div class="pending-tasks">
      <span>{{ remainingTodos }} tasks remaining</span>
      <button @click="emitClearAllTodos" class="clear-button">Clear All</button>
    </div>

    <button @click="emitToggleHideCompleted" class="toggle-completed">
      {{ hideCompleted ? "Show all" : "Hide completed" }}
    </button>
  </div>
</template>

<script>
export default {
  props: ["todos", "newTodo", "hideCompleted", "pesan"],
  data() {
    return {
      localNewTodo: this.newTodo,
    };
  },
  watch: {
    newTodo(newVal) {
      this.localNewTodo = newVal;
    },
  },
  methods: {
    emitAddTodo() {
      this.$emit("update:newTodo", this.localNewTodo);
      this.$emit("add-todo");
      this.localNewTodo = "";
    },
    emitUpdateTodo(todo) {
      this.$emit("update-todo", todo);
    },
    emitRemoveTodo(todo) {
      this.$emit("remove-todo", todo);
    },
    emitClearAllTodos() {
      this.$emit("clear-all-todos");
    },
    emitToggleHideCompleted() {
      this.$emit("toggle-hide-completed");
    },
  },
  computed: {
    filteredTodos() {
      return this.hideCompleted
        ? this.todos.filter((t) => !t.done)
        : this.todos;
    },
    remainingTodos() {
      return this.todos.filter((todo) => !todo.done).length;
    },
  },
};
</script>

<style scoped>
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

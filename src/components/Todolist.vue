<template>
  <div class="box">
    <h1 @click="toggle">click</h1>
    <input type="text" v-model="title" @keydown.enter="addTodo" />

    <transition name="modal">
      <div class="info-wrapper" v-if="showModal">
        <div class="info">Dude, You entered nothing..</div>
      </div>
    </transition>

    <button v-if="active < all" @click="clear">Clear</button>

    <ul v-if="todos.length">
      <transition-group name="flip">
        <li v-for="todo in todos" :key="todo.title">
          <input type="checkbox" v-model="todo.done" />
          <span :class="{ done: todo.done }">{{ todo.title }}</span>
          <span class="remove-btn" @click="removeTodo($event, i)">❌</span>
        </li>
      </transition-group>
    </ul>
    <div v-else>There's no data</div>
    <!-- Check Oprations-->
    <div>
      All
      <input type="checkbox" v-model="allDone" />
      <span>{{ active }} / {{ all }}</span>
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'
import { useFullscreen } from "@vueuse/core";

const { toggle } = useFullscreen()
let { all, allDone, active, clear, addTodo, todos, title, showModal } = useTodos()
function removeTodo(e, i) { todos.value.splice(i, 1) }
</script>

<script>
import { useStorage } from "../utils/storage";

function useTodos() {
  let title = ref("")
  let todos = useStorage('todos')
  let showModal = ref(false)

  function addTodo() {
    if (!title.value) {
      showModal.value = true
      setTimeout(() => {
        showModal.value = false
      }, 1500)
      return
    }
    todos.value.push({
      title: title.value,
      done: false
    })
    title.value = ""
  }

  function clear() {
    todos.value = todos.value.filter(v => !v.done)
  }
  let active = computed(() => {
    return todos.value.filter(v => !v.done).length
  })

  let all = computed(() => todos.value.length)

  let allDone = computed({
    get: function () {
      return active.value === 0
    },
    set: function (value) {
      todos.value.forEach((todo) => {
        todo.done = value
      })
    }
  })

  return { all, allDone, active, todos, clear, addTodo, title, showModal }
}

</script>


<style scoped>
.box {
  position: relative;
}
h1 {
  color: red;
}
.info-wrapper {
  position: fixed;
  top: 20px;
  width: 200px;
}
.info {
  padding: 20px;
  color: white;
  background: #d88986;
}

.modal-enter-from {
  opacity: 0;
  transform: translayY(-60px);
}
.modal-enter-active {
  transition: all 0.3s ease;
}
.modal-leave-to {
  opacity: 0;
  transform: translateY(-60px);
}
.modal-leave-active {
  transition: all 0.3s ease;
}

ul,
li {
  list-style: none;
  width: 200px;
  margin: auto;
}
.flip-move {
  transition: transform 0.8s ease;
}
.flip-enter-active,
.flip-leave-active {
  transition: all ls ease;
}
.flip-enter-from,
.flip-leave-to {
  opacity: 0;
  transform: translateX(30px);
}
</style>

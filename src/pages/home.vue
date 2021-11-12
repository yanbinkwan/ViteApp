<template>
    <h1>这是首页</h1>
    <Todolist></Todolist>
    <Rate v-model="score">{{ score }}</Rate>
    <div @click="add">{{ count }}</div>
    <div @click="asyncAdd">{{ count }}</div>
</template>

<script setup>
import Todolist from '../components/Todolist.vue';
import Rate from '../components/Rate.vue';
import { ref, computed } from 'vue'
import { useStore } from 'vuex'
let score = ref(3.5)
let store = useStore();

let count = computed(() => store.state.count)

function add() { store.commit('add') }
function asyncAdd() { store.dispatch('asyncAdd') }
</script>

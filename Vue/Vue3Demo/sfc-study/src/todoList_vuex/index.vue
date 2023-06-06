<template>
    <div class="container">
        <div class="inputBox">
            <input v-model="task" type="text">
            <button @click="handleClick">Add Task</button>
        </div>
        <div class="routerLink">
            <RouterLink to="/task/all">全部任务</RouterLink>
            <RouterLink to="/task/complete">已完成任务</RouterLink>
            <RouterLink to="/task/incomplete">未完成任务</RouterLink>
        </div>
        <router-view></router-view>
    </div>
</template>

<script setup>
import { defineComponent, ref } from 'vue';
import { useStore } from 'vuex';

const store = useStore();
const task = ref('');

const handleClick = () => {
    store.commit('todoTask/addTask', task.value);
    task.value = '';
}

defineComponent({name: 'TodoList'});
</script>

<style scoped>
.container {
    width: 500px;
    margin: 50px auto 0;
    font-size: 20px;
}
.routerLink {
    margin: 20px 0;
}
.routerLink a {
    margin: 0 5px;
    padding: 5px 8px;
    text-decoration: none;
    color: #333;
}
.routerLink a:hover,
.routerLink a.router-link-active {
    background-color: #f60;
    color: #fff;

}
</style>
<template>
    <div>
        <ul>
            <task-item v-for="task in taskList" :task="task" :key="task.id">
            </task-item>
        </ul>
    </div>
</template>

<script setup>
import {computed} from 'vue';
import {useStore} from 'vuex';
import TaskItem from './taskItem.vue';

const store = useStore();
const taskList = computed(() => store.state.todoTask.taskList);

</script>

<style scoped>
</style>
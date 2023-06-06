<template>
    <div>
        <li :class="isComplete ? 'complete' : ''">
            <input type="checkbox" v-model="isComplete">
            {{ taskName }}
        </li>
    </div>
</template>

<script setup>
import { reactive, toRefs, defineProps, defineComponent} from 'vue'

const props = defineProps(['task']);

const {taskName, isComplete} = toRefs(reactive(props.task));

defineComponent({
    name: 'TaskItem'
});
</script>

<style scoped>
li {
    list-style: none;
}
li.complete {
    text-decoration: line-through;
}
</style>
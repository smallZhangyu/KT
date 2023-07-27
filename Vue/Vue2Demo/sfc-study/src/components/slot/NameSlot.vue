<template>
    <div>
        <h4>具名插槽</h4>
        <slot name="slot1">
            插槽一
        </slot>
        <slot name="default">
            默认插槽
        </slot>
        <slot name="slot2">
            插槽二
        </slot>
    </div>
</template>

<script>
export default {
    name: 'NameSlot'
}
</script>

<style scoped></style>
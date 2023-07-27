<template>
    <div>
        <h4>作用域插槽</h4>
        <slot :slotData="website">
            {{ website.default }}
        </slot>
    </div>
</template>

<script>
export default {
    name: 'ScopeSlot',
    data() {
        return {
            website: {
                title: '作用域插槽，内容来自子作用域',
                default: '默认slot内容'
            }
        }
    }
}
</script>

<style scoped></style>
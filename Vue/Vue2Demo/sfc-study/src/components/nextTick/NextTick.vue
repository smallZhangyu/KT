<template>
    <div>
        <h3>$nextTick 功能演示</h3>
        <button @click="handleClick">点击增加3个项目</button>
        <br>
        <ul ref="ulRef">
            <li v-for="item, index in list" :key="item">{{ index + 1 }} - {{ item }}</li>
        </ul>

        <br>
        <br>
        <hr>
        <ol>
            <li>$nextTick 会在updated之后执行；</li>
            <li>DOM渲染完之后 $nextTick 执行，可获取到最新的 DOM 节点</li>
        </ol>
    </div>
</template>

<script>
export default {
    name: 'NextTick',
    data() {
        return {
            list: ['a', 'b', 'c']
        }
    },
    methods: {
        handleClick: function () {
            this.list.push(new Date().getTime() + Math.random());
            this.list.push(new Date().getTime() + Math.random());
            this.list.push(new Date().getTime() + Math.random());

            const ulChildLength = this.$refs.ulRef.children.length;
            console.log('not use $nextTick: ' + ulChildLength);

            this.$nextTick(() => {
                const ulChildLength = this.$refs.ulRef.children.length;
                console.log('---> after use $nextTick: ' + ulChildLength);
            });
        }
    },
    updated() {
        const ulChildLength = this.$refs.ulRef.children.length;
        console.log('life in updated: ' + ulChildLength);
    },
}
</script>

<style scoped>
li {
    text-align: left;
}
</style>
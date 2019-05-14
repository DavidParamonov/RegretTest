<template>
    <div id="app">
        <button @click="test.Run()">Run test</button>
    </div>
</template>
<script>

    import MainRegretTest from "./RegretTest/Main";
    export default {
        name: 'app',
        data: function () {
            return {
                test: null
            }
        },
        created: function () {
            this.test = new MainRegretTest();
        },

    }
</script>
<style>

    #app {
        font-family: 'Avenir', Helvetica, Arial, sans-serif;
        -webkit-font-smoothing: antialiased;
        -moz-osx-font-smoothing: grayscale;
        text-align: center;
        color: #2c3e50;
        margin-top: 60px;
    }
</style>

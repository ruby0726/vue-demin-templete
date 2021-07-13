<template>
    <div class="w-100 my-lg">
        <span class="title">{{ title }}</span>
    </div>
</template>

<script>
export default {
    name: 'SubTitle',
    props: {
        title: {
            type: String,
            require: true,
            default: ''
        }
    }
}
</script>

<style lang="scss" scoped>
.title {
    position: relative;
    margin-left: 10px;
    &::before {
        position: absolute;
        left: -10px;
        top: 2px;
        content: "";
        display: block;
        width: 3px;
        height: 15px;
        background-color: #409EFF;
        border: 3px;
    }
}

</style>
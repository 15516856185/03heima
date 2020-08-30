<template>
  <div class="nav" @click='clickfn'>
     <div class="left">
      <slot></slot>
     </div>
     <div class="conent">
       <slot name='content'></slot>
     </div>
     <div class="right">
       <span class="iconfont iconjiantou1"></span>
     </div>
  </div>
</template>

<script>
export default {
  props: {
    to: String
  },
  methods: {
    clickfn () {
      if (this.to) {
        this.$router.push(this.to)
      }
    }
  }
}
</script>

<style lang='less' scoped>
.nav {
  height: 50px;
  margin-left: 15px;
  border-bottom: 1px solid #ccc;
  display: flex;
  align-items: center;
  font-size: 14px;
  .left {
    width: 130px;
  }
  .conent {
    flex: 1;
    text-align: right;
    padding-right: 15px;
    color: #ccc;
  }
  .right {
    margin-right: 10px;
    color: #ccc;
  }
}
</style>

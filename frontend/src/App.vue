<template>
  <router-link to="/"></router-link>
  <router-view v-if="isRouterAlive" />
</template>

<script>
export default {
  name: "App",
  provide() {
    return {
      reload: this.reload,
    };
  },
  data() {
    return {
      isRouterAlive: true,
    };
  },
  methods: {
    reload() {
      this.isRouterAlive = false;
      this.$nextTick(() => {
        this.isRouterAlive = true;
      });
    },
  },
};
</script>

<style>
.padded-small {
  padding: 8px;
}
.inline-form {
  margin-bottom: 0 !important;
}
.box-card {
  width: 400px;
}
.card-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  font-size: 14px;
}
.text-button {
  padding-top: 0 !important;
  padding-bottom: 0 !important;
  min-height: auto !important;
}
.card-text {
  font-size: 14px;
  margin-bottom: 18px;
}
.card-text:last-child {
  font-size: 14px;
  margin-bottom: 0;
}
.el-table__fixed-right {
  height: 100% !important;
}
.chart {
  height: 400px;
  padding: 10px;
  margin: 10px;
}
</style>


import Vue from 'vue';

export function message(type, message) {
  Vue.prototype.$message({
    type: type,
    message: message,
  });
}

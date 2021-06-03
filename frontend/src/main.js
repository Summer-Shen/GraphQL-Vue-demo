import Vue from "vue";
import ElementUI from "element-ui";
import "element-ui/lib/theme-chalk/index.css";
import App from "./App.vue";
import { router } from "./router";
import ApolloClient from "apollo-boost";
import VueApollo from "vue-apollo";

Vue.config.productionTip = false;

Vue.use(ElementUI);
Vue.use(VueApollo);

const apolloProvider = new VueApollo({
  defaultClient: new ApolloClient({
    uri: "http://localhost:4000",
  }),
});

new Vue({
  el: "#app",
  router,
  apolloProvider,
  render: (h) => h(App),
});

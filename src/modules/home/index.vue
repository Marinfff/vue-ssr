<script>
import users from "../../store/modules/users";
import Test from "./Test.vue";

export default {
  name: 'Home',

  components: {
    Test
  },

  metaInfo: {
    title: 'Home 1',
    meta: [
      {name: 'description', content: 'Home page description'},
      {name: 'keywords', content: 'keywords keywords keywords'},
      {name: 'author', content: 'Marin Bumbac'},
      {name: 'viewport', content: 'width=device-width, initial-scale=1.0'}
    ]
  },

  computed: {
    show() {
      return this.$store.state.users.items;
    }
  },

  serverPrefetch() {
    this.$store.registerModule('users', users)
    return this.$store.dispatch('users/set')
  },

  mounted() {
    this.$store.registerModule('users', users, {preserveState: true})
  }
};
</script>

<template>
  <div>
    <h1>Home page</h1>
    <h2> Test page </h2>
    <router-link to="/about/2">Go to About page</router-link>
    <test></test>
    <div v-for="(item, index) in show" :key="index">
      {{ item.title }}
      <br>
      <br>
    </div>
  </div>
</template>

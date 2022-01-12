<script>
import users from "../../store/modules/users";

export default {
  name: 'About',

  metaInfo: {
    title: 'About page',
    meta: [
      {name: 'description', content: 'About page description'},
      {name: 'keywords', content: 'keywords keywords keywords'},
      {name: 'author', content: 'Marin Bumbac'},
    ]
  },

  computed: {
    show() {
      return this.$store.state.users.items;
    }
  },

  serverPrefetch() {
    console.log(this.$route.params)
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
    <h1>About page</h1>
    <router-link to="/">Go to Home page</router-link>
    <pre>
      {{ show.slice(0, Number($route.params.id)) }}
    </pre>
  </div>
</template>

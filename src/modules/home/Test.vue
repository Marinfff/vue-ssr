<script>
import axios from "axios";

export default {
  name: 'Home',

  data: () => ({
    items: []
  }),

  methods: {
    async loadData() {
      try {
        const response = await axios.get('http://jsonplaceholder.typicode.com/posts');
        this.items.push(...response.data.slice(0, 4));
        console.log(this.items)
      } catch (e) {
        console.log(e);
      }
    }
  }
};
</script>

<template>
  <div>
    <br>
    <button @click="loadData()">Load data</button>
    <br>
    <br>
    <div v-for="(item, index) in items" :key="index">
      <b>
        {{ item.title }}
      </b>
      <br>
      <br>
    </div>
  </div>
</template>

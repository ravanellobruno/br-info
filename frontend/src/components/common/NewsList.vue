<template>
  <v-row class="mb-n4">
    <v-col
      v-for="(item, index) in items"
      :key="index"
      cols="12"
      class="list-item"
    >
      <v-card class="post-container" :href="item.href" target="_blank">
        <img class="post-img" v-show="item.image" :src="item.image" />
        <h4>{{ item.title }}</h4>
        <small>
          <div>{{ item.intro }}</div>
          <div class="access-btn-container">
            <v-icon small large>mdi-arrow-right</v-icon>
          </div>
        </small>
      </v-card>
    </v-col>
  </v-row>
</template>

<script>
export default {
  name: 'NewsList',
  props: {
    items: {
      type: Array,
      required: true,
    },
  },
};
</script>

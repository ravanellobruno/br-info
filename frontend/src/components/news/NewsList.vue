<template>
  <v-row class="mb-n4">
    <v-col v-for="(item, i) in items" :key="i" cols="12" class="list-item">
      <v-card class="post" :href="item.href" target="_blank">
        <img class="post-img" v-show="item.img" :src="item.img" />
        <h4 class="post-title">{{ item.title }}</h4>
        <small>
          <div>{{ item.intro }}</div>
          <div class="access-arrow-container">
            <v-icon small>mdi-arrow-right</v-icon>
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

<template>
  <v-row class="mb-n4">
    <v-col v-for="(item, i) in items" :key="i" cols="12" class="list-item">
      <v-card class="post" :href="item.href" target="_blank">
        <v-row>
          <v-col cols="12" sm="3">
            <div class="mb-n3">
              <img class="post-img pr-5" v-show="item.img" :src="item.img" />
              <small>
                <div>{{ item.info }}</div>
              </small>
            </div>
          </v-col>
          <v-col cols="12" sm="9">
            <h4 class="mt-n2 post-title">{{ item.title }}</h4>
            <small>
              <div>- {{ item.cast }}</div>
              <div>- {{ item.synopsis }}</div>
              <div class="access-arrow-container">
                <v-icon small>mdi-arrow-right</v-icon>
              </div>
            </small>
          </v-col>
        </v-row>
      </v-card>
    </v-col>
  </v-row>
</template>

<script>
export default {
  name: 'SeriesList',
  props: {
    items: {
      type: Array,
      required: true,
    },
  },
};
</script>

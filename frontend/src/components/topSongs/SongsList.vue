<template>
  <v-row class="mb-n4">
    <v-col>
      <div v-for="(item, i) in items" :key="i" class="list-item">
        <a target="_blank" :href="item.href" class="mb-2 pb-2">
          <small>
            <v-icon class="mr-3">mdi-play-circle</v-icon>
            <b>{{ i + 1 }}</b>
            - {{ item.song }} - {{ item.artist }}
          </small>
        </a>
        <v-divider class="my-2" />
      </div>
    </v-col>
  </v-row>
</template>

<script>
export default {
  name: 'SongsList',
  props: {
    items: {
      type: Array,
      required: true,
    },
  },
};
</script>

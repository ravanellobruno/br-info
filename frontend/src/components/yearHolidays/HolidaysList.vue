<template>
  <v-row class="mb-n4">
    <v-col>
      <div v-for="(item, i) in items" :key="i" class="list-item">
        <div class="subtitle-2">{{ item }}</div>
        <v-divider class="my-2" />
      </div>
    </v-col>
  </v-row>
</template>

<script>
export default {
  name: 'HolidaysList',
  props: {
    items: {
      type: Array,
      required: true,
    },
  },
};
</script>

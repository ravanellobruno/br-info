<template>
  <v-container class="mt-4 mb-8 px-6">
    <v-row class="my-n4">
      <v-col>
        <router-link :to="$router.options.routes[0].path">
          <v-btn small>
            <v-icon small class="mr-2">mdi-arrow-left-circle</v-icon>
            Início
          </v-btn>
        </router-link>
      </v-col>
    </v-row>
    <v-row>
      <v-col>
        <h2 class="mb-1">{{ title }}</h2>
        <slot />
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
export default {
  name: 'CommonPage',
  props: {
    title: {
      type: String,
      required: true,
    },
  },
};
</script>

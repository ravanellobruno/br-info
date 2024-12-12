<template>
  <v-container class="bottom-menu">
    <v-btn small class="bottom-btn" @click="scrollTo('topMenu')">
      <v-icon>{{ this.$router.options.routes[0].icon }}</v-icon>
    </v-btn>
    <v-btn
      v-for="card in activeCards"
      :key="card.id"
      small
      class="bottom-btn"
      @click="scrollTo(card.component)"
    >
      <v-icon>{{ card.icon }}</v-icon>
    </v-btn>
  </v-container>
</template>

<script>
import { mapState } from 'vuex';

export default {
  name: 'BottomMenu',
  data: () => ({
    drawer: false,
  }),
  computed: {
    ...mapState('user', ['preferences']),

    activeCards() {
      return this.preferences.cards.filter((card) => card.isActive);
    },
  },
  methods: {
    scrollTo(id) {
      window.scrollTo(0, document.getElementById(id).offsetTop);
    },
  },
};
</script>

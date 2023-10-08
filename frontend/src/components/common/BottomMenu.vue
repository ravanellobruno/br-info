<template>
  <v-container class="bottom-menu">
    <v-btn small class="bottom-btn" @click="$emit('scrollTo', 'topMenu')">
      <v-icon>{{ this.$router.options.routes[0].icon }}</v-icon>
    </v-btn>
    <v-btn
      v-for="card in userActiveCards"
      :key="card.id"
      small
      class="bottom-btn"
      @click="$emit('scrollTo', card.value)"
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

    userActiveCards() {
      return this.preferences.cards.filter((card) => card.active);
    },
  },
};
</script>

<style lang="scss" scoped>
.bottom-menu {
  z-index: 6;
  position: fixed;
  bottom: 0;
  left: 0;
  min-width: 100vw;
  text-align: center;
  background-color: lightgray;
}

.bottom-btn {
  margin: 0 4px 8px 4px !important;
}

.bottom-btn:before {
  background-color: white !important;
}
</style>

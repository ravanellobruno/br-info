<template>
  <v-container class="bottom-menu">
    <v-btn small class="mx-1 mb-2" @click="setSection('')">
      <v-icon>mdi-home</v-icon>
    </v-btn>
    <v-btn
      v-for="card in userActiveCards"
      :key="card.id"
      small
      class="mx-1 mb-2"
      @click="setSection(card.value)"
    >
      <v-icon>{{ card.icon }}</v-icon>
    </v-btn>
  </v-container>
</template>

<script>
import { mapState, mapActions } from 'vuex';

export default {
  name: 'BottomMenu',
  data: () => ({
    drawer: false,
  }),
  computed: {
    ...mapState('ModuleUser', ['preferences']),

    userActiveCards() {
      return this.preferences.cards.filter((card) => card.active);
    },
  },
  methods: {
    ...mapActions('ModuleCommon', ['setSection']),
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
</style>

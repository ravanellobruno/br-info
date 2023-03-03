<template>
  <v-container class="mt-4 mb-8">
    <center v-if="!userActiveCards.length">
      <p class="mt-2">
        Nenhum card selecionado para mostrar
        <v-spacer></v-spacer>
        Configure clicando
        <b class="configs-link" @click="toggleIsConfigsVisible">aqui</b>
      </p>
    </center>
    <v-row>
      <v-col
        v-for="card in userActiveCards"
        :key="card.id"
        :id="card.value"
        cols="12"
        md="6"
      >
        <v-component :is="card.component"></v-component>
      </v-col>
    </v-row>
    <BottomMenu />
  </v-container>
</template>

<script>
import { mapState, mapActions } from 'vuex';
import WeatherNow from '@/components/WeatherNow';
import FuelPrice from '@/components/FuelPrice';
import QuotationsToday from '@/components/QuotationsToday';
import GovernmentIndicators from '@/components/GovernmentIndicators';
import TopSongsToday from '@/components/TopSongsToday';
import MySoccerTeam from '@/components/MySoccerTeam';
import YearHolidays from '@/components/YearHolidays';
import LastNewsToday from '@/components/LastNewsToday';
import BottomMenu from '@/components/common/BottomMenu';

export default {
  name: 'HomePage',
  components: {
    WeatherNow,
    FuelPrice,
    QuotationsToday,
    GovernmentIndicators,
    TopSongsToday,
    MySoccerTeam,
    YearHolidays,
    LastNewsToday,
    BottomMenu,
  },
  computed: {
    ...mapState('ModuleCommon', ['section']),
    ...mapState('ModuleUser', ['preferences']),

    userActiveCards() {
      return this.preferences.cards.filter((card) => card.active);
    },
  },
  watch: {
    'section.version': function () {
      const position = this.section.value
        ? document.getElementById(this.section.value).offsetTop
        : 0;

      window.scrollTo(0, position);
    },
  },
  methods: {
    ...mapActions('ModuleCommon', ['toggleIsConfigsVisible']),
  },
};
</script>

<style lang="scss" scoped>
.configs-link {
  cursor: pointer;
}
</style>

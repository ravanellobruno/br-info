<template>
  <v-container class="mt-4 mb-8">
    <v-btn small fixed class="refresh-btn" @click="loadData">
      <v-icon class="refresh-icon">mdi-refresh</v-icon>
    </v-btn>
    <v-row class="cards-container">
      <v-col
        v-for="card in userActiveCards"
        :key="card.id"
        :id="card.component"
        cols="12"
        md="6"
      >
        <v-component :is="card.component" />
      </v-col>
    </v-row>
    <center v-if="!userActiveCards.length">
      <p class="mt-2">
        Nenhum card selecionado para mostrar.
        <v-spacer />
        Configure clicando
        <b class="configs-link" @click="toggleIsConfigsVisible">aqui</b>
      </p>
    </center>
    <BottomMenu />
  </v-container>
</template>

<script>
import { mapState, mapActions } from 'vuex';
import WeatherNow from '@/components/WeatherNow';
import FuelPrice from '@/components/FuelPrice';
import QuotationsToday from '@/components/QuotationsToday';
import GovernmentIndicators from '@/components/GovernmentIndicators';
import TopSongs from '@/components/topSongs/TopSongs';
import MySoccerTeam from '@/components/MySoccerTeam';
import YearHolidays from '@/components/yearHolidays/YearHolidays';
import LastNews from '@/components/LastNews';
import ScienceTechNews from '@/components/ScienceTechNews';
import BottomMenu from '@/components/common/BottomMenu';

export default {
  name: 'HomePage',
  components: {
    WeatherNow,
    FuelPrice,
    QuotationsToday,
    GovernmentIndicators,
    TopSongs,
    MySoccerTeam,
    YearHolidays,
    LastNews,
    ScienceTechNews,
    BottomMenu,
  },
  computed: {
    ...mapState('user', ['preferences']),

    userActiveCards() {
      return this.preferences.cards.filter((card) => card.active);
    },
  },
  created() {
    this.loadData();
  },
  methods: {
    ...mapActions('common', ['toggleIsConfigsVisible']),
    ...mapActions('data', ['loadData']),
  },
};
</script>

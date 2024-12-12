<template>
  <v-container class="mt-4 mb-8">
    <v-btn small fixed class="refresh-btn" @click="loadData">
      <v-icon class="refresh-icon">mdi-refresh</v-icon>
    </v-btn>
    <v-row class="cards-container">
      <v-col v-for="card in activeCards" :key="card.id" :id="card.component" cols="12" md="6">
        <v-component :is="card.component" />
      </v-col>
    </v-row>
    <center v-if="!activeCards.length">
      <p class="mt-2">
        Nenhum card selecionado para mostrar.
        <v-spacer />
        Configure clicando
        <b class="configs-link" @click="toggleConfigsIsVisible">aqui</b>
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
import TopSeries from '@/components/topSeries/TopSeries';
import LastNews from '@/components/news/LastNews';
import ScienceTech from '@/components/news/ScienceTech';
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
    ScienceTech,
    BottomMenu,
    TopSeries,
  },
  computed: {
    ...mapState('user', ['preferences']),

    activeCards() {
      return this.preferences.cards.filter((card) => card.isActive);
    },
  },
  created() {
    this.loadData();
  },
  methods: {
    ...mapActions('common', ['toggleConfigsIsVisible', 'loadData']),
  },
};
</script>

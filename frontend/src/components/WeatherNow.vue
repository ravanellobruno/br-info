<template>
  <CommonCard
    icon="mdi-thermometer-low"
    title="Clima agora"
    :subtitle="isLoading ? '' : preferences.city"
    :isLoading="isLoading"
    :icon2="weatherIcon"
    :hasError="hasError"
  >
    <div v-show="Object.keys(weather).length && !hasError">
      <v-row class="mb-n4">
        <v-col>
          <h3>Temperatura: {{ weather.temperature }}</h3>
        </v-col>
        <v-col>
          <h3>
            {{ weather.condition }}
          </h3>
        </v-col>
      </v-row>
      <v-row class="mb-1">
        <v-col>
          <h3>Minima: {{ weather.min }}</h3>
        </v-col>
        <v-col>
          <h3>Máxima: {{ weather.max }}</h3>
        </v-col>
      </v-row>
      <v-divider></v-divider>
      <v-row class="mb-n7 mt-1">
        <v-col><h4>Amanhã</h4></v-col>
      </v-row>
      <v-row>
        <v-col>{{ weather.tomorrow?.condition }}</v-col>
        <v-col>Mínima: {{ weather.tomorrow?.min }}</v-col>
        <v-col>Máxima: {{ weather.tomorrow?.max }}</v-col>
      </v-row>
    </div>
  </CommonCard>
</template>

<script>
import { mapState } from 'vuex';
import CommonCard from '@/components/common/CommonCard';
import ValueHandlers from '@/mixins/ValueHandlers';
import ApiServices from '@/services/ApiServices';

export default {
  name: 'WeatherNow',
  components: { CommonCard },
  mixins: [ValueHandlers, ApiServices],
  data() {
    return {
      weather: {},
      isLoading: false,
      weatherIcon: '',
      hasError: false,
    };
  },
  computed: {
    ...mapState('ModuleUser', ['preferences']),
    ...mapState('ModuleData', ['dataLoad']),
  },
  watch: {
    dataLoad: {
      async handler() {
        this.isLoading = true;
        this.hasError = false;

        try {
          this.weather = await this.getData(
            `weather-now?state=${
              this.preferences.uf.value
            }&city=${this.convertStrToSlug(this.preferences.city)}`
          );

          switch (this.weather.condition) {
            case 'Parcialmente nublado':
              this.weatherIcon = 'mdi-weather-partly-cloudy';
              break;
            case 'Céu claro':
              this.weatherIcon = 'mdi-weather-sunny';
              break;
            case 'Nublado':
              this.weatherIcon = 'mdi-weather-cloudy';
              break;
            case 'Chuva':
              this.weatherIcon = 'mdi-weather-pouring';
              break;
            case 'Sol com chuva':
              this.weatherIcon = 'mdi-weather-partly-rainy';
              break;
            case 'Noite com chuva':
              this.weatherIcon = 'mdi-weather-pouring';
              break;
            default:
              this.weatherIcon = '';
          }
        } catch (error) {
          this.hasError = true;
        } finally {
          this.isLoading = false;
        }
      },

      immediate: true,
    },
  },
};
</script>

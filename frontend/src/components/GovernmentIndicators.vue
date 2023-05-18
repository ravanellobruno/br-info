<template>
  <CommonCard
    icon="mdi-trending-up"
    title="Indicadores Brasil"
    :isLoading="isLoading"
    :hasError="hasError"
  >
    <div v-show="Object.keys(indicators).length && !hasError">
      <v-row class="mb-n4">
        <v-col>
          <h4>Inflação IPCA Mensal</h4>
          <h3 class="my-1">
            {{ indicators.ipca?.value }}
          </h3>
          <small>
            {{ indicators.ipca?.date }}
          </small>
        </v-col>
        <v-col>
          <h4>Inflação INPC</h4>
          <h3 class="my-1">
            {{ indicators.inpc?.value }}
          </h3>
          <small>
            {{ indicators.inpc?.date }}
          </small>
        </v-col>
      </v-row>
      <v-row class="mb-n4">
        <v-col>
          <h4>Variação do PIB</h4>
          <h3 class="my-1">{{ indicators.pib?.value }}</h3>
          <small>{{ indicators.pib?.date }}</small>
        </v-col>
        <v-col>
          <h4>Desemprego</h4>
          <h3 class="my-1">
            {{ indicators.desemprego?.value }}
          </h3>
          <small>{{ indicators.desemprego?.date }}</small>
        </v-col>
      </v-row>
    </div>
  </CommonCard>
</template>

<script>
import CommonCard from '@/components/common/CommonCard';
import ApiServices from '@/services/ApiServices';

export default {
  name: 'governmentIndicators',
  components: { CommonCard },
  mixins: [ApiServices],
  data() {
    return {
      indicators: {},
      isLoading: false,
      newRequestTimer: null,
      hasError: false,
    };
  },
  created() {
    this.getIndicators();

    this.newRequestTimer = setInterval(() => {
      this.getIndicators();
    }, 60000);
  },
  beforeDestroy() {
    clearInterval(this.newRequestTimer);
  },
  methods: {
    async getIndicators() {
      this.isLoading = true;
      this.hasError = false;

      try {
        this.indicators = await this.getData(`government-indicators/`);
      } catch (error) {
        this.hasError = true;
      } finally {
        this.isLoading = false;
      }
    },
  },
};
</script>

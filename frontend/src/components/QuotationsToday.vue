<template>
  <CommonCard
    icon="mdi-cash"
    title="Cotações hoje"
    :isLoading="isLoading"
    :hasError="hasError"
  >
    <div v-show="Object.keys(quotations).length && !hasError">
      <v-row class="mb-n4">
        <v-col>
          <p class="pb-0 mb-0">
            <small>1</small>
            Dólar
            <small>vale</small>
          </p>
          <h2>R$ {{ quotations.dollar }}</h2>
        </v-col>
        <v-col>
          <p class="pb-0 mb-0">
            <small>1</small>
            Euro
            <small>vale</small>
          </p>
          <h2>R$ {{ quotations.euro }}</h2>
        </v-col>
      </v-row>
      <v-row class="mb-n4">
        <v-col>
          <p class="pb-0 mb-0">
            <small>1</small>
            Bitcoin
            <small>vale</small>
          </p>
          <h2>
            {{ convertPriceToBr(quotations.bitcoin) }}
          </h2>
        </v-col>
      </v-row>
    </div>
  </CommonCard>
</template>

<script>
import CommonCard from '@/components/common/CommonCard';
import ValueHandlers from '@/mixins/ValueHandlers';
import ApiServices from '@/services/ApiServices';

export default {
  name: 'QuotationsToday',
  components: { CommonCard },
  mixins: [ValueHandlers, ApiServices],
  data() {
    return {
      quotations: {},
      isLoading: false,
      newRequestTimer: null,
      hasError: false,
    };
  },
  created() {
    this.getQuotations();

    this.newRequestTimer = setInterval(() => {
      this.getQuotations();
    }, 60000);
  },
  beforeDestroy() {
    clearInterval(this.newRequestTimer);
  },
  methods: {
    async getQuotations() {
      this.isLoading = true;
      this.hasError = false;

      try {
        this.quotations = await this.getData(`quotations-today/`);
      } catch (error) {
        this.hasError = true;
      } finally {
        this.isLoading = false;
      }
    },
  },
};
</script>

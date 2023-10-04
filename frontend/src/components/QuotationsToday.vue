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
            {{ valueHandlers_convertPriceToBr(quotations.bitcoin) }}
          </h2>
        </v-col>
      </v-row>
    </div>
  </CommonCard>
</template>

<script>
import { mapState } from 'vuex';
import CommonCard from '@/components/common/CommonCard';
import valueHandlers from '@/mixins/valueHandlers.js';
import apiServices from '@/services/apiServices.js';

export default {
  name: 'QuotationsToday',
  components: { CommonCard },
  mixins: [valueHandlers, apiServices],
  data() {
    return {
      quotations: {},
      isLoading: false,
      hasError: false,
    };
  },
  computed: {
    ...mapState('data', ['dataLoad']),
  },
  watch: {
    dataLoad: {
      async handler() {
        this.isLoading = true;
        this.hasError = false;

        try {
          this.quotations = await this.apiServices_getData(`quotations-today/`);
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

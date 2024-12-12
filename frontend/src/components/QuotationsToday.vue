<template>
  <CommonCard icon="mdi-cash" title="Cotações" :isLoading="isLoading" :hasErr="hasErr">
    <div v-show="Object.keys(quotations).length && !hasErr">
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
          <h2>{{ formatHelper_brPrice(quotations.bitcoin) }}</h2>
        </v-col>
      </v-row>
    </div>
  </CommonCard>
</template>

<script>
import { mapState } from 'vuex';
import CommonCard from '@/components/common/CommonCard';
import formatHelper from '@/helpers/formatHelper';
import apiService from '@/services/apiService';

export default {
  name: 'QuotationsToday',
  components: { CommonCard },
  mixins: [formatHelper, apiService],
  data() {
    return {
      quotations: {},
      isLoading: false,
      hasErr: false,
    };
  },
  computed: {
    ...mapState('common', ['dataLoad']),
  },
  watch: {
    dataLoad: {
      async handler() {
        this.isLoading = true;
        this.hasErr = false;

        try {
          this.quotations = await this.apiService_getData('quotations-today');
        } catch (err) {
          this.hasErr = true;
        } finally {
          this.isLoading = false;
        }
      },

      immediate: true,
    },
  },
};
</script>

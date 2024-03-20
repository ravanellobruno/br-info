<template>
  <CommonCard
    icon="mdi-gas-station"
    title="Preço médio combustíveis"
    :isLoading="isLoading"
    :hasError="hasError"
  >
    <div v-show="Object.keys(price).length && !hasError">
      <v-row class="mb-n4">
        <v-col cols="12" sm="6">
          <h3 class="mb-2">Brasil</h3>
          <div class="d-block">
            <div class="mb-1">
              <span class="mr-1">Gasolina:</span>
              <b>{{ valueHandlers_handleValidPrice(price.br?.gas) }}</b>
            </div>
            <div class="mb-1">
              <span class="mr-1">Diesel:</span>
              <b>{{ valueHandlers_handleValidPrice(price.br?.diesel) }}</b>
            </div>
            <div class="mb-1">
              <span class="mr-1">Gás de cozinha:</span>
              <b>{{ valueHandlers_handleValidPrice(price.br?.glp) }}</b>
            </div>
          </div>
        </v-col>
        <v-col cols="12" sm="6">
          <h3 class="mb-2">{{ preferences.uf.name }}</h3>
          <div class="d-block">
            <div class="mb-1">
              <span class="mr-1">Gasolina:</span>
              <b>{{ valueHandlers_handleValidPrice(price.uf?.gas) }}</b>
            </div>
            <div class="mb-1">
              <span class="mr-1">Diesel:</span>
              <b>{{ valueHandlers_handleValidPrice(price.uf?.diesel) }}</b>
            </div>
            <div class="mb-1">
              <span class="mr-1">Gás de cozinha:</span>
              <b>{{ valueHandlers_handleValidPrice(price.uf?.glp) }}</b>
            </div>
          </div>
        </v-col>
      </v-row>
    </div>
  </CommonCard>
</template>

<script>
import { mapState } from 'vuex';
import CommonCard from '@/components/common/CommonCard';
import apiServices from '@/services/apiServices';
import valueHandlers from '@/mixins/valueHandlers';

export default {
  name: 'FuelPrice',
  components: { CommonCard },
  mixins: [valueHandlers, apiServices],
  data() {
    return {
      price: {},
      isLoading: false,
      hasError: false,
    };
  },
  computed: {
    ...mapState('user', ['preferences']),
    ...mapState('data', ['dataLoad']),
  },
  watch: {
    dataLoad: {
      async handler() {
        this.isLoading = true;
        this.hasError = false;
        const path = `fuel-price?uf=${this.preferences.uf.value}`;

        try {
          this.price = await this.apiServices_getData(path);
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

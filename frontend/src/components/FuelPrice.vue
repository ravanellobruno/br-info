<template>
  <CommonCard
    icon="mdi-gas-station"
    title="Preço médio combustíveis"
    :isLoading="isLoading"
    :hasErr="hasErr"
  >
    <div v-show="Object.keys(price).length && !hasErr">
      <v-row class="mb-n4">
        <v-col cols="12" sm="6">
          <h3 class="mb-2">Brasil</h3>
          <div class="d-block">
            <div class="mb-1">
              <span class="mr-1">Gasolina:</span>
              <b>{{ formatHelper_price(price.br?.gas) }}</b>
            </div>
            <div class="mb-1">
              <span class="mr-1">Diesel:</span>
              <b>{{ formatHelper_price(price.br?.diesel) }}</b>
            </div>
            <div class="mb-1">
              <span class="mr-1">Gás de cozinha:</span>
              <b>{{ formatHelper_price(price.br?.glp) }}</b>
            </div>
          </div>
        </v-col>
        <v-col cols="12" sm="6">
          <h3 class="mb-2">{{ preferences.uf.name }}</h3>
          <div class="d-block">
            <div class="mb-1">
              <span class="mr-1">Gasolina:</span>
              <b>{{ formatHelper_price(price.uf?.gas) }}</b>
            </div>
            <div class="mb-1">
              <span class="mr-1">Diesel:</span>
              <b>{{ formatHelper_price(price.uf?.diesel) }}</b>
            </div>
            <div class="mb-1">
              <span class="mr-1">Gás de cozinha:</span>
              <b>{{ formatHelper_price(price.uf?.glp) }}</b>
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
import apiService from '@/services/apiService';
import formatHelper from '@/helpers/formatHelper';

export default {
  name: 'FuelPrice',
  components: { CommonCard },
  mixins: [formatHelper, apiService],
  data() {
    return {
      price: {},
      isLoading: false,
      hasErr: false,
    };
  },
  computed: {
    ...mapState('user', ['preferences']),
    ...mapState('common', ['dataLoad']),
  },
  watch: {
    dataLoad: {
      async handler() {
        this.isLoading = true;
        this.hasErr = false;
        const path = `fuel-price?uf=${this.preferences.uf.value}`;

        try {
          this.price = await this.apiService_getData(path);
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

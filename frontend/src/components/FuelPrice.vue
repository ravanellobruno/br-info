<template>
  <CommonCard
    icon="mdi-gas-station"
    title="Preço médio combustíveis"
    :isLoading="isLoading"
    :hasError="hasError"
  >
    <div v-show="Object.keys(fuelPrice).length && !hasError">
      <v-row class="mb-n4">
        <v-col cols="12" sm="6">
          <h3 class="mb-2">Brasil</h3>
          <div class="d-block">
            <div class="mb-1">
              <span class="mr-1">Gasolina:</span>
              <b>{{ handleFuelValue(fuelPrice.gasBr) }}</b>
            </div>
            <div class="mb-1">
              <span class="mr-1">Diesel:</span>
              <b>{{ handleFuelValue(fuelPrice.dieselBr) }}</b>
            </div>
            <div class="mb-1">
              <span class="mr-1">Gás de cozinha:</span>
              <b>{{ handleFuelValue(fuelPrice.glpBr) }}</b>
            </div>
          </div>
        </v-col>
        <v-col cols="12" sm="6">
          <h3 class="mb-2">{{ preferences.uf.name }}</h3>
          <div class="d-block">
            <div class="mb-1">
              <span class="mr-1">Gasolina:</span>
              <b>{{ handleFuelValue(fuelPrice.gasUf) }}</b>
            </div>
            <div class="mb-1">
              <span class="mr-1">Diesel:</span>
              <b>{{ handleFuelValue(fuelPrice.dieselUf) }}</b>
            </div>
            <div class="mb-1">
              <span class="mr-1">Gás de cozinha:</span>
              <b>{{ handleFuelValue(fuelPrice.glpUf) }}</b>
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
import ApiServices from '@/services/ApiServices';
import ValueHandlers from '@/mixins/ValueHandlers';

export default {
  name: 'FuelPrice',
  components: { CommonCard },
  mixins: [ValueHandlers, ApiServices],
  data() {
    return {
      fuelPrice: {},
      isLoading: false,
      newRequestTimer: null,
      hasError: false,
    };
  },
  computed: {
    ...mapState('ModuleUser', ['preferences']),
  },
  created() {
    this.getFuelPrice();

    this.newRequestTimer = setInterval(() => {
      this.getFuelPrice();
    }, 60000);
  },
  beforeDestroy() {
    clearInterval(this.newRequestTimer);
  },
  methods: {
    async getFuelPrice() {
      this.isLoading = true;
      this.hasError = false;

      try {
        this.fuelPrice = await this.getData(
          `fuel-price?uf=${this.preferences.uf.value}`
        );
      } catch (error) {
        this.hasError = true;
      } finally {
        this.isLoading = false;
      }
    },
  },
};
</script>

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
              <b>{{ handleFuelValue(price.br?.gas) }}</b>
            </div>
            <div class="mb-1">
              <span class="mr-1">Diesel:</span>
              <b>{{ handleFuelValue(price.br?.diesel) }}</b>
            </div>
            <div class="mb-1">
              <span class="mr-1">Gás de cozinha:</span>
              <b>{{ handleFuelValue(price.br?.glp) }}</b>
            </div>
          </div>
        </v-col>
        <v-col cols="12" sm="6">
          <h3 class="mb-2">{{ preferences.uf.name }}</h3>
          <div class="d-block">
            <div class="mb-1">
              <span class="mr-1">Gasolina:</span>
              <b>{{ handleFuelValue(price.uf?.gas) }}</b>
            </div>
            <div class="mb-1">
              <span class="mr-1">Diesel:</span>
              <b>{{ handleFuelValue(price.uf?.diesel) }}</b>
            </div>
            <div class="mb-1">
              <span class="mr-1">Gás de cozinha:</span>
              <b>{{ handleFuelValue(price.uf?.glp) }}</b>
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
      price: {},
      isLoading: false,
      newRequestTimer: null,
      hasError: false,
    };
  },
  computed: {
    ...mapState('ModuleUser', ['preferences']),
  },
  created() {
    this.getPrice();

    this.newRequestTimer = setInterval(() => {
      this.getPrice();
    }, 60000);
  },
  beforeDestroy() {
    clearInterval(this.newRequestTimer);
  },
  methods: {
    async getPrice() {
      this.isLoading = true;
      this.hasError = false;

      try {
        this.price = await this.getData(
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

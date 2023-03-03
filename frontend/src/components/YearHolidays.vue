<template>
  <CommonCard
    icon="mdi-airplane-clock"
    :title="`Feriados ${year}`"
    :isLoading="isLoading"
    :hasError="hasError"
  >
    <center v-show="!holidays.length && !hasError && !isLoading">
      Nenhum feriado restante em {{ year }}
    </center>
    <div v-show="holidays.length && !hasError">
      <v-row class="mb-n4">
        <v-col>
          <div v-for="(holiday, index) in holidays" :key="index">
            <div class="subtitle-2">
              {{ holiday }}
            </div>
            <v-divider class="my-2"></v-divider>
          </div>
        </v-col>
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
  name: 'YearHolidays',
  components: { CommonCard },
  mixins: [ValueHandlers, ApiServices],
  data() {
    return {
      holidays: [],
      isLoading: false,
      newRequestTimer: null,
      hasError: false,
      year: new Date().getFullYear(),
    };
  },
  computed: {
    ...mapState('ModuleUser', ['preferences']),
  },
  created() {
    this.getHolidays();

    this.newRequestTimer = setInterval(() => {
      this.getHolidays();
    }, 60000);
  },
  beforeDestroy() {
    clearInterval(this.newRequestTimer);
  },
  methods: {
    async getHolidays() {
      this.isLoading = true;
      this.hasError = false;

      try {
        this.holidays = await this.getData(
          `holidays?state=${
            this.preferences.uf.value
          }&city=${this.convertStrToSlug(this.preferences.city)}`
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

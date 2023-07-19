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
import valueHandlers from '@/mixins/valueHandlers';
import apiServices from '@/services/apiServices';

export default {
  name: 'YearHolidays',
  components: { CommonCard },
  mixins: [valueHandlers, apiServices],
  data() {
    return {
      holidays: [],
      isLoading: false,
      hasError: false,
      year: new Date().getFullYear(),
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

        try {
          this.holidays = await this.apiServices_getData(
            `holidays?state=${
              this.preferences.uf.value
            }&city=${this.valueHandlers_convertStrToSlug(
              this.preferences.city
            )}`
          );
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

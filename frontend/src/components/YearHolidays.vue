<template>
  <CommonCard
    icon="mdi-airplane-clock"
    :title="`Próximos feriados ${year}`"
    :isLoading="isLoading"
    :hasError="hasError"
    :limitedList="$options.name"
  >
    <template scope="props">
      <center v-show="!holidays.length && !hasError && !isLoading">
        Nenhum feriado restante em {{ year }}
      </center>
      <div v-show="holidays.length && !hasError">
        <v-row class="mb-n4">
          <v-col>
            <div
              v-for="(holiday, index) in holidays"
              :key="index"
              :class="!props.listsAll && 'limited-list5'"
            >
              <div class="subtitle-2">{{ holiday }}</div>
              <v-divider class="my-2"></v-divider>
            </div>
          </v-col>
        </v-row>
      </div>
    </template>
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

        const uf = this.preferences.uf.value;
        const city = this.valueHandlers_slugify(this.preferences.city);
        const path = `holidays?uf=${uf}&city=${city}`;

        try {
          this.holidays = await this.apiServices_getData(path);
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

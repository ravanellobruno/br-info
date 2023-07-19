<template>
  <CommonCard
    icon="mdi-soccer"
    title="Meu time"
    :isLoading="isLoading"
    :hasError="hasError"
  >
    <div v-show="Object.keys(matches).length && !hasError">
      <v-row class="mb-n4">
        <v-col class="text-center">
          <h5 class="mb-2">
            Último jogo:
            {{ matches.previousMatch?.competition }}
            <small class="match-date">
              -
              {{
                matches.previousMatch?.date
                  ? matches.previousMatch?.date
                  : matches.previousMatch?.live
                  ? `AGORA - ${matches.previousMatch?.live}`
                  : 'HOJE'
              }}
            </small>
          </h5>
          <center>
            <table width="50%" class="text-center">
              <tr>
                <td width="33.33%">
                  <img width="25px" :src="matches.previousMatch?.team1.logo" />
                  <small class="d-block">
                    {{ matches.previousMatch?.team1.name }}
                  </small>
                </td>
                <td width="33.33%">
                  {{ matches.previousMatch?.score }}
                </td>
                <td width="33.33%">
                  <img width="25px" :src="matches.previousMatch?.team2.logo" />
                  <small class="d-block">
                    {{ matches.previousMatch?.team2.name }}
                  </small>
                </td>
              </tr>
            </table>
          </center>
          <h5 class="mb-2 mt-4">
            Próximo jogo: {{ matches.nextMatch?.competition }}
            <small class="match-date">
              -
              {{ matches.nextMatch?.date }}
            </small>
          </h5>
          <center>
            <table width="50%" class="text-center">
              <tr>
                <td width="33.33%">
                  <img width="25px" :src="matches.nextMatch?.team1.logo" />
                  <small class="d-block">
                    {{ matches.nextMatch?.team1.name }}
                  </small>
                </td>
                <td width="33.33%">x</td>
                <td width="33.33%">
                  <img width="25px" :src="matches.nextMatch?.team2.logo" />
                  <small class="d-block">
                    {{ matches.nextMatch?.team2.name }}
                  </small>
                </td>
              </tr>
            </table>
          </center>
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
  name: 'MySoccerTeam',
  components: { CommonCard },
  mixins: [valueHandlers, apiServices],
  data() {
    return {
      matches: {},
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

        try {
          this.matches = await this.apiServices_getData(
            `my-soccer-team?team=${this.preferences.soccerTeam}`
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

<style lang="scss" scoped>
.match-date {
  text-transform: uppercase;
}

@media only screen and (max-width: 500px) {
  table {
    width: 75%;
  }
}
</style>

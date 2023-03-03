<template>
  <CommonCard
    icon="mdi-soccer"
    title="Meu time"
    :isLoading="isLoading"
    :hasError="hasError"
  >
    <div v-show="Object.keys(teamMatches).length && !hasError">
      <v-row class="mb-n4">
        <v-col class="text-center">
          <h5 class="mb-2">
            Último jogo:
            {{ teamMatches.previousMatch?.competition }}
            <small class="match-date">
              -
              {{
                teamMatches.previousMatch?.date
                  ? teamMatches.previousMatch?.date
                  : teamMatches.previousMatch?.live
                  ? `AGORA - ${teamMatches.previousMatch?.live}`
                  : 'HOJE'
              }}
            </small>
          </h5>
          <center>
            <table width="50%" class="text-center">
              <tr>
                <td width="33.33%">
                  <img
                    width="25px"
                    :src="teamMatches.previousMatch?.team1Logo"
                  />
                  <small class="d-block">
                    {{ teamMatches.previousMatch?.team1Name }}
                  </small>
                </td>
                <td width="33.33%">
                  {{ teamMatches.previousMatch?.score }}
                </td>
                <td width="33.33%">
                  <img
                    width="25px"
                    :src="teamMatches.previousMatch?.team2Logo"
                  />
                  <small class="d-block">
                    {{ teamMatches.previousMatch?.team2Name }}
                  </small>
                </td>
              </tr>
            </table>
          </center>
          <h5 class="mb-2 mt-4">
            Próximo jogo: {{ teamMatches.nextMatch?.competition }}
            <small class="match-date">
              -
              {{ teamMatches.nextMatch?.date }}
            </small>
          </h5>
          <center>
            <table width="50%" class="text-center">
              <tr>
                <td width="33.33%">
                  <img width="25px" :src="teamMatches.nextMatch?.team1Logo" />
                  <small class="d-block">
                    {{ teamMatches.nextMatch?.team1Name }}
                  </small>
                </td>
                <td width="33.33%">x</td>
                <td width="33.33%">
                  <img width="25px" :src="teamMatches.nextMatch?.team2Logo" />
                  <small class="d-block">
                    {{ teamMatches.nextMatch?.team2Name }}
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
import ValueHandlers from '@/mixins/ValueHandlers';
import ApiServices from '@/services/ApiServices';

export default {
  name: 'MySoccerTeam',
  components: { CommonCard },
  mixins: [ValueHandlers, ApiServices],
  data() {
    return {
      teamMatches: {},
      isLoading: false,
      newRequestTimer: null,
      hasError: false,
    };
  },
  computed: {
    ...mapState('ModuleUser', ['preferences']),
  },
  created() {
    this.getTeamMatches();

    this.newRequestTimer = setInterval(() => {
      this.getTeamMatches();
    }, 60000);
  },
  beforeDestroy() {
    clearInterval(this.newRequestTimer);
  },
  methods: {
    async getTeamMatches() {
      this.isLoading = true;
      this.hasError = false;

      try {
        this.teamMatches = await this.getData(
          `my-soccer-team?team=${this.preferences.soccerTeam}`
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

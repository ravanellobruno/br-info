<template>
  <CommonCard icon="mdi-soccer" title="Meu time" :isLoading="isLoading" :hasErr="hasErr">
    <div v-show="Object.keys(matches).length && !hasErr && team">
      <v-row class="mb-n4">
        <v-col class="text-center">
          <center>
            <h5 class="mb-2">
              Último jogo:
              {{ matches.previous?.competition }}
              <small class="match-date">
                -
                {{
                  matches.previous?.date
                    ? matches.previous?.date
                    : matches.previous?.live
                    ? `AGORA - ${matches.previous?.live}`
                    : 'HOJE'
                }}
              </small>
            </h5>
            <table class="match">
              <tr>
                <td class="match-td">
                  <img class="team-img" :src="matches.previous?.team1.logo" />
                  <small class="d-block">
                    {{ matches.previous?.team1.name }}
                  </small>
                </td>
                <td class="match-td">{{ matches.previous?.score }}</td>
                <td class="match-td">
                  <img class="team-img" :src="matches.previous?.team2.logo" />
                  <small class="d-block">
                    {{ matches.previous?.team2.name }}
                  </small>
                </td>
              </tr>
            </table>
          </center>
          <center v-if="matches.next?.competition">
            <h5 class="mb-2 mt-4">
              Próximo jogo: {{ matches.next?.competition }}
              <small class="match-date">
                -
                {{ matches.next?.date }}
              </small>
            </h5>
            <table class="match">
              <tr>
                <td class="match-td">
                  <img class="team-img" :src="matches.next?.team1.logo" />
                  <small class="d-block">
                    {{ matches.next?.team1.name }}
                  </small>
                </td>
                <td class="match-td">x</td>
                <td class="match-td">
                  <img class="team-img" :src="matches.next?.team2.logo" />
                  <small class="d-block">
                    {{ matches.next?.team2.name }}
                  </small>
                </td>
              </tr>
            </table>
          </center>
        </v-col>
      </v-row>
    </div>
    <center v-show="!this.team">
      Selecione seu time favorito clicando
      <b class="configs-link" @click="toggleConfigsIsVisible">aqui</b>
      para utilizar este serviço
    </center>
  </CommonCard>
</template>

<script>
import { mapState, mapActions } from 'vuex';
import CommonCard from '@/components/common/CommonCard';
import apiService from '@/services/apiService';

export default {
  name: 'MySoccerTeam',
  components: { CommonCard },
  mixins: [apiService],
  data() {
    return {
      matches: {},
      isLoading: false,
      hasErr: false,
    };
  },
  computed: {
    ...mapState('user', ['preferences']),
    ...mapState('common', ['dataLoad']),

    team() {
      return this.preferences.soccerTeam;
    },
  },
  watch: {
    dataLoad: {
      async handler() {
        if (this.team) {
          this.isLoading = true;
          this.hasErr = false;
          const path = `my-soccer-team?team=${this.team}`;

          try {
            this.matches = await this.apiService_getData(path);
          } catch (err) {
            this.hasErr = true;
          } finally {
            this.isLoading = false;
          }
        }
      },

      immediate: true,
    },
  },
  methods: {
    ...mapActions('common', ['toggleConfigsIsVisible']),
  },
};
</script>

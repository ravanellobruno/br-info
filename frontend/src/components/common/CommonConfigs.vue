<template>
  <v-dialog
    v-model="isConfigsVisible"
    fullscreen
    hide-overlay
    transition="dialog-bottom-transition"
  >
    <v-card v-if="Object.keys(form).length">
      <div class="py-5 px-6 blue lighten-5">
        <span>
          <v-btn
            v-if="form.isFilled"
            class="back-btn"
            absolute
            left
            icon
            @click="toggleIsConfigsVisible"
          >
            <v-icon large>mdi-keyboard-backspace</v-icon>
          </v-btn>
        </span>
      </div>
      <v-card
        width="80%"
        max-width="1200px"
        class="rounded-0 mx-auto mt-3"
        elevation="0"
      >
        <div class="pb-8">
          <v-row class="mb-n7 mt-5">
            <v-col>
              <h4>
                {{
                  !form.isFilled
                    ? 'Antes de começarmos, selecione as seguintes opções:'
                    : ''
                }}
              </h4>
            </v-col>
          </v-row>
          <v-form ref="form">
            <v-row>
              <v-col cols="12" md="3" class="mb-n8 mt-3">
                <v-autocomplete
                  v-model="form.uf.value"
                  :rules="[valueValidations_validateValue]"
                  validate-on-blur
                  color="green"
                  no-data-text="Nenhuma opção disponível"
                  :items="ufs"
                  item-value="value"
                  item-text="name"
                  outlined
                  clearable
                  placeholder="Selecione seu estado *"
                  @change="proceedGetCities(true)"
                ></v-autocomplete>
              </v-col>
              <v-col cols="12" md="3" class="mb-n8 mt-3">
                <v-autocomplete
                  v-model="form.city"
                  :rules="[valueValidations_validateValue]"
                  validate-on-blur
                  :loading="isLoadingCities"
                  :disabled="isLoadingCities"
                  :class="isLoadingCities ? 'less-opacity' : ''"
                  loader-height="6"
                  color="green"
                  no-data-text="Selecione um estado"
                  :items="cities"
                  item-value="nome"
                  item-text="nome"
                  outlined
                  clearable
                  :placeholder="
                    isLoadingCities ? 'Carregando..' : 'Selecione sua cidade *'
                  "
                ></v-autocomplete>
              </v-col>
              <v-col cols="12" md="3" class="mb-n8 mt-3">
                <v-autocomplete
                  v-model="form.soccerTeam"
                  :rules="[valueValidations_validateValue]"
                  validate-on-blur
                  color="green"
                  no-data-text="Nenhuma opção disponível"
                  :items="soccerTeams"
                  item-value="value"
                  item-text="nome"
                  outlined
                  clearable
                  placeholder="Selecione seu time favorito *"
                ></v-autocomplete>
              </v-col>
              <v-col cols="12" md="3" class="mb-n8 mt-3">
                <v-alert v-if="isCitiesEmpty" outlined shaped type="error">
                  Não foi possível carregar as cidades referentes ao estado
                </v-alert>
                <v-btn
                  :disabled="isCitiesEmpty || !isFormCompleted"
                  block
                  color="success"
                  height="54px"
                  class="mb-16"
                  @click="confirmUserPreferences"
                >
                  <span class="confirm-preferences-btn-text">Confirmar</span>
                </v-btn>
              </v-col>
            </v-row>
          </v-form>
          <div>
            <p class="mb-2">Ative e ordene a aparição dos seus cards:</p>
            <draggable v-model="form.cards">
              <transition-group>
                <v-card
                  v-for="card in form.cards"
                  :key="card.id"
                  class="mb-2 px-3 py-2 teal accent-4"
                >
                  <v-row>
                    <v-col class="mb-n5 pb-n4" cols="7">
                      <small class="white--text">
                        {{ card.title }} -
                        {{ card.active ? 'Ativo' : 'Inativo' }}
                      </small>
                    </v-col>
                    <v-col class="mb-n5 pb-n4" cols="5">
                      <v-btn class="float-right ml-4 reorder-btn" icon>
                        <v-icon color="white">mdi-arrow-all</v-icon>
                      </v-btn>
                      <v-switch
                        v-model="card.active"
                        class="ma-0 pa-0 float-right"
                        color="white"
                      ></v-switch>
                    </v-col>
                  </v-row>
                </v-card>
              </transition-group>
            </draggable>
            <v-chip
              v-show="checkedCardsTotal < form.cards.length"
              small
              color="blue-grey lighten-4"
              class="ml-2 mt-2"
              @click="setAllCardsStatus(true)"
            >
              Marcar todos
            </v-chip>
            <v-chip
              v-show="checkedCardsTotal > 0"
              small
              color="blue-grey lighten-4"
              class="ml-2 mt-2"
              @click="setAllCardsStatus(false)"
            >
              Desmarcar todos
            </v-chip>
          </div>
        </div>
      </v-card>
    </v-card>
  </v-dialog>
</template>

<script>
import { mapState, mapActions } from 'vuex';
import valueValidations from '@/mixins/valueValidations';
import draggable from 'vuedraggable';
import apiServices from '@/services/apiServices';
import ufs from '@/defaultData/ufs';
import soccerTeams from '@/defaultData/soccerTeams';

export default {
  name: 'CommonConfigs',
  components: {
    draggable,
  },
  mixins: [valueValidations, apiServices],
  data() {
    return {
      isUpdating: false,
      isLoadingCities: false,
      cities: [],
      form: {},
      ufs,
      soccerTeams,
    };
  },
  computed: {
    ...mapState('user', ['preferences']),
    ...mapState('common', ['isConfigsVisible']),

    isCitiesEmpty() {
      return this.form.uf.value && !this.isLoadingCities && !this.cities.length;
    },

    isFormCompleted() {
      return this.form.uf.value && this.form.city && this.form.soccerTeam;
    },

    checkedCardsTotal() {
      const checkedCards = this.form.cards.filter((card) => card.active);
      return checkedCards.length;
    },
  },
  watch: {
    isConfigsVisible: function (newValue) {
      if (newValue) {
        this.form = JSON.parse(JSON.stringify(this.preferences));
        this.proceedGetCities(false);
      } else {
        this.$refs.form.resetValidation();
      }
    },
  },
  methods: {
    ...mapActions('user', ['setPreferences']),
    ...mapActions('data', ['loadData']),
    ...mapActions('common', ['toggleIsConfigsVisible']),

    async proceedGetCities(removeSelectedCity) {
      if (removeSelectedCity) {
        this.form.city = '';
      }

      this.isLoadingCities = true;

      this.cities = [];

      try {
        this.cities = await this.apiServices_getCities(this.form.uf.value);
      } catch (error) {
        console.log(error);
      } finally {
        this.isLoadingCities = false;
      }
    },

    confirmUserPreferences() {
      if (!this.$refs.form.validate() || !this.cities.length) {
        return;
      }

      this.ufs.forEach((element) => {
        if (element.value === this.form.uf.value) {
          this.form.uf.name = element.name;
        }
      });

      this.form.isFilled = true;
      this.setPreferences(JSON.stringify(this.form));
      this.loadData();
      this.toggleIsConfigsVisible();
    },

    setAllCardsStatus(value) {
      this.form.cards.forEach((element) => {
        element.active = value;
      });
    },
  },
};
</script>

<style lang="scss" scoped>
.confirm-preferences-btn-text {
  color: white !important;
}

.reorder-btn {
  position: relative;
  left: 5px;
  bottom: 5px;
  cursor: grab;
}

.back-btn {
  top: 3px;
}
</style>

<template>
  <v-dialog
    v-model="configsIsVisible"
    persistent
    fullscreen
    hide-overlay
    transition="dialog-bottom-transition"
  >
    <v-card v-if="Object.keys(form).length">
      <div class="py-5 px-6 blue lighten-5">
        <v-btn
          v-if="form.isFilled"
          class="back-btn"
          absolute
          left
          icon
          @click="toggleConfigsIsVisible"
        >
          <v-icon large>mdi-keyboard-backspace</v-icon>
        </v-btn>
        <h3 v-else class="py-0 mt-n3 mb-n4">{{ appTitle }}</h3>
      </div>
      <v-card class="config-options">
        <div class="pb-8">
          <v-row class="mb-n7 mt-5">
            <v-col>
              <h4 class="top-text">
                {{
                  !form.isFilled
                    ? 'Antes de começarmos, selecione as seguintes opções:'
                    : 'Configurações:'
                }}
              </h4>
            </v-col>
          </v-row>
          <v-form ref="form">
            <v-row>
              <v-col cols="12" md="3" class="mb-n8 mt-1">
                <v-autocomplete
                  v-model="form.uf.value"
                  :rules="[validationHelper_validateField]"
                  validate-on-blur
                  color="green"
                  :no-data-text="noOptionText"
                  :items="ufs"
                  item-value="value"
                  item-text="name"
                  :filter="formatHelper_autocomplete"
                  outlined
                  clearable
                  placeholder="Selecione seu estado *"
                  @change="proceedGetCities(true)"
                />
              </v-col>
              <v-col cols="12" md="3" class="mb-n8 mt-1">
                <v-autocomplete
                  v-model="form.city"
                  :rules="[validationHelper_validateField]"
                  validate-on-blur
                  :loading="isLoadingCities"
                  :disabled="isLoadingCities"
                  :class="isLoadingCities ? 'half-opacity' : ''"
                  loader-height="6"
                  color="green"
                  :no-data-text="form.uf.value ? noOptionText : 'Selecione um estado'"
                  :items="cities"
                  item-value="nome"
                  item-text="nome"
                  :filter="formatHelper_autocomplete"
                  outlined
                  clearable
                  :placeholder="isLoadingCities ? 'Carregando..' : 'Selecione sua cidade *'"
                />
              </v-col>
              <v-col cols="12" md="3" class="mb-n8 mt-1">
                <v-autocomplete
                  v-model="form.soccerTeam"
                  validate-on-blur
                  color="green"
                  :no-data-text="noOptionText"
                  :items="soccerTeams"
                  item-value="value"
                  item-text="name"
                  :filter="formatHelper_autocomplete"
                  outlined
                  clearable
                  placeholder="Selecione seu time"
                />
              </v-col>
              <v-col cols="12" md="3" class="mb-n8 mt-1">
                <v-alert v-if="citiesIsEmpty" outlined shaped type="error">
                  Não foi possível carregar as cidades referentes ao estado
                </v-alert>
                <v-alert v-if="!isValidForm" outlined shaped type="error">
                  Preencha os campos obrigatórios para poder prosseguir
                </v-alert>
                <v-btn class="confirm-btn" @click="confirmUserPreferences">
                  <span class="confirm-btn-text">Confirmar</span>
                </v-btn>
              </v-col>
            </v-row>
          </v-form>
          <div class="mt-n4">
            <p class="mb-2">Ative e ordene a aparição dos seus cards:</p>
            <draggable v-model="form.cards" :options="{ handle: '.reorder-btn' }">
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
                        {{ card.isActive ? 'Ativo' : 'Inativo' }}
                      </small>
                    </v-col>
                    <v-col class="mb-n5 pb-n4" cols="5">
                      <v-btn class="float-right ml-4 reorder-btn" icon>
                        <v-icon color="white">mdi-arrow-all</v-icon>
                      </v-btn>
                      <v-switch
                        v-model="card.isActive"
                        class="ma-0 pa-0 float-right"
                        color="white"
                      />
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
import validationHelper from '@/helpers/validationHelper';
import formatHelper from '@/helpers/formatHelper';
import draggable from 'vuedraggable';
import apiService from '@/services/apiService';
import ufs from '@/defaultData/ufs';
import soccerTeams from '@/defaultData/soccerTeams';

export default {
  name: 'UserConfigs',
  components: {
    draggable,
  },
  mixins: [validationHelper, apiService, formatHelper],
  data() {
    return {
      isUpdating: false,
      isLoadingCities: false,
      cities: [],
      form: {},
      ufs,
      soccerTeams,
      noOptionText: 'Nenhuma opção disponível',
      isValidForm: true,
    };
  },
  computed: {
    ...mapState('user', ['preferences']),
    ...mapState('common', ['configsIsVisible', 'appTitle']),

    citiesIsEmpty() {
      return this.form.uf.value && !this.isLoadingCities && !this.cities.length;
    },

    checkedCardsTotal() {
      const checkedCards = this.form.cards.filter((card) => card.isActive);
      return checkedCards.length;
    },
  },
  watch: {
    configsIsVisible: function (newValue) {
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
    ...mapActions('common', ['toggleConfigsIsVisible', 'loadData']),

    async proceedGetCities(removeSelectedCity) {
      if (removeSelectedCity) {
        this.form.city = '';
      }

      this.isLoadingCities = true;
      this.cities = [];

      try {
        this.cities = await this.apiService_getCities(this.form.uf.value);
      } catch (err) {
        console.log(err);
      } finally {
        this.isLoadingCities = false;
      }
    },

    confirmUserPreferences() {
      this.isValidForm = true;

      if (!this.$refs.form.validate()) {
        this.isValidForm = false;
        return;
      }

      this.ufs.forEach((uf) => {
        if (uf.value === this.form.uf.value) {
          this.form.uf.name = uf.name;
        }
      });

      this.form.isFilled = true;
      this.setPreferences(JSON.stringify(this.form));
      this.toggleConfigsIsVisible();

      this.$route.name === 'home'
        ? this.loadData()
        : this.$router.push(this.$router.options.routes[0].path);
    },

    setAllCardsStatus(status) {
      this.form.cards.forEach((card) => {
        card.isActive = status;
      });
    },
  },
};
</script>

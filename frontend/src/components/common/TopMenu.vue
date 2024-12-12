<template>
  <div id="topMenu">
    <v-app-bar dense color="green accent-2">
      <v-app-bar-nav-icon @click="drawer = !drawer" />
      <router-link :to="routes[0].path">
        <h2 class="pl-7">{{ appTitle }}</h2>
      </router-link>
      <small class="pl-7 mt-1">
        App de
        <b>informações</b>
      </small>
    </v-app-bar>
    <v-navigation-drawer v-model="drawer" fixed bottom temporary>
      <v-list nav dense>
        <v-list-item-group v-model="group" class="mt-3">
          <router-link v-for="route in routes" :key="route.title" :to="route.path">
            <v-list-item class="route-item">
              <v-icon color="green" small class="mr-2 mb-1">
                {{ route.icon }}
              </v-icon>
              {{ route.title }}
            </v-list-item>
          </router-link>
          <div @click="toggleConfigsIsVisible">
            <v-list-item class="route-item">
              <v-icon color="green" small class="mr-2 mb-1">mdi-cog</v-icon>
              Configurações
            </v-list-item>
          </div>
        </v-list-item-group>
      </v-list>
    </v-navigation-drawer>
  </div>
</template>

<script>
import { mapState, mapActions } from 'vuex';

export default {
  name: 'TopMenu',
  data: () => ({
    drawer: false,
    group: null,
  }),
  computed: {
    ...mapState('user', ['preferences']),
    ...mapState('common', ['appTitle']),

    routes() {
      return this.$router.options.routes;
    },
  },
  watch: {
    group() {
      this.drawer = false;
    },
  },
  created() {
    !this.preferences.isFilled && this.toggleConfigsIsVisible();
  },
  methods: {
    ...mapActions('common', ['toggleConfigsIsVisible']),
  },
};
</script>

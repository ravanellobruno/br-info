<template>
  <div id="topMenu">
    <v-system-bar height="4" color="yellow"></v-system-bar>
    <v-app-bar dense color="green accent-3">
      <v-app-bar-nav-icon @click="drawer = !drawer"></v-app-bar-nav-icon>
      <router-link :to="routes[0].to">
        <h2 class="pl-7">BR Info</h2>
      </router-link>
      <small class="pl-7 mt-1">
        App de
        <b>informações</b>
      </small>
    </v-app-bar>
    <v-navigation-drawer v-model="drawer" fixed bottom temporary>
      <v-list nav dense>
        <v-list-item-group v-model="group" class="mt-3">
          <router-link
            v-for="route in routes"
            :key="route.title"
            :to="route.to"
          >
            <v-list-item>
              <v-icon color="green" small class="mr-2">{{ route.icon }}</v-icon>
              {{ route.title }}
            </v-list-item>
          </router-link>
          <div @click="toggleIsConfigsVisible">
            <v-list-item>
              <v-icon color="green" small class="mr-2">mdi-cog</v-icon>
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
    routes: [
      { title: 'Início', icon: 'mdi-home', to: '/' },
      { title: 'Sobre o BR Info', icon: 'mdi-information', to: '/sobre' },
      { title: 'Contato', icon: 'mdi-email', to: '/contato' },
    ],
  }),
  computed: {
    ...mapState('user', ['preferences']),
  },
  watch: {
    group() {
      this.drawer = false;
    },
  },
  created() {
    !this.preferences.isFilled && this.toggleIsConfigsVisible();
  },
  methods: {
    ...mapActions('common', ['toggleIsConfigsVisible']),
  },
};
</script>

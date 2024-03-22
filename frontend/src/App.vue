<template>
  <v-app>
    <v-main class="mb-16">
      <UserConfigs />
      <TopMenu />
      <router-view v-if="preferences.isFilled" class="view" />
    </v-main>
  </v-app>
</template>

<script>
import { mapState } from 'vuex';
import TopMenu from '@/components/common/TopMenu';
import UserConfigs from '@/components/UserConfigs';

export default {
  name: 'App',
  components: { TopMenu, UserConfigs },
  computed: {
    ...mapState('user', ['preferences']),
  },
};
</script>

<template>
  <v-app>
    <v-main class="mb-16">
      <CommonConfigs />
      <TopMenu />
      <router-view v-if="preferences.isFilled" class="view"></router-view>
    </v-main>
  </v-app>
</template>

<script>
import { mapState } from 'vuex';
import TopMenu from '@/components/common/TopMenu';
import CommonConfigs from '@/components/common/CommonConfigs';

export default {
  name: 'App',
  components: { TopMenu, CommonConfigs },
  computed: {
    ...mapState('user', ['preferences']),
  },
};
</script>

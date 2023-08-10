<template>
  <v-app>
    <v-main class="mb-16">
      <CommonConfigs />
      <TopMenu />
      <router-view
        v-if="preferences.isFilled"
        max-width="1200px"
        class="px-2"
      ></router-view>
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

<style lang="scss">
html {
  scroll-behavior: smooth;
}

* {
  color: darkblue !important;
  text-decoration: none !important;
}

input::placeholder {
  color: darkblue !important;
  opacity: 1;
}

.error--text * {
  color: crimson !important;
}

.error--text *::placeholder {
  color: crimson !important;
}

.error-alert-box {
  color: crimson !important;
  border: 1px dotted crimson;
  white-space: pre-line;
}

.less-opacity {
  opacity: 0.5;
}
</style>

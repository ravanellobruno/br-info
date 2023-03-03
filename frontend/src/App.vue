<template>
  <v-app>
    <v-main class="mb-16">
      <UserPreferences />
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
import UserPreferences from '@/components/UserPreferences';

export default {
  name: 'App',
  components: { TopMenu, UserPreferences },
  computed: {
    ...mapState('ModuleUser', ['preferences']),
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
  color: rgb(255, 0, 64) !important;
}

.error--text *::placeholder {
  color: rgb(255, 0, 64) !important;
}

.error-alert-box {
  color: rgb(255, 0, 64) !important;
  border: 1px dotted rgb(255, 0, 64);
  border-radius: 10px;
  white-space: pre-line;
}

.less-opacity {
  opacity: 0.5;
}
</style>

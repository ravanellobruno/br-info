<template>
  <CommonPage :title="$router.options.routes[1].title">
    <template>
      O
      <b>{{ appTitle }}</b>
      é um app público de informações úteis para o dia a dia.
    </template>
  </CommonPage>
</template>

<script>
import CommonPage from '@/components/common/CommonPage';
import { mapState } from 'vuex';

export default {
  name: 'AboutPage',
  components: { CommonPage },
  computed: {
    ...mapState('common', ['appTitle']),
  },
};
</script>

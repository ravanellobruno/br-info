<template>
  <PostList
    icon="mdi-newspaper-variant-outline"
    title="Últimas notícias"
    :isLoading="isLoading"
    :hasError="hasError"
    :limitedList="$options.name"
    :posts="news"
  />
</template>

<script>
import { mapState } from 'vuex';
import PostList from '@/components/common/PostList';
import apiServices from '@/services/apiServices';
import valueHandlers from '@/mixins/valueHandlers';

export default {
  name: 'LastNews',
  components: { PostList },
  mixins: [valueHandlers, apiServices],
  data() {
    return {
      news: [],
      isLoading: false,
      hasError: false,
    };
  },
  computed: {
    ...mapState('user', ['preferences']),
    ...mapState('data', ['dataLoad']),
  },
  watch: {
    dataLoad: {
      async handler() {
        this.isLoading = true;
        this.hasError = false;

        const ufValue = this.preferences.uf.value;
        const ufName = this.valueHandlers_slugify(this.preferences.uf.name);
        const path = `last-news?ufValue=${ufValue}&ufName=${ufName}`;

        try {
          this.news = await this.apiServices_getData(path);
        } catch (error) {
          this.hasError = true;
        } finally {
          this.isLoading = false;
        }
      },

      immediate: true,
    },
  },
};
</script>

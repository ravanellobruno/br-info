<template>
  <PostList
    icon="mdi-atom"
    title="Ciência e tecnologia"
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

export default {
  name: 'ScienceTechNews',
  components: { PostList },
  mixins: [apiServices],
  data() {
    return {
      news: [],
      isLoading: false,
      hasError: false,
    };
  },
  computed: {
    ...mapState('data', ['dataLoad']),
  },
  watch: {
    dataLoad: {
      async handler() {
        this.isLoading = true;
        this.hasError = false;

        try {
          this.news = await this.apiServices_getData('science-tech-news');
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

<template>
  <CommonCard
    icon="mdi-newspaper-variant-outline"
    title="Últimas notícias"
    :isLoading="isLoading"
    :hasError="hasError"
  >
    <div v-show="Object.keys(news).length && !hasError">
      <v-row class="mb-n4">
        <v-col>
          <v-row>
            <v-col v-for="(item, index) in news" :key="index" cols="12">
              <a :href="item.href" target="_blank">
                <v-row>
                  <v-col :sm="item.image ? '8' : '12'">
                    <h4>{{ item.titulo }}</h4>
                    <small>{{ item.intro }}</small>
                  </v-col>
                  <v-col v-show="item.image" sm="4">
                    <img class="mt-2" width="100%" :src="item.image" />
                  </v-col>
                </v-row>
              </a>
            </v-col>
            <v-col></v-col>
          </v-row>
        </v-col>
      </v-row>
    </div>
  </CommonCard>
</template>

<script>
import CommonCard from '@/components/common/CommonCard';
import ApiServices from '@/services/ApiServices';

export default {
  name: 'LastNews',
  components: { CommonCard },
  mixins: [ApiServices],
  data() {
    return {
      news: {},
      isLoading: false,
      newRequestTimer: null,
      hasError: false,
    };
  },
  created() {
    this.getNews();

    this.newRequestTimer = setInterval(() => {
      this.getNews();
    }, 60000);
  },
  beforeDestroy() {
    clearInterval(this.newRequestTimer);
  },
  methods: {
    async getNews() {
      this.isLoading = true;
      this.hasError = false;

      try {
        this.news = await this.getData(`last-news-today/`);
      } catch (error) {
        this.hasError = true;
      } finally {
        this.isLoading = false;
      }
    },
  },
};
</script>

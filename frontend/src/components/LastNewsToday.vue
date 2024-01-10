<template>
  <CommonCard
    icon="mdi-newspaper-variant-outline"
    title="Últimas notícias"
    :isLoading="isLoading"
    :hasError="hasError"
    :limitedListBtnText="`Ver ${showsAll ? 'menos' : 'mais'}`"
    @toggleLimitedList="showsAll = !showsAll"
  >
    <div v-show="Object.keys(news).length && !hasError">
      <v-row class="mb-n4">
        <v-col>
          <v-row>
            <v-col
              v-for="(item, index) in news"
              :key="index"
              cols="12"
              :class="!showsAll && 'limited-list3'"
            >
              <v-card class="item-wrap" :href="item.href" target="_blank">
                <img class="item-img" v-show="item.image" :src="item.image" />
                <h4>{{ item.titulo }}</h4>
                <small>
                  {{ item.intro }}
                  <b>[Ler mais]</b>
                </small>
              </v-card>
            </v-col>
          </v-row>
        </v-col>
      </v-row>
    </div>
  </CommonCard>
</template>

<script>
import { mapState } from 'vuex';
import CommonCard from '@/components/common/CommonCard';
import apiServices from '@/services/apiServices';

export default {
  name: 'LastNews',
  components: { CommonCard },
  mixins: [apiServices],
  data() {
    return {
      news: {},
      isLoading: false,
      hasError: false,
      showsAll: false,
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
          this.news = await this.apiServices_getData(`last-news-today/`);
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

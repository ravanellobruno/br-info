<template>
  <CommonCard :icon="icon" :title="title" :isLoading="isLoading" :hasErr="hasErr">
    <template>
      <div v-show="items.length && !hasErr">
        <v-dialog v-model="showsAll" content-class="list-dialog">
          <v-btn small class="close-list-btn small" @click="showsAll = !showsAll">Fechar</v-btn>
          <v-card class="pa-6">
            <v-component :is="listComponent" :items="items" />
          </v-card>
        </v-dialog>
        <div>
          <v-component :is="listComponent" :items="items" class="list" />
          <v-btn small class="show-all-btn" @click="showsAll = !showsAll">Ver mais</v-btn>
        </div>
      </div>
      <center v-show="!items.length && !hasErr && !isLoading">
        Nenhum registro para ser exibido
      </center>
    </template>
  </CommonCard>
</template>

<script>
import { mapState } from 'vuex';
import CommonCard from '@/components/common/CommonCard';
import HolidaysList from '@/components/yearHolidays/HolidaysList';
import SongsList from '@/components/topSongs/SongsList';
import SeriesList from '@/components/topSeries/SeriesList';
import NewsList from '@/components/news/NewsList';
import apiService from '@/services/apiService';
import formatHelper from '@/helpers/formatHelper';

export default {
  name: 'ListCardContainer',
  components: { CommonCard, HolidaysList, SongsList, NewsList, SeriesList },
  mixins: [apiService, formatHelper],
  props: {
    icon: {
      type: String,
      required: true,
    },
    title: {
      type: String,
      required: true,
    },
    listComponent: {
      type: String,
      required: true,
    },
    path: {
      type: String,
      required: true,
    },
  },
  data() {
    return {
      showsAll: false,
      items: [],
      isLoading: false,
      hasErr: false,
    };
  },
  computed: {
    ...mapState('common', ['dataLoad']),
    ...mapState('user', ['preferences']),
  },
  watch: {
    dataLoad: {
      async handler() {
        this.isLoading = true;
        this.hasErr = false;
        let path = this.path;

        if (['holidays', 'last-news'].includes(path)) {
          const ufValue = this.preferences.uf.value;
          const ufName = this.formatHelper_slug(this.preferences.uf.name);
          const city = this.formatHelper_slug(this.preferences.city);

          path +=
            path === 'holidays'
              ? `?uf=${ufValue}&city=${city}`
              : `?ufValue=${ufValue}&ufName=${ufName}`;
        }

        try {
          this.items = await this.apiService_getData(path);
        } catch (err) {
          this.hasErr = true;
        } finally {
          this.isLoading = false;
        }
      },

      immediate: true,
    },
  },
};
</script>

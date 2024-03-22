<template>
  <CommonCard
    :icon="icon"
    :title="title"
    :isLoading="isLoading"
    :hasError="hasError"
  >
    <template>
      <div v-show="items.length && !hasError">
        <v-dialog v-model="showsAll" content-class="list-dialog">
          <v-btn
            small
            class="list-dialog-close-btn small"
            @click="showsAll = !showsAll"
          >
            Fechar
          </v-btn>
          <v-card class="pa-6">
            <v-component :is="listComponent" :items="items" />
          </v-card>
        </v-dialog>
        <div>
          <v-component :is="listComponent" :items="items" class="list" />
          <v-btn small class="show-all-btn" @click="showsAll = !showsAll">
            Ver mais
          </v-btn>
        </div>
      </div>
      <center v-show="!items.length && !hasError && !isLoading">
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
import NewsList from '@/components/common/NewsList';
import apiServices from '@/services/apiServices';
import valueHandlers from '@/mixins/valueHandlers';

export default {
  name: 'ListCardContainer',
  components: { CommonCard, HolidaysList, SongsList, NewsList },
  mixins: [apiServices, valueHandlers],
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
    dataPath: {
      type: String,
      required: true,
    },
  },
  data() {
    return {
      showsAll: false,
      items: [],
      isLoading: false,
      hasError: false,
    };
  },
  computed: {
    ...mapState('data', ['dataLoad']),
    ...mapState('user', ['preferences']),
  },
  watch: {
    dataLoad: {
      async handler() {
        this.isLoading = true;
        this.hasError = false;
        let path = this.dataPath;

        if (['holidays', 'last-news'].includes(path)) {
          const ufValue = this.preferences.uf.value;
          const ufName = this.valueHandlers_slugify(this.preferences.uf.name);
          const city = this.valueHandlers_slugify(this.preferences.city);

          path +=
            path === 'holidays'
              ? `?uf=${ufValue}&city=${city}`
              : `?ufValue=${ufValue}&ufName=${ufName}`;
        }

        try {
          this.items = await this.apiServices_getData(path);
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

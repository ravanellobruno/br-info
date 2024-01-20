<template>
  <CommonCard
    icon="mdi-radio"
    title="Top músicas hoje"
    :isLoading="isLoading"
    :hasError="hasError"
    :limitedList="$options.name"
  >
    <template scope="props">
      <div v-show="songs.length && !hasError">
        <v-row class="mb-n4">
          <v-col>
            <div
              v-for="(song, index) in songs"
              :key="index"
              :class="!props.listsAll && 'limited-list5'"
            >
              <a target="_blank" :href="song.href" class="mb-2 pb-2">
                <small>
                  <v-icon class="mr-3">mdi-play-circle</v-icon>
                  <b>{{ index + 1 }}</b>
                  - {{ song.song }} - {{ song.artist }}
                </small>
              </a>
              <v-divider class="my-2"></v-divider>
            </div>
          </v-col>
        </v-row>
      </div>
    </template>
  </CommonCard>
</template>

<script>
import { mapState } from 'vuex';
import CommonCard from '@/components/common/CommonCard';
import apiServices from '@/services/apiServices';

export default {
  name: 'TopSongsToday',
  components: { CommonCard },
  mixins: [apiServices],
  data() {
    return {
      songs: [],
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
          this.songs = await this.apiServices_getData(`top-songs-today/`);
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

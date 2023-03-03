<template>
  <CommonCard
    icon="mdi-radio"
    title="Top músicas hoje"
    :isLoading="isLoading"
    :hasError="hasError"
  >
    <div v-show="songs.length && !hasError">
      <v-row class="mb-n4">
        <v-col>
          <div v-for="(song, index) in songs" :key="index">
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
  </CommonCard>
</template>

<script>
import CommonCard from '@/components/common/CommonCard';
import ApiServices from '@/services/ApiServices';

export default {
  name: 'TopSongsToday',
  components: { CommonCard },
  mixins: [ApiServices],
  data() {
    return {
      songs: [],
      isLoading: false,
      newRequestTimer: null,
      hasError: false,
    };
  },
  created() {
    this.getTopSongs();

    this.newRequestTimer = setInterval(() => {
      this.getTopSongs();
    }, 60000);
  },
  beforeDestroy() {
    clearInterval(this.newRequestTimer);
  },
  methods: {
    async getTopSongs() {
      this.isLoading = true;
      this.hasError = false;

      try {
        this.songs = await this.getData(`top-songs-today/`);
      } catch (error) {
        this.hasError = true;
      } finally {
        this.isLoading = false;
      }
    },
  },
};
</script>

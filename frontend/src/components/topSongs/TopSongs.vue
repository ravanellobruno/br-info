<template>
  <ListCardContainer
    icon="mdi-radio"
    title="Top músicas"
    listComponent="SongsList"
    path="top-songs"
    class="limited-list-5"
  />
</template>

<script>
import ListCardContainer from '@/components/common/ListCardContainer';

export default {
  name: 'TopSongs',
  components: { ListCardContainer },
};
</script>

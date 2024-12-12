<template>
  <ListCardContainer
    icon="mdi-television"
    title="Top séries"
    listComponent="SeriesList"
    path="top-series"
    class="limited-list-2"
  />
</template>

<script>
import ListCardContainer from '@/components/common/ListCardContainer';

export default {
  name: 'TopSeries',
  components: { ListCardContainer },
};
</script>

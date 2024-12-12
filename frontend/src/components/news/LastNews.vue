<template>
  <ListCardContainer
    icon="mdi-newspaper-variant-outline"
    title="Últimas notícias"
    listComponent="NewsList"
    path="last-news"
    class="limited-list-2"
  />
</template>

<script>
import ListCardContainer from '@/components/common/ListCardContainer';

export default {
  name: 'LastNews',
  components: { ListCardContainer },
};
</script>

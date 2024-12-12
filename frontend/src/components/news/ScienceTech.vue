<template>
  <ListCardContainer
    icon="mdi-atom"
    title="Ciência e tecnologia"
    listComponent="NewsList"
    path="science-tech"
    class="limited-list-2"
  />
</template>

<script>
import ListCardContainer from '@/components/common/ListCardContainer';

export default {
  name: 'ScienceTech',
  components: { ListCardContainer },
};
</script>

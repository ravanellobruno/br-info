<template>
  <ListCardContainer
    icon="mdi-airplane-clock"
    :title="`Próximos feriados ${new Date().getFullYear()}`"
    listComponent="HolidaysList"
    dataPath="holidays"
    class="limited-list5"
  />
</template>

<script>
import ListCardContainer from '@/components/common/ListCardContainer';

export default {
  name: 'YearHolidays',
  components: { ListCardContainer },
};
</script>

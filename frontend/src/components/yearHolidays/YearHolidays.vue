<template>
  <ListCardContainer
    icon="mdi-airplane-clock"
    :title="`Próximos feriados ${new Date().getFullYear()}`"
    listComponent="HolidaysList"
    path="holidays"
    class="limited-list-5"
  />
</template>

<script>
import ListCardContainer from '@/components/common/ListCardContainer';

export default {
  name: 'YearHolidays',
  components: { ListCardContainer },
};
</script>

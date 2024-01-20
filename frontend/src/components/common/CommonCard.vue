<template>
  <v-card
    class="info-card px-8 pt-0 pb-3 overflow-auto rounded-xl rounded-tr-0"
    elevation="5"
    :loading="isLoading"
    :disabled="isLoading"
  >
    <div class="mb-4 pt-6">
      <v-icon color="green" class="mr-3 mb-1" medium>{{ icon }}</v-icon>
      <span class="green--text font-weight-bold">{{ title }}</span>
      <div v-show="!hasError && !isLoading">
        <div v-show="subtitle || icon2">
          <small class="ml-2 text-uppercase">{{ subtitle }}</small>
          <v-icon class="info-card-icon-2" large>{{ icon2 }}</v-icon>
        </div>
        <div class="mt-3">
          <slot v-if="limitedList" :listsAll="listsAll"></slot>
          <slot v-else></slot>
        </div>
      </div>
    </div>
    <center v-show="isLoading" class="mb-5">Aguarde..</center>
    <center v-show="hasError">Serviço indisponível no momento</center>
    <v-btn
      v-if="limitedList"
      small
      class="limited-list-btn"
      @click="listsAll = !listsAll"
    >
      Ver {{ listsAll ? 'menos' : 'mais' }}
    </v-btn>
  </v-card>
</template>

<script>
import { mapActions } from 'vuex';

export default {
  name: 'CommonCard',
  props: {
    icon: {
      type: String,
      required: true,
    },
    title: {
      type: String,
      required: true,
    },
    subtitle: {
      type: String,
      default: '',
    },
    isLoading: {
      type: Boolean,
      required: true,
    },
    icon2: {
      type: String,
      default: '',
    },
    hasError: {
      type: Boolean,
      required: true,
    },
    limitedList: {
      type: String,
      default: '',
    },
  },
  data() {
    return {
      listsAll: false,
    };
  },
  watch: {
    listsAll(newValue) {
      !newValue && this.scrollTo(this.limitedList);
    },
  },
  methods: {
    ...mapActions('common', ['scrollTo']),
  },
};
</script>

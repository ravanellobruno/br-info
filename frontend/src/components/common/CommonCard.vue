<template>
  <v-card
    class="card px-8 pt-0 pb-3 overflow-auto rounded-xl rounded-tr-0"
    elevation="5"
    :loading="isLoading"
    :disabled="isLoading"
  >
    <div class="mb-4 pt-6">
      <v-icon color="green" class="mr-3 mb-1" medium>{{ icon }}</v-icon>
      <span class="green--text font-weight-bold">{{ title }}</span>
      <div v-show="!hasErr && !isLoading">
        <div v-show="subtitle || icon2">
          <small class="ml-2 text-uppercase">{{ subtitle }}</small>
          <v-icon class="card-icon-2" large>{{ icon2 }}</v-icon>
        </div>
        <div class="mt-3">
          <slot />
        </div>
      </div>
    </div>
    <center v-show="isLoading" class="mb-5">Aguarde..</center>
    <center v-show="hasErr">Serviço indisponível no momento</center>
  </v-card>
</template>

<script>
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
    hasErr: {
      type: Boolean,
      required: true,
    },
  },
};
</script>

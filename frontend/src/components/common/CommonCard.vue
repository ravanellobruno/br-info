<template>
  <v-card
    :height="height"
    class="info-card pa-8 pt-0 overflow-auto rounded-xl rounded-tr-0"
    elevation="5"
    :loading="isLoading"
    :disabled="isLoading"
  >
    <div class="mb-4 pt-6">
      <v-icon color="green" class="mr-3 mb-1 icon" medium>{{ icon }}</v-icon>
      <span class="green--text font-weight-bold">{{ title }}</span>
      <div v-show="!hasError && !isLoading">
        <div v-show="subtitle || icon2">
          <small class="ml-2 text-uppercase">
            {{ subtitle }}
          </small>
          <v-icon class="icon2" large>
            {{ icon2 }}
          </v-icon>
        </div>
        <div class="mt-3">
          <slot></slot>
        </div>
      </div>
    </div>
    <center v-show="isLoading" class="mb-5">Aguarde..</center>
    <center v-show="hasError">Serviço não disponível no momento</center>
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
    height: {
      type: String,
      default: '315',
    },
    icon2: {
      type: String,
      default: '',
    },
    hasError: {
      type: Boolean,
      required: true,
    },
  },
};
</script>

<style lang="scss" scoped>
.icon2 {
  position: relative;
  bottom: 2px;
  left: 15px;
}

@media only screen and (max-width: 959px) {
  .info-card {
    margin: auto;
    width: 85%;
    padding-bottom: 40px !important;
  }
}
</style>

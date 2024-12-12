<template>
  <v-dialog v-model="visible" persistent width="300">
    <v-card color="primary" class="pt-2">
      <v-card-text>
        Aguarde
        <v-progress-linear indeterminate color="white" class="mb-0 mt-1" />
      </v-card-text>
    </v-card>
  </v-dialog>
</template>

<script>
export default {
  name: 'LoadingDialog',
  props: {
    isVisible: {
      type: Boolean,
      required: true,
    },
  },
  computed: {
    visible() {
      return this.isVisible;
    },
  },
};
</script>

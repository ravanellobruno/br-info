<template>
  <v-dialog v-model="msg" max-width="290" persistent>
    <v-card>
      <center class="font-weight-bold pa-6">{{ msg }}</center>
      <v-card-actions>
        <v-spacer />
        <v-btn
          color="blue"
          class="mb-2"
          outlined
          @click="$emit('clearMessage')"
        >
          Ok
        </v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script>
export default {
  name: 'LoadingDialog',
  props: {
    message: {
      type: String,
      required: true,
    },
  },
  computed: {
    msg: {
      get() {
        return this.message;
      },

      set(newValue) {
        return newValue;
      },
    },
  },
};
</script>

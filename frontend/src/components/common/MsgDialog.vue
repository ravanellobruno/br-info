<template>
  <v-dialog v-model="dialog" max-width="290" persistent>
    <v-card>
      <center class="font-weight-bold pa-6">{{ dialog }}</center>
      <v-card-actions>
        <v-spacer />
        <v-btn color="blue" class="mb-2" outlined @click="$emit('clearMsg')">Ok</v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script>
export default {
  name: 'MsgDialog',
  props: {
    msg: {
      type: String,
      required: true,
    },
  },
  computed: {
    dialog: {
      get() {
        return this.msg;
      },

      set(newValue) {
        return newValue;
      },
    },
  },
};
</script>

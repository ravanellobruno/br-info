<template>
  <p
    v-if="message"
    class="error-alert-box px-6 py-2 rounded mt-n6 mb-6 subtitle-2"
  >
    {{ message }}
  </p>
</template>

<script>
export default {
  name: 'ErrorBox',
  props: {
    message: {
      type: String,
      required: true,
    },
  },
};
</script>

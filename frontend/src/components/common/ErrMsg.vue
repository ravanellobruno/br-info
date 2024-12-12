<template>
  <p v-if="msg" class="err-alert px-6 py-2 rounded mt-n6 mb-6 subtitle-2">
    {{ msg }}
  </p>
</template>

<script>
export default {
  name: 'ErrMsg',
  props: {
    msg: {
      type: String,
      required: true,
    },
  },
};
</script>

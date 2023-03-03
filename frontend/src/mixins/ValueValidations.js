export default {
  methods: {
    validateValue(value) {
      return !!value || 'Campo obrigatório';
    },

    validateEmail(value) {
      const regex =
        /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

      return (
        regex.test(String(value).toLowerCase()) || 'Informe um e-mail válido'
      );
    },
  },
};

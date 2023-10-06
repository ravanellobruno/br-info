export default {
  methods: {
    valueHandlers_convertPriceToBr(value) {
      return parseFloat(value).toLocaleString('pt-br', {
        style: 'currency',
        currency: 'BRL',
      });
    },

    valueHandlers_convertStrToSlug(value) {
      let slug = value.replace(/^\s+|\s+$/g, '');
      slug = slug.toLowerCase();

      const from = 'ãàáäâẽèéëêìíïîõòóöôùúüûñç·/_,:;';
      const to = 'aaaaaeeeeeiiiiooooouuuunc------';

      for (let i = 0, l = from.length; i < l; i++) {
        slug = slug.replace(new RegExp(from.charAt(i), 'g'), to.charAt(i));
      }

      return slug
        .replace(/[^a-z0-9 -]/g, '')
        .replace(/\s+/g, '-')
        .replace(/-+/g, '-');
    },

    valueHandlers_handleFuelValue(value) {
      return !value || value === '0,0' ? 'Indisponível' : `R$ ${value}`;
    },
  },
};

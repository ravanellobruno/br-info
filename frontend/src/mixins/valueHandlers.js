export default {
  methods: {
    valueHandlers_convertPriceToBr(value) {
      return parseFloat(value).toLocaleString('pt-br', {
        style: 'currency',
        currency: 'BRL',
      });
    },

    valueHandlers_handleFuelValue(value) {
      return !value || value === '0,0' ? 'Indisponível' : `R$ ${value}`;
    },

    valueHandlers_standardizeText(value) {
      return value
        .normalize('NFD')
        .replace(/[\u0300-\u036f]/g, '')
        .toLowerCase()
        .trim();
    },

    valueHandlers_slugify(value) {
      value = this.valueHandlers_standardizeText(value);
      return value.replace(/\W+/g, '-');
    },

    valueHandlers_getTextToCompare(value) {
      value = this.valueHandlers_standardizeText(value);
      return value.replace(/ /g, '');
    },

    valueHandlers_handleAutocomplete(item, search, itemText) {
      itemText = this.valueHandlers_getTextToCompare(itemText);
      search = this.valueHandlers_getTextToCompare(search);

      return itemText.indexOf(search) > -1;
    },
  },
};

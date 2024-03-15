export default {
  methods: {
    valueHandlers_convertPriceToBr(price) {
      return parseFloat(price).toLocaleString('pt-br', {
        style: 'currency',
        currency: 'BRL',
      });
    },

    valueHandlers_handleValidPrice(price) {
      return !price || price === '0,0' ? 'Indisponível' : `R$ ${price}`;
    },

    valueHandlers_standardizeText(text) {
      return text
        .normalize('NFD')
        .replace(/[\u0300-\u036f]/g, '')
        .toLowerCase()
        .trim();
    },

    valueHandlers_slugify(text) {
      text = this.valueHandlers_standardizeText(text);
      return text.replace(/\W+/g, '-');
    },

    valueHandlers_getTextToCompare(text) {
      text = this.valueHandlers_standardizeText(text);
      return text.replace(/ /g, '');
    },

    valueHandlers_handleAutocomplete(item, search, itemText) {
      itemText = this.valueHandlers_getTextToCompare(itemText);
      search = this.valueHandlers_getTextToCompare(search);

      return itemText.indexOf(search) > -1;
    },
  },
};

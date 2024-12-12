export default {
  methods: {
    formatHelper_brPrice(price) {
      return parseFloat(price).toLocaleString('pt-br', {
        style: 'currency',
        currency: 'BRL',
      });
    },

    formatHelper_price(price) {
      return !price || price === '0,0' ? 'Indisponível' : `R$ ${price}`;
    },

    formatHelper_standardTxt(txt) {
      return txt
        .normalize('NFD')
        .replace(/[\u0300-\u036f]/g, '')
        .toLowerCase()
        .trim();
    },

    formatHelper_slug(txt) {
      txt = this.formatHelper_standardTxt(txt);
      return txt.replace(/\W+/g, '-');
    },

    formatHelper_txtToCompare(txt) {
      txt = this.formatHelper_standardTxt(txt);
      return txt.replace(/ /g, '');
    },

    formatHelper_autocomplete(item, search, itemTxt) {
      itemTxt = this.formatHelper_txtToCompare(itemTxt);
      search = this.formatHelper_txtToCompare(search);

      return itemTxt.indexOf(search) > -1;
    },
  },
};

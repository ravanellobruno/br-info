import axios from 'axios';

const baseUrl = process.env.VUE_APP_API_BASE_URL;

export default {
  methods: {
    async apiService_getData(path) {
      const { data } = await axios.get(baseUrl + path);
      return data.data;
    },

    async apiService_sendMail(mail) {
      const { data } = await axios.post(`${baseUrl}mail/send`, mail);
      return data;
    },

    async apiService_getCities(uf) {
      const { data } = await axios.get(
        `https://servicodados.ibge.gov.br/api/v1/localidades/estados/${uf}/municipios`
      );

      return data;
    },
  },
};

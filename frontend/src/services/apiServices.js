import axios from 'axios';

const apiBaseUrl = process.env.VUE_APP_API_BASE_URL;

export default {
  methods: {
    async apiServices_getData(apiPath) {
      const { data } = await axios.get(apiBaseUrl + apiPath);
      return data.data;
    },

    async apiServices_sendMessage(messageData) {
      const { data } = await axios.post(
        `${apiBaseUrl}messages/send`,
        messageData
      );

      return data;
    },

    async apiServices_getCities(uf) {
      const { data } = await axios.get(
        `https://servicodados.ibge.gov.br/api/v1/localidades/estados/${uf}/municipios`
      );

      return data;
    },
  },
};

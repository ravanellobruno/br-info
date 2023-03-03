<template>
  <CommonPage title="Contato">
    <LoadingDialog :isVisible="isSending" />
    <MessageDialog
      :message="successMessage"
      @clearMessage="successMessage = ''"
    />
    <template>
      <p class="mb-5">Para dúvidas e sugestões, envie uma mensagem:</p>
      <v-form ref="form" lazy-validation>
        <v-container>
          <ErrorBox :message="errorMessage" />
          <v-row>
            <v-col class="ma-0 mb-0 py-0" cols="12" sm="6">
              <v-text-field
                v-model="name"
                :rules="[validateValue]"
                validate-on-blur
                validate-on="none"
                outlined
                maxlength="80"
                label="Nome *"
                required
              ></v-text-field>
            </v-col>
            <v-col class="ma-0 mb-0 py-0" cols="12" sm="6">
              <v-text-field
                v-model="email"
                :rules="[validateEmail]"
                validate-on-blur
                outlined
                maxlength="255"
                label="E-mail *"
                required
              ></v-text-field>
            </v-col>
          </v-row>
          <v-row>
            <v-col class="ma-0 mb-0 py-0" cols="12">
              <v-textarea
                v-model="message"
                :rules="[validateValue]"
                validate-on-blur
                outlined
                label="Mensagem *"
                required
              ></v-textarea>
            </v-col>
          </v-row>
          <v-row>
            <v-col class="mx-0 mb-n4 pa-0" align="end" cols="12">
              <v-btn
                large
                color="success"
                class="mr-3 white--text"
                @click="proceedSendMessage"
              >
                <span class="send-message-btn-text">Enviar mensagem</span>
              </v-btn>
            </v-col>
          </v-row>
        </v-container>
      </v-form>
    </template>
  </CommonPage>
</template>

<script>
import CommonPage from '@/components/common/CommonPage';
import ErrorBox from '@/components/common/ErrorBox';
import LoadingDialog from '@/components/common/LoadingDialog';
import MessageDialog from '@/components/common/MessageDialog';
import ValueValidations from '@/mixins/ValueValidations';
import ApiServices from '@/services/ApiServices';

export default {
  name: 'ContactPage',
  components: { CommonPage, ErrorBox, LoadingDialog, MessageDialog },
  mixins: [ValueValidations, ApiServices],
  data() {
    return {
      name: '',
      email: '',
      message: '',
      dialog: false,
      successMessage: '',
      errorMessage: '',
      isSending: false,
    };
  },
  methods: {
    async proceedSendMessage() {
      if (!this.$refs.form.validate()) {
        return;
      }

      this.errorMessage = '';
      this.isSending = true;

      try {
        const response = await this.sendMessage({
          name: this.name,
          email: this.email,
          message: this.message,
        });

        this.successMessage = response.message;
        this.$refs.form.reset();
      } catch ({ response }) {
        if (response.data.errors) {
          this.errorMessage = '';

          response.data.errors.forEach((element) => {
            this.errorMessage += `${element.message}\n`;
          });
        } else {
          this.errorMessage = response.data.message;
        }
      } finally {
        this.isSending = false;
      }
    },
  },
};
</script>

<style lang="scss" scoped>
.send-message-btn-text {
  color: white !important;
}
</style>

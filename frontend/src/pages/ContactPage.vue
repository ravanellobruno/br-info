<template>
  <CommonPage :title="$router.options.routes[2].title">
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
                :rules="[valueValidations_validateValue]"
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
                :rules="[valueValidations_validateEmail]"
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
                :rules="[valueValidations_validateValue]"
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
                <span class="send-btn-text">Enviar mensagem</span>
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
import valueValidations from '@/mixins/valueValidations';
import apiServices from '@/services/apiServices';

export default {
  name: 'ContactPage',
  components: { CommonPage, ErrorBox, LoadingDialog, MessageDialog },
  mixins: [valueValidations, apiServices],
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
        const { message } = await this.apiServices_sendMessage({
          name: this.name,
          email: this.email,
          message: this.message,
        });

        this.successMessage = message;
        this.$refs.form.reset();
      } catch ({ response }) {
        if (response.data.errors) {
          this.errorMessage = '';

          response.data.errors.forEach((error) => {
            this.errorMessage += `${error.message}\n`;
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

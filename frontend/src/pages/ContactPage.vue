<template>
  <CommonPage :title="$router.options.routes[2].title">
    <LoadingDialog :isVisible="isSending" />
    <MsgDialog :msg="successMsg" @clearMsg="successMsg = ''" />
    <template>
      <p class="mb-5">Para dúvidas e sugestões, envie uma mensagem:</p>
      <v-form ref="form" lazy-validation>
        <v-container>
          <ErrMsg :msg="errMsg" />
          <v-row>
            <v-col class="ma-0 mb-0 py-0" cols="12" sm="6">
              <v-text-field
                v-model="name"
                :rules="[validationHelper_validateField]"
                validate-on-blur
                validate-on="none"
                outlined
                maxlength="80"
                label="Nome *"
                required
              />
            </v-col>
            <v-col class="ma-0 mb-0 py-0" cols="12" sm="6">
              <v-text-field
                v-model="email"
                :rules="[validationHelper_validateEmail]"
                validate-on-blur
                outlined
                maxlength="255"
                label="E-mail *"
                required
              />
            </v-col>
          </v-row>
          <v-row>
            <v-col class="ma-0 mb-0 py-0" cols="12">
              <v-textarea
                v-model="body"
                :rules="[validationHelper_validateField]"
                validate-on-blur
                outlined
                label="Mensagem *"
                required
              />
            </v-col>
          </v-row>
          <v-row>
            <v-col class="mx-0 mb-n4 pa-0" align="end" cols="12">
              <v-btn large color="success" class="mr-3 white--text" @click="sendMail">
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
import ErrMsg from '@/components/common/ErrMsg';
import LoadingDialog from '@/components/common/LoadingDialog';
import MsgDialog from '@/components/common/MsgDialog';
import validationHelper from '@/helpers/validationHelper';
import apiService from '@/services/apiService';

export default {
  name: 'ContactPage',
  components: { CommonPage, ErrMsg, LoadingDialog, MsgDialog },
  mixins: [validationHelper, apiService],
  data() {
    return {
      name: '',
      email: '',
      body: '',
      dialog: false,
      successMsg: '',
      errMsg: '',
      isSending: false,
    };
  },
  methods: {
    async sendMail() {
      if (!this.$refs.form.validate()) {
        return;
      }

      this.errMsg = '';
      this.isSending = true;

      try {
        const { msg } = await this.apiService_sendMail({
          name: this.name,
          email: this.email,
          body: this.body,
        });

        this.successMsg = msg;
        this.$refs.form.reset();
      } catch ({ response }) {
        if (response.data.errors) {
          this.errMsg = '';

          response.data.errors.forEach((err) => {
            this.errMsg += `${err.msg}\n`;
          });
        } else {
          this.errMsg = response.data.msg;
        }
      } finally {
        this.isSending = false;
      }
    },
  },
};
</script>

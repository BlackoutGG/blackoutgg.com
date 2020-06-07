export default {
  data() {
    return {
      renderId: 0,
      gresponse: null,
      siteKey: "6LeMXSYTAAAAAH4mKMnph1jHnepNhX9O4bGk_Jjs"
    };
  },
  beforeDestroy() {
    if (window.grecaptcha) grecaptcha.reset(this.renderId);
  },
  methods: {
    onRender(id) {
      this.renderId = id;
    },
    onSuccess() {
      this.setSnackbar("You've successfully logged in.");
      this.toggle = false;
    },
    onVerfiy(response) {
      this.gresponse = response;
    },
    onExpiry() {
      this.resetRecaptcha();
      if (this.isSending) this.isSending = false;
    },
    onError() {
      this.setSnackbar(
        "Encountered an error setting the recaptcha response..."
      );
    },
    resetRecaptcha() {
      this.gresponse = null;
      this.$refs.recaptcha.reset();
    }
  }
};

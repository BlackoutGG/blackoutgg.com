export default {
  computed: {
    username() {
      return this.$auth.user ? this.$auth.user.username : null;
    },
    initials() {
      if (this.username) {
        const initials = this.username.match(/\b\w/g) || [];
        return (
          (initials.shift() || "") + (initials.pop() || "")
        ).toUpperCase();
      }
    }
  }
};

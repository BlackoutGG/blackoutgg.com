<template>
  <v-app light>
    <admin-navbar />
    <!-- <admin-nav-drawer /> -->
    <v-main id="admin">
      <nuxt />
    </v-main>
    <snackbar />
  </v-app>
</template>

<script>
import AdminNavbar from "~/components/navigation/admin/AdminNavbarWithMobile.vue";
// import AdminNavDrawer from "~/components/navigation/admin/AdminNavDrawer.vue";
import Snackbar from "~/components/SnackBar.vue";
export default {
  name: "Admin",
  // components: { AdminNavbar, AdminNavDrawer, Snackbar },
  components: { AdminNavbar, Snackbar },
  created() {
    this.$vuetify.theme.dark = false;
  }
};
</script>

<style lang="scss">
#admin {
  background-color: #fafafa;
}
</style>

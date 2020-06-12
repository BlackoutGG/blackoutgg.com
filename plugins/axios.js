export default function({ $auth, $axios, redirect }) {
  //   $axios.onError(err => {
  //     if (err.response.status === 401 && err.message === "jwt_expired") {
  //       if ($auth.loggedIn && $auth.user) $auth.logout("local");
  //     }
  //   });
  $auth.onError((err, name, endpoint) => console.log(name, err));
}

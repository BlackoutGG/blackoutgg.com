// export default scope => ({ $auth }) => $auth.hasScope(scope);

export default scope => ({ $auth, redirect }) => {
  if ($auth.loggedIn && $auth.user.scope.indexOf(scope) === -1) {
    redirect("/");
  }
};

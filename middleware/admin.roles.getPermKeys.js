import roles from "~/utilities/ns/public/roles.js";

export default ({ store }) => {
  const perms = store.getters[roles.getters.PERM_KEYS];
  if (!perms.length) return;
  store.actions[roles.actions.FETCH_PERM_KEYS];
};

import roles from "~/utilities/ns/public/roles.js";
export default ({ store }) => {
  store.dispatch(roles.actions.FETCH);
};

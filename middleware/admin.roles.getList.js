import { roles } from "~/utilities/ns/roles.js";
export default ({ store }) => {
  store.dispatch(roles.actions.FETCH);
};

import { roles } from "~/utilities/types/roles.js";
export default ({ store }) => {
  store.dispatch(roles.actions.FETCH);
};

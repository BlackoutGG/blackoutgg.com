import { LISTS } from "~/utilities/types";
export default ({ store, params }) =>
  store.dispatch(LISTS.actions.FETCH, params.type);

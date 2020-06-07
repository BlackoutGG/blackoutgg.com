import { PAGE } from "~/utilities/types";
export default title => ({ store }) =>
  store.commit(PAGE.mutations.SET_TITLE, title);

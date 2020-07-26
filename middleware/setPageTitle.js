import { page } from "~/utilities/ns/page.js";
export default title => ({ store }) =>
  store.commit(page.mutations.SET_TITLE, title);

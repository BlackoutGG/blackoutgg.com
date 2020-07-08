import removeNamespace from "../removeNamespace";

export const lists = {
  getters: {
    ITEMS: "lists/items",
    SELECTED: "lists/selected",
    QUERY_PARAMS: "lists/queryParams"
  },
  mutations: {
    SET_LIST: "lists/SET_LIST",
    SET_SELECTED: "lists/SET_SELECTED"
  },
  actions: {
    FETCH: "lists/fetchList"
  }
};

export const _lists = removeNamespace("lists/", lists);

export default { lists };

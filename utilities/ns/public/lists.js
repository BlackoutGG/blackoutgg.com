export default {
  getters: {
    ITEMS: "lists/items",
    SELECTED: "lists/selected",
    SELECTED_IDS: "lists/selectedIds",
    QUERY_PARAMS: "lists/queryParams"
  },
  mutations: {
    SET_LIST: "lists/SET_LIST",
    SET_SELECTED: "lists/SET_SELECTED",
    SET_PARAM: "lists/SET_PARAM"
  },
  actions: {
    FETCH: "lists/fetchList"
  }
};

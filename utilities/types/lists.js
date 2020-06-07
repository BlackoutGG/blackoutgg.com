export default {
  getters: {
    ITEMS: "lists/getItems",
    LIST_TYPE: "lists/type",
    SELECTED: "lists/selected",
    QUERY_PARAMS: "lists/queryParams"
  },
  mutations: {
    SET_LIST: "lists/SET_LIST",
    SET_TYPE: "lists/SET_TYPE",
    SET_SELECTED: "lists/SET_SELECTED",
    SET_PAGE: "lists/SET_PAGE",
    SET_SORT: "lists/SORT",
    SET_TOTAL: "lists/SET_TOTAL",
    REMOVE_ROLE: "lists/REMOVE_ROLE"
  },
  actions: {
    FETCH: "lists/fetchList"
  }
};

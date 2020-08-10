import lists from "~/utilities/ns/private/lists.js";
import snackbar from "~/utilities/ns/public/snackbar.js";

const state = () => ({
  items: {
    categories: [],
    forms: [],
    tags: []
  },
  selected: [],

  queryParams: {
    page: 1,
    limit: 20,
    total: 0,
    orderBy: "DESC",
    sortBy: "id"
  }
});

const getters = {
  [lists.getters.ITEMS]: state => type => state.items[type],
  [lists.getters.SELECTED]: state => state.selected,
  [lists.getters.QUERY_PARAMS]: state => key =>
    typeof key !== undefined ? state.queryParams[key] : state.queryParams
};

const mutations = {
  [lists.mutations.SET_LIST](state, { type, list }) {
    state.items[type] = list;
  },
  [lists.mutations.SET_SELECTED](state, selected) {
    state.selected = selected;
  },
  [lists.mutations.SET_PARAM](state, { param, value }) {
    state.queryParams[param] = value;
  }
};

const actions = {
  async [lists.actions.FETCH]({ commit, dispatch, state }, type) {
    try {
      const { data } = await this.$axios.get(`/api/${type}`, {
        params: { ...state.queryParams }
      });

      const list = data[type];
      // const value = data[type].total;

      commit(lists.mutations.SET_LIST, { type, list });
      // commit(lists.mutations.SET_PARAM, { param: "total", value });
    } catch (err) {
      console.log(err);
    }
  }
};

export default { state, getters, mutations, actions };

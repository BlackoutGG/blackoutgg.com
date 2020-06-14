import { _lists as types } from "~/utilities/types/lists.js";
import { snackbar } from "~/utilities/types/snackbar.js";

const state = () => ({
  items: {
    roles: [],
    posts: []
  },
  listType: "",
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
  [types.getters.ITEMS]: state => type => state.items[type],
  [types.getters.LIST_TYPE]: state => state.listType,
  [types.getters.SELECTED]: state => state.selected,
  [types.getters.QUERY_PARAMS]: state => key =>
    typeof key !== undefined ? state.queryParams[key] : state.queryParams
};

const mutations = {
  [types.mutations.SET_LIST](state, payload) {
    state.items[state.listType] = payload;
  },
  [types.mutations.SET_TYPE](state, type) {
    state.listType = type;
  },
  [types.mutations.SET_SELECTED](state, selected) {
    state.selected = selected;
  },
  [types.mutations.SET_PAGE](state, page) {
    state.queryParams.page = page;
  },
  [types.mutations.SET_SORT](state, sortBy) {
    state.queryParams.sortByh = sortBy;
  },
  [types.mutations.SET_TOTAL](state, total) {
    state.queryParams.total = total;
  },
  [types.mutations.REMOVE_ROLE](state, { userId, role }) {
    const user = state.lists.users.find(id => id === userId);
    if (user) user.roles.splice(user.roles.indexOf(role), 1);
  }
};

const actions = {
  async [types.actions.FETCH]({ commit, dispatch, state }, type) {
    try {
      const { data } = await this.$axios.get(`/api/${type}`, {
        params: { ...state.queryParams }
      });
      commit(types.mutations.SET_LIST, data[type].results);
      commit(types.mutations.SET_TOTAL, data[type].total);
      dispatch(
        snackbar.actions.TOGGLE_BAR,
        {
          text: "Content Loaded.",
          color: "#000"
        },
        { root: true }
      );
    } catch (err) {
      dispatch(
        snackbar.actions.TOGGLE_BAR,
        {
          text: err.message,
          color: "#000"
        },
        { root: true }
      );
      console.log(err);
    }
  }
};

export default { state, getters, mutations, actions };

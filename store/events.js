import { _events as types } from "~/utilities/types/events.js";
import snackbar from "~/utilities/types/snackbar.js";

const state = () => ({
  events: []
});

const getters = {
  [types.getters.EVENTS]: state => state.events,
  [types.getters.GET_EVENT]: state => id =>
    state.events.find(evt => evt.id === id)
};

const mutations = {
  [types.mutations.SET_EVENTS](state, events) {
    state.events = events;
  },
  [types.mutations.ADD_EVENT](state, event) {
    const idx = state.events.findIndex(evt => evt.id === event.id);
    if (idx === -1) state.events.push(event);
  },
  [types.mutations.EDIT_EVENT](state, event) {
    const e = state.events.find(evt => evt.id === event.id);
    if (e) e = event;
  },
  [types.mutations.REMOVE_EVENT](state, event) {
    const idx = state.events.findIndex(evt => evt.id === event.id);
    if (idx !== -1) state.events.splice(idx, 1);
  }
};

const actions = {
  async [types.actions.FETCH_EVENTS]({ commit, dispatch }, params) {
    try {
      const {
        data: { events }
      } = await this.$axios.get("/api/events", { params });

      commit(types.mutations.SET_EVENTS, events);
    } catch (err) {
      const text = "An Error Occured. Please contact the administrator";
      dispatch(snackbar.actions.TOGGLE_BAR, { text }, { root: true });
    }
  },

  async [types.actions.EDIT_EVENT]({ commit, dispatch }, { id, _data }) {
    try {
      const {
        data: { event }
      } = this.$axios.put(`/api/events/${id}`, _data);

      commit(types.mutations.EDIT_EVENT, event);
    } catch (err) {}
  }
};

export default { state, getters, mutations, actions };

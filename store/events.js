import { _events as types } from "~/utilities/types/events.js";
import CalendarEvent from "~/components/calender/Event.js";
import pick from "lodash/pick";
import { snackbar } from "~/utilities/types/snackbar.js";

const props = [
  "name",
  "color",
  "startTime",
  "startDate",
  "endTime",
  "endDate",
  "description",
  "rvsp"
];

const state = () => ({
  events: [],
  categories: ["all"]
});

const getters = {
  [types.getters.EVENTS]: state => state.events,
  [types.getters.EVENT_CATEGORIES]: state => state.categories,
  [types.getters.GET_EVENT]: state => id =>
    state.events.find(evt => evt.id === id)
};

const mutations = {
  [types.mutations.SET_EVENTS](state, events) {
    state.events = events;
  },
  [types.mutations.SET_EVENT_CATEGORIES](state, cats) {
    state.categories = state.categories.concat(cats);
  },
  [types.mutations.ADD_EVENT](state, event) {
    const idx = state.events.findIndex(evt => evt.id === event.id);
    if (idx === -1) state.events.push(event);
    // state.events.push(event);
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
  async [types.actions.FETCH_EVENTS]({ state, commit, dispatch }, params) {
    try {
      const { data } = await this.$axios.get(
        state.categories.length ? "/api/events" : "/api/admin/events",
        { params }
      );

      // console.log(events);
      if (!state.categories.length) {
        commit(types.mutations.SET_EVENT_CATEGORIES, data.categories);
      }

      console.log(data);

      commit(
        types.mutations.SET_EVENTS,
        data.events.map(event => new CalendarEvent(event))
      );
    } catch (err) {
      console.log(err);
      const text = "Encountered an error. Please contact the administrator";
      dispatch(snackbar.actions.TOGGLE_BAR, { text }, { root: true });
    }
  },

  async [types.actions.ADD_EVENT]({ commit, dispatch }, event) {
    try {
      const { data } = await this.$axios.post(
        "/api/events",
        pick(props, event)
      );
      const text = `Added Event ${data.event.name}`;
      console.log(data);
      commit(types.mutations.ADD_EVENT, new CalendarEvent(data.event));
      dispatch(snackbar.actions.TOGGLE_BAR, { text }, { root: true });
    } catch (err) {
      console.log(err);
      const text = "Encounterd an error. Please contact administration.";
      dispatch(snackbar.actions.TOGGLE_BAR, text, { root: true });
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

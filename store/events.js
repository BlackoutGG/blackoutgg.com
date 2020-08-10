import CalendarEvent from "~/components/events/CalendarEvent.js";
import pick from "lodash/pick";
import snackbar from "~/utilities/ns/public/snackbar.js";
import NS from "~/utilities/ns/private/events.js";

const props = [
  "name",
  "color",
  "month",
  "year",
  "startTime",
  "startDate",
  "endTime",
  "endDate",
  "description",
  "rvsp"
];

const state = () => ({
  events: [],
  colors: ["#FF9AA2", "#FFB7B2", "#FFDAC1", "E2F0CB", "#B5EAD7", "C7CEEA"]
});

const getters = {
  [NS.getters.EVENTS]: state => state.events,
  [NS.getters.EVENT_COLORS]: state => state.colors,
  [NS.getters.GET_EVENT]: state => id => state.events.find(evt => evt.id === id)
};

const mutations = {
  [NS.mutations.SET_EVENTS](state, events) {
    state.events = events;
  },
  [NS.mutations.ADD_EVENT](state, event) {
    const idx = state.events.findIndex(evt => evt.id === event.id);
    if (idx === -1) state.events.push(event);
  },
  [NS.mutations.EDIT_EVENT](state, { id, event }) {
    let e = state.events.find(evt => evt.id === id);
    Object.keys(event).forEach(key => {
      if (typeof e[key] !== undefined) {
        e[key] = event[key];
      }
    });
  },
  [NS.mutations.EDIT_EVENT_CATEGORY](state, { id, category }) {
    let event = state.events.find(event => event.id === id);
    if (event && event.category) event.category = category;
  },
  [NS.mutations.REMOVE_EVENT](state, event) {
    const idx = state.events.findIndex(evt => evt.id === event.id);
    if (idx !== -1) state.events.splice(idx, 1);
  }
};

const actions = {
  async [NS.actions.FETCH_EVENTS]({ commit, dispatch }, params) {
    try {
      const {
        data: { events }
      } = await this.$axios.get("/api/events", { params });

      console.log(events);

      commit(
        NS.mutations.SET_EVENTS,
        events.map(event => new CalendarEvent(event))
      );
    } catch (err) {
      console.log(err);
      const text = "Encountered an error. Please contact the administrator";
      dispatch(snackbar.actions.TOGGLE_BAR, { text }, { root: true });
    }
  },

  async [NS.actions.ADD_EVENT]({ commit, dispatch }, { category_id, event }) {
    const params = pick(event, props);
    params.category_id = category_id;
    console.log(params);

    try {
      const {
        data: { event }
      } = await this.$axios.post("/api/events", params);
      const text = `Saved Event: ${event.name}`;
      commit(NS.mutations.ADD_EVENT, new CalendarEvent(event));
      dispatch(snackbar.actions.TOGGLE_BAR, { text }, { root: true });
    } catch (err) {
      console.log(err);
      const text = "Encounterd an error. Please contact administration.";
      dispatch(snackbar.actions.TOGGLE_BAR, text, { root: true });
    }
  },

  async [NS.actions.EDIT_EVENT]({ commit, dispatch }, evt) {
    const { id, ...payload } = evt;
    try {
      const {
        data: { event }
      } = await this.$axios.put(`/api/events/${id}`, payload);

      const e = pick(event, props);

      if (event.category) {
        let { category, ...evt } = event;
        commit(NS.mutations.EDIT_EVENT_CATEGORY, category);
      }

      if (e && Object.keys(e).length) {
        commit(NS.mutations.EDIT_EVENT, { id, event: e });
      }

      dispatch(snackbar.actions.SUCCESS, null, { root: true });
    } catch (err) {
      dispatch(snackbar.actions.ERROR, null, { root: true });
    }
  }
};

export default { state, getters, mutations, actions };

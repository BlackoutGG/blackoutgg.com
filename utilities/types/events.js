import removeNamespace from "../removeNamespace";

export const events = {
  getters: {
    EVENTS: "events/events",
    GET_EVENT: "events/getEvent"
  },
  mutations: {
    SET_EVENTS: "events/setEvents",
    ADD_EVENT: "events/addEvent",
    REMOVE_EVENT: "events/removeEvent"
  },
  actions: {
    FETCH_EVENTS: "events/fetchEvents",
    ADD_EVENT: "events/add",
    EDIT_EVENT: "events/edit",
    REMOVE_EVENT: "events/remove"
  }
};

export const _events = removeNamespace("events/", events);

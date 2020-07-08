import removeNamespace from "../removeNamespace";

export const events = {
  getters: {
    EVENTS: "events/events",
    GET_EVENT: "events/getEvent"
  },
  mutations: {
    SET_EVENTS: "events/setEvents",
    EDIT_EVENT_CATEGORY: "events/eventCategory",
    ADD_EVENT: "events/addEvent",
    EDIT_EVENT: "events/editEvent",
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

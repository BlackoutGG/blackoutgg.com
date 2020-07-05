import removeNamespace from "../removeNamespace";

export const events = {
  getters: {
    EVENTS: "events/events",
    EVENT_CATEGORIES: "events/eventCategories",
    GET_EVENT: "events/getEvent"
  },
  mutations: {
    SET_EVENTS: "events/setEvents",
    SET_EVENT_CATEGORIES: "events/setEventCategories",
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

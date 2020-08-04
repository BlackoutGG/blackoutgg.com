/**
 * @property {Number|Object} id The events id. Defaults to null if no id is provided.
 * @property {String} name The event name.
 * @property {String} color The chosen color of the event.
 * @property {Number} year The year of the event in number format.
 * @property {Number} month The month of the event in number format.
 * @property {Number} day The day of the event in number format.
 * @property {Number} category The category id of the event.
 * @property {String} startDate The start date in string format.
 * @property {String} startTime The start time in string format.
 * @property {String} endDate The optional end date of an event. Defaults to startDate.
 * @property {String} endTime The optional end time of an event. Defaults to startTime.
 * @property {String} description The description of the event.
 * @property {Boolean} rvsp Enables or disables the privilage for users to register for an event. Defaults to false.
 * @property {Object} organizer Object containing the id, avatar and username of the event submitter/organizer. Defaults to null.
 * @property {Object} category Object containing the id, name and banner background source for the category the event is bound to. Defaults to null.
 */
export default class CalendarEvent {
  constructor({
    id,
    name,
    color,
    year,
    month,
    day,
    startDate,
    startTime,
    endDate,
    endTime,
    description,
    rvsp,
    roles = null,
    organizer = null,
    category = null
  }) {
    const dates = startDate.split("-");
    this.id = id || null;
    this.year = year || parseInt(dates[0], 10);
    this.month = month || parseInt(dates[1], 10);
    this.day = day || parseInt(dates[2], 10);
    this.name = name;
    this.color = color || "#000000";
    this.startDate = startDate.split("T")[0];
    this.startTime = startTime;
    this.endDate = endDate.split("T")[0] || startDate;
    this.endTime = endTime || startTime;
    this.description = description;
    this.rvsp = rvsp || false;
    this.organizer = organizer;
    this.category = category;
    this.roles = roles;
  }

  get start() {
    return this.startDate && this.startTime
      ? this.startDate + " " + this.startTime
      : null;
  }

  get end() {
    return this.endDate && this.endTime
      ? this.endDate + " " + this.endTime
      : null;
  }

  get category_id() {
    return this.category.id || 1;
  }

  get categoryName() {
    return this.category.name || "";
  }
}

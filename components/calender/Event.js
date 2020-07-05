export default class CalendarEvent {
  constructor({
    id,
    name,
    color,
    startDate,
    startTime,
    endDate,
    endTime,
    description,
    rvsp
  }) {
    const dates = startDate.split("-");
    this.id = id || null;
    this.year = parseInt(dates[0], 10);
    this.month = parseInt(dates[1], 10);
    this.day = parseInt(dates[2], 10);
    this.name = name;
    this.color = color || "#000000";
    this.startDate = startDate;
    this.startTime = startTime;
    this.endDate = endDate || startDate;
    this.endTime = endTime || startTime;
    this.description = description;
    this.rvsp = rvsp || false;
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
}

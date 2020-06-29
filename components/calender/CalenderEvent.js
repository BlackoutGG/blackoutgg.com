export default class CalenderEvent {
  _constructor({
    name,
    startDate,
    startTime,
    endDate,
    endTime,
    description,
    joinable
  }) {
    this._name = name;
    this._startDate = startDate;
    this._startTime = startTime;
    this._endDate = endDate || startDate;
    this._endTime = endTime || startTime;
    this._description = description;
    this.joinable = joinable;
  }

  get start() {
    return new Date(this._startDate + " " + this.startTime);
  }

  get end() {
    return new Date(this._endDate + " " + this.endTime);
  }

  get name() {
    return this._name;
  }

  get startDate() {
    return this._startDate;
  }

  get startTime() {
    return this._startTime;
  }

  get endDate() {
    return this._endDate;
  }

  get endTime() {
    return this._endTime;
  }

  get description() {
    return this._description;
  }
}

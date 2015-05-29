import Ember from 'ember';

export default Ember.Object.extend().reopenClass({
  weeks(date, events) {
    let momentDate = moment(date, 'YYYY-MM-DD');
    let numberOfDaysInMonth = momentDate.daysInMonth();
    let dateArray = momentDate.toArray();
    let sanitizedEvents = this._sanitizeEvents(events) || Ember.A();

    // Set dateArray date to first day of the month
    let firstDayOfMonthDateArray = dateArray;
    firstDayOfMonthDateArray[2] = 1;
    let firstDayOfMonth = moment(dateArray).day();

    let previousMonthDateArray = dateArray.slice();
    let numberOfDaysInPreviousMonth;

    if (dateArray[1] === 0) {
      previousMonthDateArray[0] = previousMonthDateArray[0] - 1;
      previousMonthDateArray[1] = 11;
      numberOfDaysInPreviousMonth = moment(previousMonthDateArray).daysInMonth();
    } else {
      previousMonthDateArray[1] = previousMonthDateArray[1] - 1;
      numberOfDaysInPreviousMonth = moment(previousMonthDateArray).daysInMonth();
    }

    let weeks = Ember.A();
    let currentDay = firstDayOfMonth;
    let dayOfMonth = 1;

    for (let i = 0; i < numberOfDaysInMonth; i++) {
      // If weeks is empty, add the first week and unshift the days from last month
      if (Ember.isEmpty(weeks)) {
        weeks.pushObject(Ember.A());
        for (let i = 0; i < firstDayOfMonth; i++) {
          let day = {};
          previousMonthDateArray[2] = numberOfDaysInPreviousMonth;
          day.plainDate = moment(previousMonthDateArray).format('YYYY-MM-DD');
          numberOfDaysInPreviousMonth--;
          let dayOfWeek = moment().weekday(firstDayOfMonth - (i + 1)).format('dddd');
          day.dayOfWeek = dayOfWeek;
          weeks.get('lastObject').unshift(day);
        }
      }

      // If currentDay is past the number of days in a week, add a new week
      if (currentDay === 7) {
        weeks.pushObject(Ember.A());
        currentDay = 0;
      }

      // If currentDay is less than the number of days in a week, push a day in
      if (currentDay < 7) {
        let day = {};
        let dayOfWeek = moment().weekday(currentDay).format('dddd');
        day.dayOfWeek = dayOfWeek;
        dateArray[2] = dayOfMonth;
        day.plainDate = moment(dateArray).format('YYYY-MM-DD');

        day.events = Ember.A(sanitizedEvents.filterBy('_plainDate', day.plainDate));

        weeks.get('lastObject').push(day);
        currentDay++;
        dayOfMonth++;
      }
    }

    return weeks;
  },

  _sanitizeEvents(events) {
    if (!events) { return; }
    let sanitizedEvents = Ember.A(events.map(event => {
      event._plainDate = moment(event.date).format('YYYY-MM-DD');
      event._plainTime = moment(event.date).format('h:mm a');
      return event;
    }));
    return sanitizedEvents;
  }
});

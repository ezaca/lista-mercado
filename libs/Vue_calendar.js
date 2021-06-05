var calendar_user_promise_callback = false;

let data_init_calendar = {
    title: "n/d",
    visible: false,
    value: new Date(),
    userPromise: null,
    year: Utils.today.getFullYear(),
    month: Utils.today.getMonth(),
    today: Utils.today.getDate(),
    displayMonth: '',
    days: [],
}

function calendar_show(value, title){
    this.calendar.userPromise = new Promise((resolve) => calendar_user_promise_callback = resolve);
    let date = value;
    if (!(date instanceof Date))
        date = new Date();
    this.calendar.title = title ?? "Calendário";
    this.calendar.visible = true;
    this.calendar_update(date.getFullYear(), date.getMonth());
    return this.calendar.userPromise;
}

function calendar_update(year, month){
    while(month > 11)
    {
        month -= 12;
        year++;
    }
    while(month < 0)
    {
        month += 12;
        year--;
    }
    if (year < 1900) year = 1900;
    if (year > 9999) year = 9999;
    this.calendar.year = year;
    this.calendar.month = month;

    let days = [[]];
    let date = moment(`${year}-${(month + 1).toString().padStart(2,'0')}`, 'YYYY-MM');
    let lastDay = date.daysInMonth();
    let day;
    let weekday = date.day(); // As stated in <https://momentjs.com/docs/#/get-set/day/>, "day" is Sunday(0) to Saturday(6).
    for (day = 1; day <= lastDay; day++){
        if (weekday > 6)
        {
            days.push([]);
            weekday = 0;
        }
        let dayDate = moment(`${year}-${month+1}-${day}`, 'YYYY-MM-DD');
        days[days.length - 1][weekday] = {
            date: dayDate,
            display: day.toString(),
            selected: dayDate.isSame(this.calendar.value, 'date'),
            today: dayDate.isSame(new Date(), 'date'),
        };
        weekday++;
    }

    while (days[days.length - 1].length === 0)
        days.pop();

    this.calendar.displayMonth = date.format('MMMM[ de ]YYYY')
    this.calendar.days = days;
}

function calendar_pick(day, hide = true){
    let {year, month} = this.calendar;

    let hasDayArg = Number.isNaN(+day) == false;
    if (hasDayArg)
    {
        this.calendar.value = moment(`${year}-${month+1}-${day}`, 'YYYY-MM-DD').toDate();
    }

    if (hide)
    {
        this.calendar.userPromise = null;
        calendar_user_promise_callback(this.calendar.value);
        this.calendar_hide();
    } else {
        this.calendar_update(year, month);
    }
}

function calendar_hide(){
    if (this.calendar.userPromise){
        this.calendar.userPromise = null;
        calendar_user_promise_callback(undefined);
    }
    this.calendar.visible = false;
}
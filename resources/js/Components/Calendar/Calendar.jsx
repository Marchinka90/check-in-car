import { useState, useEffect } from 'react';

export default function Calendar(props) {
  const [calendar, setCalendar] = useState();
  const [isLoading, setIsLoading] = useState(false);
  const saturdayShiftOn = props.preferences.saturdayShiftOn;
  const holidays = props.holidays;

  const months = ['Януари', 'Февруари', 'Март', 'Април', 'Май', 'Юни', 'Юли', 'Август', 'Септември', 'Октомври', 'Ноември', 'Декември']
  // const days = ['Нед', 'Пон', 'Вт', 'Ср', 'Чет', 'Пет', 'Съб'];

  const date = new Date();
  let currentMonth = date.getMonth();
  let currentYear = date.getFullYear();

  const renderCalendar = () => {
    const selectDateHandler = (date) => {
      clearSelectedDateHandler();
      if (date.target.classList.contains('prev') || date.target.classList.contains('next')) {
        return;
      }
      date.target.id = 'selected-date';
    }

    const combineClickHandler = (date) => {
      selectDateHandler(date);
      let selectedDate = date.target.innerHTML;
      let dateObj = new Date(currentYear, currentMonth, selectedDate);
      props.setSelectedDate(dateObj);
    }

    let isTodayBtnHide = true;

    const hideTodayButtonHandler = () => {
      if (currentMonth === new Date().getMonth() && currentYear === new Date().getFullYear()) {
        isTodayBtnHide = true;
      } else {
        isTodayBtnHide = false;
      }
    }

    const currentMonthButtonHandler = () => {
      clearSelectedDateHandler();
      currentMonth = date.getMonth();
      currentYear = date.getFullYear();

      renderCalendar();
    }

    const prevMonthButtonHandler = () => {
      clearSelectedDateHandler();
      currentMonth--;
      if (currentMonth < 0) {
        currentMonth = 11;
        currentYear--;
      }
      renderCalendar();
    }

    const nextMonthButtonHandler = () => {
      clearSelectedDateHandler()
      currentMonth++;
      if (currentMonth > 11) {
        currentMonth = 0;
        currentYear++;
      }
      renderCalendar();
    }

    const clearSelectedDateHandler = () => {
      let oldSelectedDate = document.getElementById('selected-date');
      if (oldSelectedDate) {
        oldSelectedDate.id = '';
      }
    }

    const checkTodayDate = (day, month, year) => {
      if (
        day === new Date().getDate() &&
        month === new Date().getMonth() &&
        year === new Date().getFullYear()
      ) {
        return true;
      }
      return false;
    }

    const isHoliday = (date) => {
      date.setHours(0, 0, 0, 0);
      
      for (let i = 0; i < holidays.length; i++) {
        let [year, month, day] = holidays[i].holiday_date.split('-');
        let currentHoliday = new Date(`${month}/${day}/${year}`);

        currentHoliday.setHours(0, 0, 0, 0);
        if (currentHoliday < date || currentHoliday > date) {
          continue;
        } else {
          return true;
        }
      }
      return false;
    }

    date.setDate(1);

    const firstDay = new Date(currentYear, currentMonth, 1);
    const lastDay = new Date(currentYear, currentMonth + 1, 0);
    const lastDayIndex = lastDay.getDay();
    const lastDayDate = lastDay.getDate();
    const prevLastDay = new Date(currentYear, currentMonth, 0);
    const today = new Date();
    const prevLastDayDate = prevLastDay.getDate();
    const nextDays = 7 - lastDayIndex;

    let month = `${months[currentMonth]} ${currentYear}`;

    const days = [];
    const allCalendarDays = 35;
    let key = 0;
    let counterDays = 0;

    let firstDayIndex = firstDay.getDay();
    if (firstDayIndex == 0) {
      firstDayIndex = 7;
    }

    for (let x = firstDayIndex; x > 1; x--) {
      days.push(<div key={key} className="day prev">{prevLastDayDate - x + 2}</div>);
      key++;
      counterDays++;
    }

    for (let i = 1; i <= lastDayDate; i++) {
      const currentDayDate = new Date(currentYear, currentMonth, 1);
      currentDayDate.setDate(i);
      const dayOfWeek = currentDayDate.getDay();

      counterDays++;
      // Check what date will be printed and will be clicable or not
      let staticDate = true;
      let classesForDays = 'day';
      let isToday = checkTodayDate(i, currentMonth, currentYear);

      if (dayOfWeek == 0) {
        classesForDays += ' weekend';
        if (isToday) { classesForDays += ' today'; }

      } else if (dayOfWeek == 6 && saturdayShiftOn == '0') {
        classesForDays += ' weekend';
        if (isToday) { classesForDays += ' today'; }

      } else if (isHoliday(currentDayDate)) {
        if (isToday) {
          classesForDays += ' today';
          classesForDays += ' weekend';
        } else {
          classesForDays += ' weekend';
        }
  
      } else if (currentDayDate < today) {
        if (isToday) {
          classesForDays += ' today';
          staticDate = false;
        } else {
          classesForDays += ' prev';
        }
      
      } else {
        staticDate = false;
      }


      if (staticDate) {
        days.push(<div key={key} className={classesForDays}>{i}</div>)
      } else {
        days.push(<div key={key} className={classesForDays} onClick={combineClickHandler}>{i}</div>)
      }

      key++;
    }

    for (let j = 1; j <= nextDays; j++) {
      if (allCalendarDays === counterDays) {
        break;
      }
      days.push(
        <div key={key} className="day next">{j}</div>
      );
      key++;
      counterDays++;
    }

    hideTodayButtonHandler();

    const htmlContent = (
      <div className="calendar-wrapper">
        <div className="calendar">
          <div className="header">
            <div className="month">{month}</div>
            <div className="btns">
              {!isTodayBtnHide && <div className="btn today" onClick={currentMonthButtonHandler}>
                <i className="pi pi-calendar pi-fw"></i>
              </div>}
              <div className="btn prev" onClick={prevMonthButtonHandler}>
                <i className="pi pi-angle-left"></i>
              </div>
              <div className="btn next" onClick={nextMonthButtonHandler}>
                <i className="pi pi-angle-right"></i>
              </div>
            </div>
          </div>
          <div className="weekdays">
            <div className="workday">Пон</div>
            <div className="workday">Вт</div>
            <div className="workday">Ср</div>
            <div className="workday">Чет</div>
            <div className="workday">Пет</div>
            <div className="holiday">Съб</div>
            <div className="holiday">Нед</div>
          </div>
          <div className="days">{days}</div>
        </div>
      </div>
    );

    setCalendar(htmlContent);
  };

  useEffect(() => {
    renderCalendar();
    setIsLoading(false);

  }, [holidays]);

  if (isLoading) {
    return <p>Loading...</p>
  }

  return <div>{calendar}</div>
}
import { useState, useRef, useEffect } from 'react';

export default function Calendar(props) {
  const [calendar, setCalendar] = useState();
  const [isLoading, setIsLoading] = useState(false);

  const months = ['Януари', 'Февруари', 'Март', 'Април', 'Май', 'Юни', 'Юли', 'Август', 'Септември', 'Октомври', 'Ноември', 'Декември']
  // const days = ['Нед', 'Пон', 'Вт', 'Ср', 'Чет', 'Пет', 'Съб'];

  const date = new Date();
  let currentMonth = date.getMonth();
  let currentYear = date.getFullYear();

  const renderCalendar = () => {
    const selectDateHandler = (date) => {
      let oldSelectedDate = document.getElementById('selected-date');
      if (oldSelectedDate) {
        oldSelectedDate.id = '';
      }
      if (date.target.classList.contains('prev') || date.target.classList.contains('next')) {
        return;
      }
      date.target.id = 'selected-date';
    }

    const combineClickHandler = (date) => {
      selectDateHandler(date);
      props.setSelectedDate(date.target.innerHTML);
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
      currentMonth = date.getMonth();
      currentYear = date.getFullYear();
      renderCalendar();
    }

    const prevMonthButtonHandler = () => {
      currentMonth--;
      if (currentMonth < 0) {
        currentMonth = 11;
        currentYear--;
      }
      renderCalendar();
    }

    const nextMonthButtonHandler = () => {
      currentMonth++;
      if (currentMonth > 11) {
        currentMonth = 0;
        currentYear++;
      }
      renderCalendar();
    }

    date.setDate(1);

    const firstDay = new Date(currentYear, currentMonth, 1);
    const lastDay = new Date(currentYear, currentMonth + 1, 0);
    const lastDayIndex = lastDay.getDay();
    const lastDayDate = lastDay.getDate();
    const prevLastDay = new Date(currentYear, currentMonth, 0);

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
      counterDays++;
      if (
        i === new Date().getDate() &&
        currentMonth === new Date().getMonth() &&
        currentYear === new Date().getFullYear()
      ) {
        days.push(
          <div key={key} className="day today" onClick={combineClickHandler}>{i}</div>
        );
      } else {
        days.push(
          <div key={key} className="day" onClick={combineClickHandler}>{i}</div>
        );
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
                <span className="material-symbols-outlined">calendar_today</span>
              </div>}
              <div className="btn prev" onClick={prevMonthButtonHandler}>
                <span className="material-symbols-outlined">chevron_left</span>
              </div>
              <div className="btn next" onClick={nextMonthButtonHandler}>
                <span className="material-symbols-outlined">chevron_right</span>
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

  }, [])

  if (isLoading) {
    return <p>Loading...</p>
  }

  return <div>{calendar}</div>
}
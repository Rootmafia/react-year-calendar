import React, { PropTypes } from 'react';
import classnames from 'classnames';

import { monthEdges, weeksOfMonth, daysOfWeek } from '../utils/dateUtils';
import { getMods, getModsByCompType } from '../utils/util';
import Week from './Week';

const clsPrefix = 'rc-Month';

const renderWeekHeader = (props) => {
  if (!props.weekdayNames) {
    return null;
  }

  return (
    <div className={`${clsPrefix}-weekdays`}>
      {
        daysOfWeek(props.date).map((weekday, i) =>
          <div key={ `weekday-header-${i}` } className={ classnames(`${clsPrefix}-weekdays-weekday`) }>
            { weekday.format(props.weekdayFormat) }
          </div>
        )
      }
    </div>
  );
};

const renderHeader = (props) => {
  if (props.renderHeader) {
    return props.renderHeader(props);
  }

  if (!props.monthNames) {
    return null;
  }

  return (
    <header key="header" className={ classnames(`${clsPrefix}-header`) }>
      { props.date.format(props.monthNameFormat) }
    </header>
  );
};

const Month = (props) => {
  const { date, weekNumbers } = props;
  const edges = monthEdges(date);

  let { mods, day, week } = props;
  let clsMods, events;

  if (!props.day) {
    day = getModsByCompType('day', mods);
  }

  if (!props.week) {
    week = getModsByCompType('week', mods);
  }

  if (!props.day || !props.week) { // this means we're probably just rendering a single month and need to filter our component types again.
    mods = getModsByCompType('month', mods);
  }

  let fWeekMods = week.filter((mod, j) => mod.date ? mod.date.isSame(date, 'month') : true);
  let fDayMods = day.filter((mod, k) => mod.date ? mod.date.isSame(date, 'month') : true);

  const modifiers = getMods(mods, date, clsPrefix, 'month');

  if (modifiers) {
    clsMods = modifiers.clsMods;
    events = modifiers.events;
  }

  return (
    <div className={ classnames(clsPrefix, clsMods) } { ...events }>
      { renderHeader(props) }
      { renderWeekHeader(props) }
      {
        weeksOfMonth(props.date).map((wDate, i) =>
          <Week key={ `week-${i}` }
                date={ wDate }
                edges={ edges }
                weekNumbers={ weekNumbers }
                mods={ fWeekMods }
                day={ fDayMods } />
        )
      }
    </div>
  );
};

Month.defaultProps = {
  monthNames: true,
  monthNameFormat: 'MMMM YYYY',
  weekdayNames: true,
  weekdayFormat: 'dd'
};

export default Month;

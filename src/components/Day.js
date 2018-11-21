import React from 'react';
import classnames from 'classnames';

import { getMods } from '../utils/util';

const clsPrefix = 'rc-Day';

const renderHeader = (props) => {
  if (!props.dayHeader) {
    return null;
  }

  return (
    <header className={`${clsPrefix}-Day-header`}>
      { props.date.format(props.dayHeaderFormat) }
    </header>
  );
};

const renderAgenda = (props) => {
  if (!props.dayAgenda) {
    return null;
  }

  return (
    <div key="agenda" className={`${clsPrefix}-Day-agenda`}>
      { props.children }
    </div>
  );
};

const Day = (props) => {
  const clsPrefix = 'rc-Day';
  const { date, mods, outside } = props;
  const modifiers = getMods(mods, date, clsPrefix, 'day');

  let clsMods, events;

  if (modifiers) {
    clsMods = modifiers.clsMods;
    events = modifiers.events;
  }

  const clsDay = classnames(clsPrefix, { 'rc-Day--outside': outside }, clsMods);

  return (
    <div className={ clsDay } { ...events }>
      { renderHeader(props) }
      { date.format(props.dayFormat) }
      { renderAgenda(props) }
    </div>
  );
};


Day.defaultProps = {
  dayAgenda: false,
  dayHeader: false,
  dayHeaderFormat: 'MMM Do',
  dayFormat: 'D'
};

export default Day;

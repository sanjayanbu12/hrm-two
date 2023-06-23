import React from 'react';
import moment from 'moment';
import './AttendanceTracker.css';

class AttendanceTracker extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      eventTitle: '',
      startAt: '',
      endAt: '',
      primaryColorStyle: '#f5222d',
      secondaryColorStyle: '#f86b73',
      allDay: false,
      draggable: false,
      beforeStart: false,
      afterEnd: false,
      startValue: null,
      endValue: null,
      visible: false,
      endOpen: false, // Added endOpen state variable
    };
  }

  componentDidMount() {
    let today = moment();
    let endDay = moment().add(10, 'days');
    console.log(endDay);
    this.setState({
      endValue: today > endDay ? today : null,
    });
  }

  handleChangeLeaveColor = (value) => {
    console.log(`selected ${value}`);
    let primaryColorStyle, secondaryColorStyle;

    if (value === 'red') {
      primaryColorStyle = '#f5222d';
      secondaryColorStyle = '#f86b73';
    } else if (value === 'blue') {
      primaryColorStyle = '#1890ff';
      secondaryColorStyle = '#65b5ff';
    } else if (value === 'yellow') {
      primaryColorStyle = '#fadb14';
      secondaryColorStyle = '#fce65f';
    }

    this.setState({
      primaryColorStyle,
      secondaryColorStyle,
    });
  };

  disabledStartDate = (startValue) => {
    const todayValue = moment();
    if (!startValue || !todayValue) {
      return false;
    }
    return startValue.valueOf() <= todayValue.valueOf();
  };

  disabledEndDate = (endValue) => {
    const { startValue } = this.state;
    if (!endValue || !startValue) {
      return false;
    }
    return endValue.valueOf() <= startValue.valueOf();
  };

  onChange = (field, value) => {
    this.setState({ [field]: value });
  };

  onStartChange = (value) => {
    this.onChange('startValue', value);
    console.log(value);
  };

  onEndChange = (value) => {
    this.onChange('endValue', value);
  };

  handleStartOpenChange = (open) => {
    if (!open) {
      this.setState({ endOpen: true });
    }
  };

  handleEndOpenChange = (open) => {
    this.setState({ endOpen: open });
  };

  onChangeAllDay = (e) => {
    console.log(`checked = ${e.target.checked}`);
    this.setState({ allDay: e.target.checked });
  };

  onChangeDraggable = (e) => {
    console.log(`checked = ${e.target.checked}`);
    this.setState({ draggable: e.target.checked });
  };

  onChangeBeforeStart = (e) => {
    console.log(`checked = ${e.target.checked}`);
    this.setState({ beforeStart: e.target.checked });
  };

  onChangeAfterEnd = (e) => {
    console.log(`checked = ${e.target.checked}`);
    this.setState({ afterEnd: e.target.checked });
  };

  render() {
    return (
      <div>
        {/* Your JSX content goes here */}
      </div>
    );
  }
}

export default AttendanceTracker;

import React, { Component } from 'react';
import Form from '../../components/form/form.js';
import { disableConstraintPopup } from '../../lib/dom';

import styles from './main.css';

export default class Main extends Component {
  static contextTypes = {
    loggedIn: React.PropTypes.bool.isRequired,
  }

  constructor(props) {
    super(props);

    this.state = {
      events: [],
      hasEvents: false,
    };
  }

  componentDidMount() {
    this.parseLocalStorageEvents();
    disableConstraintPopup(document.querySelector('#eventcreate-form'));
  }

  componentDidUpdate() {
    disableConstraintPopup(document.querySelector('#eventcreate-form'));
    if (this.context.loggedIn) setTimeout(() => {
      document.querySelector('#eventname').focus();
    }, 200);
  }

  parseLocalStorageEvents = () => {
    if (typeof window !== 'undefined' && localStorage) {
      const events = localStorage.getItem('events');
      if (events) this.setState({
        events: [...JSON.parse(events)],
        hasEvents: true,
      });
    }
  }

  getNewUserWelcome = () =>
    <section>
      <p>Use the button in the navigation bar to get started with our Udacity Event Planner</p>
    </section>

  handleCreateEventSubmission = (e) => {
    e.preventDefault();
    e.stopPropagation();

    const
      eventend = e.currentTarget.eventend.value,
      eventhostname = e.currentTarget.eventhostname.value,
      eventname = e.currentTarget.eventname.value,
      eventstart = e.currentTarget.eventstart.value,
      eventtype = e.currentTarget.eventtype.value,
      location = e.currentTarget.location.value,
      message = e.currentTarget.message.value;

    const
      eventInfo = {
        eventend,
        eventhostname,
        eventname,
        eventstart,
        eventtype,
        location,
        message,
      };

    this.setState({
      events: [...this.state.events, eventInfo]
    });
    localStorage.setItem(
      'events',
      JSON.stringify([...this.state.events, eventInfo]
    ));
    document.querySelector('#eventcreate-form-progress').value = 0;
    e.currentTarget.reset();
  }

  displayCreatedEvents = () => {
    const events = this.state.events;

    return events.length ? events.map((event, idx) =>
      <article className='single-event' key={idx} >
        <h2>Event Name: {event.eventname} <button onClick={() => this.deleteEvent(idx)}> Delete this event </button></h2>
        <section>
          <div>Event Host: {event.eventhostname}</div>
          <div>Event eventstart: {event.eventstart}</div>
          <div>Event eventend: {event.eventend}</div>
          <div>Event eventtype: {event.eventtype}</div>
          <div>Event location: {event.location}</div>
          <div>Event message: {event.message}</div>
        </section>
      </article>
    ).reverse() :
      <article>You have no saved events</article>;
  };

  deleteEvent = (id) => {
    const events = this.state.events.splice(0);
    if (events[id]) {
      events.splice(id, 1);
      this.setState({events});
      localStorage.setItem(
        'events',
        JSON.stringify([...events]
      ));
    } else this.setState({events: []});
  }

  render() {
    const
      eventsDisplayed = this.state.hasEvents && this.context.loggedIn ?
        this.displayCreatedEvents() :
        null,
      view = this.context.loggedIn ?
        Form({
          handler: this.handleCreateEventSubmission,
          type:'getCreateEventForm',
        }) :
        this.getNewUserWelcome();

    return (
      <div>
        <style scoped type='text/css'>{styles}</style>
        {view}
        {eventsDisplayed}
      </div>
    );
  }
}

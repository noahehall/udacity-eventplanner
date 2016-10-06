import React, { Component } from 'react';
import { checkValidOnBlur } from '../../lib/dom';

import styles from './main.css';

class Main extends Component {
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

  getCreateEventForm = () =>
    <div className='main'>
      <form id='eventcreate-form' onSubmit={this.handleCreateEventSubmission} >
        <h2>
          Create an event
        </h2>
        <section>
          <label htmlFor='eventname'>Event Name<span className='error' />
          </label>
          <input
            id='eventname'
            maxLength={20}
            minLength={2}
            onBlur={(e) => checkValidOnBlur(e, true)}
            pattern='(?:\w+\s*)+\s*\w+'
            placeholder='Name of your event'
            required
            title='Give your event a memorable name between two and twenty characters. no leading or trailing spaces'
            type='text'
          />
        </section>
        <section>
          <label htmlFor='eventhostname'>Event Host Name<span className='error' />
          </label>
          <input
            id='eventhostname'
            maxLength={20}
            minLength={2}
            onBlur={(e) => checkValidOnBlur(e, true)}
            pattern='(?:\w+\s*)+\s*\w+'
            placeholder='Person or Organization hosting the event'
            required
            title='Enter between two and twenty characters'
            type='text'
          />
        </section>
        <section>
          <label htmlFor='eventstart'>Starts<span className='error' />
          </label>
          <input
            id='eventstart'
            onBlur={(e) => checkValidOnBlur(e, true)}
            placeholder='Date and time the event starts'
            required
            type='datetime-local'
          />
        </section>
        <section>
          <label htmlFor='eventend'>Ends<span className='error' />
          </label>
          <input
            id='eventend'
            onBlur={(e) => checkValidOnBlur(e, true)}
            placeholder='Date and time the event ends'
            required
            type='datetime-local'
          />
        </section>
        <section>
          <label htmlFor='location'>Location<span className='error' />
          </label>
          <textarea
            id='location'
            maxLength={20}
            minLength={2}
            onBlur={(e) => checkValidOnBlur(e, true)}
            placeholder='Location (and directions) to event'
            required
          />
        </section>
        <section>
          <label htmlFor='eventtype'>Event Type<span className='error' />
          </label>
          <input
            id='eventtype'
            list='eventtypelist'
            placeholder='Type of event'
            type='text'
          />
          <datalist id='eventtypelist'>
            <select>
              <option value='birthday'>Birthday Party</option>
              <option value='conference'>Conference</option>
              <option value='wedding'>Wedding</option>
              <option value='other' >Other</option>
            </select>
          </datalist>
        </section>
        <section>
          <label htmlFor='guestlist'>Guest list
          </label>
          <textarea id='guestlist' placeholder='Enter one name per line' />
        </section>
        <section>
          <label htmlFor='message'>Message<span className='error' />
          </label>
          <textarea id='message' placeholder='Optional message to the guests with additional information about the event' />
        </section>
        <section>
          <input type='submit' />
        </section>
      </form>
      <article>
        <h1>Your Events</h1>

      </article>
    </div>;

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
      view = !this.context.loggedIn ? this.getCreateEventForm() : this.getNewUserWelcome();

    return (
      <div>
        <style scoped type='text/css'>{styles}</style>
        {view}
        {eventsDisplayed}
      </div>
    );
  }
}

export default Main;

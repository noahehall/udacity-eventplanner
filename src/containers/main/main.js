import React, { Component } from 'react';

import './main.css';

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

  checkValidOnBlur = (e) => {
    const el = e.currentTarget;
    if (el && el.willValidate && !el.validity.valid) {
      // el.setCustomValidity(el.validationMessage);
      // el.title = el.validationMessage;
      el.className = 'has-error';
    } else {
      el.setCustomValidity('');
      el.className = '';
      // el.title = '';
    }
  }

  hasError = (el) => !el ||
    el.validity.valueMissing ||
    el.validity.typeMismatch ||
    el.validity.patternMismatch ||
    el.validity.tooLong ||
    el.validity.tooShort ||
    el.validity.rangeUnderflow ||
    el.validity.rangeOverflow ||
    el.validity.stepMismatch ||
    el.validity.badInput ||
    !el.validity.valid;

  getCreateEventForm = () =>
    <div className='main'>
      <form id='eventcreate-form' onSubmit={this.handleCreateEventSubmission} >
        <h2>
          Create an event
        </h2>
        <div>
          <section className='no-error'>Error! here is the message</section>
          <section>
            <label htmlFor='eventname'>Event Name
            </label>
            <input
              id='eventname'
              //minLength={4}
              onBlur={this.checkValidOnBlur}
              pattern='\w{3}'
              placeholder='Name of your event'
              required
              title='Give your event a memorable name with atleast four characters'
              type='text'
            />
          </section>
        </div>
        <div>
          <section className='no-error'>Error! here is the message</section>
          <section>
            <label htmlFor='eventhostname'>Event Host Name
            </label>
            <input
              id='eventhostname'
              onBlur={this.checkValidOnBlur}
              placeholder='Person or Organization hosting the event'
              required
              type='text'
            />
          </section>
        </div>
        <div>
          <section className='no-error'>Error! here is the message</section>
          <section>
            <label htmlFor='eventstart'>Starts
            </label>
            <input
              id='eventstart'
              onBlur={this.checkValidOnBlur}
              placeholder='Date and time the event starts'
              required
              type='date'
            />
          </section>
        </div>
        <div>
          <section className='no-error'>Error! here is the message</section>
          <section>
            <label htmlFor='eventend'>Ends
            </label>
            <input
              id='eventend'
              onBlur={this.checkValidOnBlur}
              placeholder='Date and time the event ends'
              required
              type='date'
            />
          </section>
        </div>
        <div>
          <section className='no-error'>Error! here is the message</section>
          <section>
            <label htmlFor='location'>Location
            </label>
            <textarea
              id='location'
              onBlur={this.checkValidOnBlur}
              placeholder='Location (and directions) to event' />
          </section>
        </div>
        <div>
          <section className='no-error'>Error! here is the message</section>
          <section>
            <label htmlFor='eventtype'>Event Type
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
        </div>
        <div>
          <section className='no-error'>Error! here is the message</section>
          <section>
            <label htmlFor='guestlist'>Guest list
            </label>
            <textarea id='guestlist' placeholder='Enter one name per line' />
          </section>
        </div>
        <div>
          <section className='no-error'>Error! here is the message</section>
          <section>
            <label htmlFor='message'>Message
            </label>
            <textarea id='message' placeholder='Optional message to the guests with additional information about the event' />
          </section>
        </div>
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
        {view}
        {eventsDisplayed}
      </div>
    );
  }
}

export default Main;

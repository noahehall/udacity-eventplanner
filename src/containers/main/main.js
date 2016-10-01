import React, { Component } from 'react';

import './main.css';

class Main extends Component {
  static contextTypes = {
    loggedIn: React.PropTypes.bool.isRequired,
  }

  constructor(props) {
    super(props);
  }

  getCreateEventForm = () =>
    <div className='main'>
      <form id='eventcreate-form' onSubmit={this.handleSignupSubmit} >
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
              placeholder='Name of your event'
              required
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
              placeholder='Host Name'
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
              placeholder='Date and time the event starts'
              required
              type='datetime-local'
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
              placeholder='Date and time the event ends'
              required
              type='datetime-local'
            />
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
            <textarea id='guestlist' value='Enter one name per line' />
          </section>
        </div>
        <div>
          <section className='no-error'>Error! here is the message</section>
          <section>
            <label htmlFor='name'>Location
            </label>
            <input
              id='name'
              placeholder='Your Name'
              required
              type='text'
            />
          </section>
        </div>
        <div>
          <section className='no-error'>Error! here is the message</section>
          <section>
            <label htmlFor='name'>Optional message to the guests with additional information about the event
            </label>
            <input
              id='name'
              placeholder='Your Name'
              required
              type='text'
            />
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
    <div>
      <h2>Hello!</h2>
      <p>Use the button in the navigation bar to get started with our Udacity Event Planner</p>
    </div>

  render() {
    const view = !this.context.loggedIn ? this.getCreateEventForm() : this.getNewUserWelcome();

    return view;
  }
}

export default Main;

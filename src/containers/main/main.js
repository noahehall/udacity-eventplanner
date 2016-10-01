import React, { Component } from 'react';

import './main.css';

class Main extends Component {
  render() {
    return (
      <div className='main'>
        <form id='eventcreate-form' onSubmit={this.handleSignupSubmit} >
          <h2>
            Create an event
          </h2>
          <div>
            <section className='no-error'>Error! here is the message</section>
            <section>
              <label htmlFor='name'>Name of the event
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
              <label htmlFor='name'>Type of the event (birthday party, conference talk, wedding, etc.)
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
              <label htmlFor='name'>Event host (could be an individual’s name or an organization)
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
              <label htmlFor='name'>Event start date and time
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
              <label htmlFor='name'>Event end date and time
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
              <label htmlFor='name'>Guest list
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
      </div>
    );
  }
}

export default Main;

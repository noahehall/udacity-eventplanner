import React from 'react';
import { checkValidOnEvent } from '../../lib/dom';

import styles from './form.css';

export const getCreateEventForm = (handleCreateEventSubmission) =>
  <div>
    <style scoped type='text/css'>{styles}</style>
    <form autoComplete='on' data-progressid='eventcreate-form-progress' id='eventcreate-form' onSubmit={handleCreateEventSubmission} >
      <h2>
        Create an event
      </h2>
      <progress id='eventcreate-form-progress' max={70} value={0} />
      <section>
        <label htmlFor='eventname'>Event Name<span className='error' />
        </label>
        <input
          data-progress={0}
          data-progressid='eventcreate-form-progress'
          form='eventcreate-form'
          id='eventname'
          maxLength={20}
          minLength={2}
          onBlur={(e) => checkValidOnEvent(e, true)}
          onInput={(e) => checkValidOnEvent(e, true)}
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
          data-progress={0}
          data-progressid='eventcreate-form-progress'
          form='eventcreate-form'
          id='eventhostname'
          maxLength={20}
          minLength={2}
          onBlur={(e) => checkValidOnEvent(e, true)}
          onInput={(e) => checkValidOnEvent(e, true)}
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
          data-progress={0}
          data-progressid='eventcreate-form-progress'
          form='eventcreate-form'
          id='eventstart'
          onBlur={(e) => checkValidOnEvent(e, true)}
          onInput={(e) => checkValidOnEvent(e, true)}
          placeholder='Date and time the event starts'
          required
          type='datetime-local'
        />
      </section>
      <section>
        <label htmlFor='eventend'>Ends<span className='error' />
        </label>
        <input
          data-progress={0}
          data-progressid='eventcreate-form-progress'
          form='eventcreate-form'
          id='eventend'
          onBlur={(e) => checkValidOnEvent(e, true)}
          onInput={(e) => checkValidOnEvent(e, true)}
          placeholder='Date and time the event ends'
          required
          type='datetime-local'
        />
      </section>
      <section>
        <label htmlFor='location'>Location<span className='error' />
        </label>
        <textarea
          data-progress={0}
          data-progressid='eventcreate-form-progress'
          form='eventcreate-form'
          id='location'
          maxLength={100}
          minLength={2}
          onBlur={(e) => checkValidOnEvent(e, true)}
          onInput={(e) => checkValidOnEvent(e, true)}
          placeholder='Location (and directions) for event'
          required
          title='Please enter the address of the event'
        />
      </section>
      <section>
        <label htmlFor='eventtype'>Event Type<span className='error' />
        </label>
        <input
          data-progress={0}
          data-progressid='eventcreate-form-progress'
          form='eventcreate-form'
          id='eventtype'
          list='eventtypelist'
          onBlur={(e) => checkValidOnEvent(e, true)}
          onInput={(e) => checkValidOnEvent(e, true)}
          placeholder='Type of event'
          required
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
        <label htmlFor='guestlist'>Guest list<span className='error' />
        </label>
        <textarea
          data-progress={0}
          data-progressid='eventcreate-form-progress'
          form='eventcreate-form'
          id='guestlist'
          minLength={1}
          onBlur={(e) => checkValidOnEvent(e, true)}
          onInput={(e) => checkValidOnEvent(e, true)}
          placeholder='Enter one name per line'
          required
          title='Enter recipients, one name per line'
        />
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
  </div>;

export const getSignupForm = (handleSignupSubmit) =>
  <div>
    <style scoped type='text/css'>{styles}</style>
    <form autoComplete='on' data-progressid='signup-form-progress' id='signup-form' onSubmit={handleSignupSubmit} >
      <h2>
        Signup to U.E.P
      </h2>
      <progress id='signup-form-progress' max={30} value={0} />
      <section>
        <label htmlFor='name'>Username<span className='error' />
        </label>
        <input
          data-progress={0}
          data-progressid='signup-form-progress'
          form='signup-form'
          id='name'
          maxLength={30}
          minLength={2}
          onBlur={(e) => checkValidOnEvent(e, true)}
          onInput={(e) => checkValidOnEvent(e, true)}
          pattern='^[A-Za-z]+$'
          placeholder='Your Name'
          required
          title='at least two (to 30) letters no spaces'
          type='text'
        />
      </section>
      <section>
        <label htmlFor='email'>email<span className='error' />
        </label>
        <input
          data-progress={0}
          data-progressid='signup-form-progress'
          form='signup-form'
          id='email'
          onBlur={(e) => checkValidOnEvent(e, true)}
          onInput={(e) => checkValidOnEvent(e, true)}
          placeholder='Enter your email address'
          required
          type='email'
        />
      </section>
      <section>
        <label htmlFor='password'>password<span className='error' />
        </label>
        <input
          data-progress={0}
          data-progressid='signup-form-progress'
          form='signup-form'
          id='password'
          maxLength={15}
          minLength={3}
          onBlur={(e) => checkValidOnEvent(e, true)}
          onInput={(e) => checkValidOnEvent(e, true)}
          pattern='^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{3,15}$'
          placeholder='Choose a password'
          required
          title='min length 3, max 15, at least one upper case letter, one lower case letter, and one numeric digit.'
          type='password'
        />
      </section>
      <section>
        <label htmlFor='name'>Employer<span className='error' />
        </label>
        <input
          id='employer'
          placeholder='What company do you work for?'
          type='text'
        />
      </section>
      <section>
        <label htmlFor='name'>Occupation<span className='error' />
        </label>
        <input
          id='occupation'
          placeholder='What is your job title?'
          type='text'
        />
      </section>
      <section>
        <label htmlFor='name'>Birthday<span className='error' />
        </label>
        <input
          id='birthday'
          placeholder='When were you born?'
          type='date'
        />
      </section>
      <section>
        <input type='submit' value='submit' />
      </section>
    </form>
  </div>;

export const getLoginForm = (handleLoginSubmit) =>
  <div>
    <style scoped type='text/css'>{styles}</style>
    <form autoComplete='on' data-progressid='login-form-progress' id='login-form' onSubmit={handleLoginSubmit} >
      <h2>
      Login to U.E.P
      </h2>
      <span className='error' />
      <progress id='login-form-progress' max={20} value={0} />
      <section>
        <label htmlFor='email'>email<span className='error' />
        </label>
        <input
          data-progress={0}
          data-progressid='login-form-progress'
          form='login-form'
          id='email'
          onBlur={(e) => checkValidOnEvent(e, true)}
          onInput={(e) => checkValidOnEvent(e, true)}
          placeholder='Enter your email address'
          required
          type='email'
        />
      </section>
      <section>
        <label htmlFor='password'>password<span className='error' />
        </label>
        <input
          data-progress={0}
          data-progressid='login-form-progress'
          form='login-form'
          id='password'
          onBlur={(e) => checkValidOnEvent(e, true)}
          onInput={(e) => checkValidOnEvent(e, true)}
          placeholder='Choose a password'
          required
          type='password'
        />
      </section>
      <section>
        <input type='submit' value='submit' />
      </section>
    </form>
  </div>;

export default function Form({
  type,
  handler,
}){
  switch (type) {
  case 'getCreateEventForm': return getCreateEventForm(handler);
  case 'getLoginForm': return getLoginForm(handler);
  case 'getSignupForm': return getSignupForm(handler);
  default: return null;
  }
}

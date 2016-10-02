import React, { Component } from 'react';
import Modal from 'react-modal';
import {
  checkValidOnBlur,
  setFirstChildElementError,
  clearFirstChildElementError,
} from '../../lib/dom';

import './page.css';
export class Page extends Component {
  static propTypes = {
    children: React.PropTypes.node,
  }

  static childContextTypes = {
    loggedIn: React.PropTypes.bool,
  }

  static defaultProps = {

  }

  constructor(props) {
    super(props);
    //default state
    this.state = {
      loggedIn: false,
      modalIsOpen: false,
      user: {
        email: '',
        name: '',
        password: '',
      },
    };

    // componentWillMount stuff
    if (typeof window !== 'undefined' && localStorage) {
      const user = localStorage.getItem('user');
      if (user) this.state.user = JSON.parse(user);
    }
  }

  getChildContext() {
    return {
      loggedIn: this.state.loggedIn,
    };
  }

  openModal = () => {
    if (this.state.loggedIn) this.setState({loggedIn: false, modalIsOpen: false });
    else this.setState({modalIsOpen: true});
  };

  // afterOpenModal = () => this.refs.subtitle.style.color = '#f00';

  closeModal = () => this.setState({modalIsOpen: false});

  handleSignupSubmit = (e) => {
    e.preventDefault();
    e.stopPropagation();

    // on form submission
    if (!e.currentTarget.checkValidity()) return setFirstChildElementError(e.currentTarget, 'Form is invalid. Please review all errors');

    const
      email = e.currentTarget.email.value,
      name = e.currentTarget.name.value,
      password = e.currentTarget.password.value;

    const
      userInfo = { email, name, password };

    this.setState({loggedIn: true, user: userInfo });
    localStorage.setItem('user', JSON.stringify(userInfo));
    clearFirstChildElementError(e.currentTarget);
    e.currentTarget.reset();

    return this.closeModal();
  }

  handleLoginSubmit = (e) => {
    e.preventDefault();
    e.stopPropagation();

    // on form submission
    if (!e.currentTarget.checkValidity()) return setFirstChildElementError(e.currentTarget, 'Form is invalid. Please review all errors');

    const
      email = e.currentTarget.email.value,
      password = e.currentTarget.password.value;

    if (this.state.user.password === password && this.state.user.email === email) {
      this.setState({loggedIn: true });
      e.currentTarget.reset();
      clearFirstChildElementError(e.currentTarget);

      return this.closeModal();
    }

    //incorrect login information
    return setFirstChildElementError(e.currentTarget, 'Incorrect login information');
  }

  getSignupForm = () =>
    <form id='signup-form' onSubmit={this.handleSignupSubmit} >
      <h2>
        Signup to U.E.P
      </h2>
      <section>
        <label htmlFor='name'>Username<span className='error' />
        </label>
        <input
          autoFocus
          id='name'
          maxLength={30}
          minLength={2}
          onBlur={(e) => checkValidOnBlur(e, true)}
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
          id='email'
          onBlur={(e) => checkValidOnBlur(e, true)}
          placeholder='Enter your email address'
          required
          type='email'
        />
      </section>
      <section>
        <label htmlFor='password'>password<span className='error' />
        </label>
        <input
          id='password'
          maxLength={15}
          minLength={3}
          onBlur={(e) => checkValidOnBlur(e, true)}
          pattern='^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{3,15}$'
          placeholder='Choose a password'
          required
          title='min length 3, max 15, at least one upper case letter, one lower case letter, and one numeric digit.'
          type='password'
        />
      </section>
      <section>
        <input type='submit' value='submit' />
      </section>
    </form>;

  getLoginForm = () =>
    <form autoComplete='on' id='login-form' onSubmit={this.handleLoginSubmit} >
      <h2>
      Login to U.E.P
      </h2>
      <span className='error' />
      <section>
        <label htmlFor='email'>email<span className='error' />
        </label>
        <input
          id='email'
          onBlur={(e) => checkValidOnBlur(e, true)}
          placeholder='Enter your email address'
          required
          type='email'
        />
      </section>
      <section>
        <label htmlFor='password'>password<span className='error' />
        </label>
        <input
          id='password'
          onBlur={(e) => checkValidOnBlur(e, true)}
          placeholder='Choose a password'
          required
          type='password'
        />
      </section>
      <section>
        <input type='submit' value='submit' />
      </section>
    </form>;

  render() {
    const showNavMessage =
      <li className='navitem fl'>
        <h1>{this.state.loggedIn ? 'Udacity Event Planner': 'Application by @noahedwardhall'}</h1>
      </li>;

    return (
      <div className='page'>
        <ul className='navbar'>
          {showNavMessage}
          <li className='navitem fr'>
            <button className='navlink' onClick={this.openModal}>{this.state.loggedIn ? 'Logout' : 'Start'}</button>
            <Modal
              isOpen={this.state.modalIsOpen}
              onAfterOpen={this.afterOpenModal}
              onRequestClose={this.closeModal}
              // closeTimeoutMS={n}
              // style={customStyle}
            >
              <button className='close-modal' onClick={this.closeModal} >X</button>
              <h1>Udacity Event Planner</h1>
              {this.getSignupForm()}
              {this.getLoginForm()}
            </Modal>
          </li>
        </ul>
        {this.props.children}
      </div>
    );
  }
}

export default Page;

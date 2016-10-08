import React, { Component } from 'react';
import Modal from 'react-modal';
import Helmet from 'react-helmet';
import Form from '../../components/form/form.js';
import {
  clearFirstChildElementError,
  disableConstraintPopup,
  setFirstChildElementError,
} from '../../lib/dom';

import styles from './page.css';

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
        birthday: '',
        email: '',
        employer: '',
        name: '',
        occupation: '',
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

  afterOpenModal = () => {
    disableConstraintPopup(document.querySelector('#signup-form'));
    disableConstraintPopup(document.querySelector('#login-form'));
    document.querySelector('#name').focus();
  };

  closeModal = () => this.setState({modalIsOpen: false});

  handleSignupSubmit = (e) => {
    e.preventDefault();
    e.stopPropagation();

    // on form submission
    if (!e.currentTarget.checkValidity()) return setFirstChildElementError(e.currentTarget, 'Form is invalid. Please review all errors');

    const
      birthday = e.currentTarget.birthday.value,
      email = e.currentTarget.email.value,
      employer = e.currentTarget.employer.value,
      name = e.currentTarget.name.value,
      occupation = e.currentTarget.occupation.value,
      password = e.currentTarget.password.value;

    const
      userInfo = { birthday, email, employer, name, occupation, password };

    this.setState({loggedIn: true, user: userInfo });
    localStorage.setItem('user', JSON.stringify(userInfo));
    clearFirstChildElementError(e.currentTarget);
    document.querySelector('#signup-form-progress').value = 0;
    e.currentTarget.reset();

    return this.closeModal();
  }

  handleLoginSubmit = (e) => {
    e.preventDefault();
    e.stopPropagation();

    // on form submission
    if (!e.currentTarget.checkValidity())
      return setFirstChildElementError(e.currentTarget, 'Form is invalid. Please review all errors');

    const
      email = e.currentTarget.email.value,
      password = e.currentTarget.password.value;

    if (this.state.user.password === password && this.state.user.email === email) {
      this.setState({loggedIn: true });
      e.currentTarget.reset();
      clearFirstChildElementError(e.currentTarget);
      document.querySelector('#login-form-progress').value = 0;

      return this.closeModal();
    }

    //incorrect login information
    return setFirstChildElementError(e.currentTarget, 'Incorrect login information');
  }

  render() {
    const showNavMessage =
      <li className='navitem fl'>
        <h1>{this.state.loggedIn ? 'Udacity Event Planner': 'Application by @noahedwardhall'}</h1>
      </li>;

    return (
      <div className='page'>
        <Helmet
          htmlAttributes={{lang: 'en'}}
          meta={[
            {content: "Udacity Event Planner by @noahedwardhall", name: "description"},
            {content: 'Home', property: 'og:title'},
          ]}
          title='Udacity Event Planner'
        />
        <style scoped type='text/css'>{styles}</style>
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
              {Form({ handler: this.handleSignupSubmit, type: 'getSignupForm'})}
              {Form({ handler: this.handleLoginSubmit, type: 'getLoginForm' })}
            </Modal>
          </li>
        </ul>
        {this.props.children}
      </div>
    );
  }
}

export default Page;

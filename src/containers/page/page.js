import React, { Component } from 'react';
import Modal from 'react-modal';
import './page.css';

export class Page extends Component {
  static propTypes = {
    children: React.PropTypes.node
  }

  static defaultProps = {

  }

  constructor(props) {
    super(props);
    //default state
    this.state = {
      events: {},
      loggedIn: false,
      modalIsOpen: false,
      user: {
        email: '',
        name: ''
      }
    };

    // componentWillMount stuff
    if (typeof window !== 'undefined' && localStorage) {
      const user = localStorage.getItem('user');
      if (user) {
        this.state.user = JSON.parse(user);
        this.state.loggedIn = true;
      }
    }
  }

  openModal = () => this.setState({modalIsOpen: true});

  // afterOpenModal = () => this.refs.subtitle.style.color = '#f00';

  closeModal = () => this.setState({modalIsOpen: false});

  handleSignupSubmit = (e) => {
    e.preventDefault();
    e.stopPropagation();

    const
      email = e.currentTarget.email.value,
      name = e.currentTarget.name.value;

    const userInfo = { email, name };

    this.setState({loggedIn: true, user: userInfo });
    localStorage.setItem('user', JSON.stringify(userInfo));
    this.closeModal();
  }

  handleLoginSubmit = (e) => {
    e.preventDefault();
    e.stopPropagation();

    const
      email = e.currentTarget.email.value,
      password = e.currentTarget.password.value;

    if (this.state.user.password === password && this.state.user.email === email) {
      this.setState({loggedIn: true });
      this.closeModal();
    } else console.log('incorrect user', this.state.user);
  }

  render() {
    return (
      <div className="page">
        <ul className='navbar'>
          <li className='navitem fr'>
            <button className='navlink fl' onClick={this.openModal}>Login</button>
            <Modal
              isOpen={this.state.modalIsOpen}
              onAfterOpen={this.afterOpenModal}
              onRequestClose={this.closeModal}
            >
              <button onClick={this.closeModal}>X</button>
              <h1>Udacity Event Planner </h1>
              <form id="signup-form" onSubmit={this.handleSignupSubmit} >
                <h2>
                  Signup to U.E.P
                </h2>
                <section>
                  <label htmlFor='name'>name:
                  </label>
                  <input
                    id='name'
                    placeholder='Your Name'
                    required
                    type='text'
                  />
                </section>
                <section>
                  <label htmlFor='email'>email:
                  </label>
                  <input
                    id='email'
                    placeholder='Enter your email address'
                    required
                    type='email'
                  />
                </section>
                <section>
                  <label htmlFor='password'>password:
                  </label>
                  <input
                    id='password'
                    placeholder='Choose a password'
                    required
                    type='password'
                  />
                </section>
                <section>
                  <input type='submit' />
                </section>
              </form>
              <form id="login-form" onSubmit={this.handleLoginSubmit} >
                <h2>
                Login to U.E.P
                </h2>
                <section>
                  <label htmlFor='email'>email:
                  </label>
                  <input
                    id='email'
                    placeholder='Enter your email address'
                    required
                    type='email'
                  />
                </section>
                <section>
                  <label htmlFor='password'>password:
                  </label>
                  <input
                    id='password'
                    placeholder='Choose a password'
                    required
                    type='password'
                  />
                </section>
                <section>
                  <input type='submit' />
                </section>
              </form>
            </Modal>
          </li>
        </ul>
        {this.props.children}
      </div>
    );
  }
}

export default Page;

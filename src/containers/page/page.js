import React, { Component } from 'react';
import Modal from 'react-modal';
import './page.css';

export class Page extends Component {
  static propTypes = {
    children: React.PropTypes.node,
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

  openModal = () => {
    if (this.state.loggedIn) this.setState({loggedIn: false, modalIsOpen: false });
    else this.setState({modalIsOpen: true});
  };

  // afterOpenModal = () => this.refs.subtitle.style.color = '#f00';

  closeModal = () => this.setState({modalIsOpen: false});

  handleSignupSubmit = (e) => {
    e.preventDefault();
    e.stopPropagation();

    const
      email = e.currentTarget.email.value,
      name = e.currentTarget.name.value,
      password = e.currentTarget.password.value;

    console.log('password is', password);

    const userInfo = { email, name, password };

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
      <div className='page'>
        <ul className='navbar'>
          <li className='navitem fr'>
            <button className='navlink fl' onClick={this.openModal}>{this.state.loggedIn ? 'Logout' : 'Start'}</button>
            <Modal
              isOpen={this.state.modalIsOpen}
              onAfterOpen={this.afterOpenModal}
              onRequestClose={this.closeModal}
              // closeTimeoutMS={n}
              // style={customStyle}
            >
              <button className='close-modal' onClick={this.closeModal} >X</button>
              <h1>Udacity Event Planner</h1>
              <form id='signup-form' onSubmit={this.handleSignupSubmit} >
                <h2>
                  Signup to U.E.P
                </h2>
                <div>
                  <section className='no-error'>Error! here is the message</section>
                  <section>
                    <label htmlFor='name'>name:
                    </label>
                    <input
                      id='name'
                      maxLength={30}
                      minLength={2}
                      pattern='[A-Za-z]{2,30}'
                      placeholder='Your Name'
                      required
                      title='at least two (to 30) letters'
                      type='text'
                    />
                  </section>
                </div>
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
                    maxLength={15}
                    minLength={4}
                    pattern='^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{4,15}$'
                    placeholder='Choose a password'
                    required
                    title='min length 4, max 15, at least one upper case letter, one lower case letter, and one numeric digit.'
                    type='password'
                  />
                </section>
                <section>
                  <input type='submit' />
                </section>
              </form>
              <form id='login-form' onSubmit={this.handleLoginSubmit} >
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

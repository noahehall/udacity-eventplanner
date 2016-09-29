import React, { Component } from 'react';
import Modal from 'react-modal';
import './page.css';

class Page extends Component {
  static propTypes = {
    children: React.PropTypes.node
  }

  static defaultProps = {

  }

  constructor(props) {
    super(props);

    //d default state
    this.state = {
      events: [],
      loggedIn: false,
      modalIsOpen: false,
      user: {
        email: '',
        name: ''
      }
    };

    // componentWillMount stuff
    if (typeof window !== 'undefined') console.log(window.localStorage);
    console.log('noah');
  }

  openModal = () => this.setState({modalIsOpen: true});

  // afterOpenModal = () => this.refs.subtitle.style.color = '#f00';

  closeModal = () => this.setState({modalIsOpen: false});

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
              <div>Login to U.E.P</div>
              <form>
                <label htmlFor='name'>name:
                  <input
                    id='name'
                    placeholder='Your First and Last Name'
                    required
                    type='text'
                  />

                </label>
                <label htmlFor='email'>email:
                  <input
                    id='email'
                    placeholder='Enter your email address'
                    required
                    type='email'
                  />
                </label>
                <div>
                  <input type='submit' />
                </div>
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

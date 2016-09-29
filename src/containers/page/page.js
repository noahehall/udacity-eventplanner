import React, { Component } from 'react';
import Modal from 'react-modal';
import './page.css';

class Page extends Component {
  static propTypes = { children: React.PropTypes.node };

  constructor(props) {
    super(props);
    this.state = { modalIsOpen: false };
  }

  openModal = () => this.setState({modalIsOpen: true});

  // afterOpenModal = () => this.refs.subtitle.style.color = '#f00';

  closeModal = () => this.setState({modalIsOpen: false});

  render() {
    return (
      <div className="page">
        <ul className='navbar'>
          <li className='navitem fr'>
            <button className='navlink fl' onClick={this.openModal}>Open Modal</button>
            <Modal
              isOpen={this.state.modalIsOpen}
              onAfterOpen={this.afterOpenModal}
              onRequestClose={this.closeModal}
            >
              <button onClick={this.closeModal}>close</button>
              <div>I am a modal</div>
              <form>
                <input />
                <button>tab navigation</button>
                <button>stays</button>
                <button>inside</button>
                <button>the modal</button>
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

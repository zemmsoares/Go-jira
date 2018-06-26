import React from 'react';
import PropTypes from 'prop-types';

export default class ModalAdvancedSearch extends React.Component {
  render() {
   
    if(!this.props.show) {
      return null;
    }

    const backdropStyle = {
      position: 'fixed',
      top: 0,
      bottom: 0,
      left: 0,
      right: 0,
      backgroundColor: 'rgba(0,0,0,0.3)',
      padding: 25,      
    };

    const modalStyle = {
      backgroundColor: '#F8F8F8',
      borderRadius: 5,
      maxWidth: 1500,
      minHeight: 890,
      margin: '0 auto',
      padding: 10,
    };    

    return (

    <div className="backdrop z3" style={backdropStyle}>
     <div className="modal-content" style={modalStyle}>
          <div className="modal-header">
            <h4 className="modal-title">{this.props.titulo}</h4>
            <button onClick={this.props.onClose} type="button" className="close">&times;</button>
          </div>
          <div className="modal-body" >
            {this.props.children}
          </div>
          <div className="modal-footer">
            <button type="button" className="btn btn-default" onClick={this.props.onClose}>Close</button>
          </div>
        </div>
    </div>

    );
  }
}

ModalAdvancedSearch.propTypes = {
  onClose: PropTypes.func.isRequired,
  show: PropTypes.bool,
  children: PropTypes.node
};

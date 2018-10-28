import React, { Component } from "react";
import { delete_book } from "../../actions/index";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { Modal } from "react-bootstrap";
import "../delete_book/delete_book.css";

class DeleteBook extends Component {
  constructor(props) {
    super(props);
    this.state = {
      show: false
    };
  }

  handleClose = () => {
    this.setState({ show: false });
  };

  handleShow = event => {
    this.setState({ show: true });
  };

  delete_book = () => {
    const { id } = this.props.book;
    this.props.delete_book(id);
    this.handleClose();
  };
  render_modal_body = () => {
    const { title } = this.props.book;
    return (
      <div>
        <h6>
          Are you sure you want to delete this book:
          <span className="delete__span"> {title} </span>
          <span>?</span>
        </h6>
      </div>
    );
  };
  render_modal_footer = () => {
    return (
      <div className="btn-group">
        <button className="my__btn close__btn" onClick={this.handleClose}>
          Close
        </button>
        <button
          className="my__btn ok__btn"
          type="submit"
          onClick={this.delete_book}
        >
          Ok
        </button>
      </div>
    );
  };

  render() {
    return (
      <div className="delete__book_container">
        <div>
          <button
            type="submit"
            className="my__btn delete__btn"
            onClick={this.handleShow}
          >
            Delete
          </button>
        </div>
        <Modal show={this.state.show} onHide={this.handleClose}>
          <Modal.Header>
            <Modal.Title>Delete Book</Modal.Title>
          </Modal.Header>

          <Modal.Body>{this.render_modal_body()}</Modal.Body>

          <Modal.Footer>{this.render_modal_footer()}</Modal.Footer>
        </Modal>
      </div>
    );
  }
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({ delete_book }, dispatch);
}

export default connect(
  null,
  mapDispatchToProps
)(DeleteBook);

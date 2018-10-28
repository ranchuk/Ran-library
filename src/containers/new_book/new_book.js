import React, { Component } from "react";
import { add_book, edit_book } from "../../actions/index";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import {
  Modal,
  HelpBlock,
  FormControl,
  FormGroup,
  ControlLabel
} from "react-bootstrap";
import "../new_book/new_book.css";
import classnames from "classnames";

class NewBook extends Component {
  constructor(props) {
    super(props);

    this.state = {
      title: "",
      author: "",
      published_date: "",
      title_error: "",
      author_error: "",
      published_date_error: "",
      show: false
    };
  }

  openModal = () => {
    if (this.props.type === "edit") {
      const { title, author_name, published_date } = this.props.book;
      this.setState({
        title: this.title_filter(title),
        author: this.title_filter(author_name),
        published_date: this.date_filter(published_date)
      });
    }

    this.handleShow();
  };
  closeModal = () => {
    this.initialize_state();
    this.handleClose();
  };
  initialize_state = () => {
    this.setState({
      title: "",
      author: "",
      published_date: "",
      title_error: "",
      author_error: "",
      published_date_error: ""
    });
  };
  handleShow = () => {
    this.setState({ show: true });
  };
  handleClose = () => {
    this.setState({ title: "", show: false });
  };
  render_edit_add_buttons = () => {
    if (this.props.type === "ADD")
      return <div className="btn__add__plus" onClick={this.openModal} />;

    return (
      <button
        type="button"
        className={`my__btn ${this.props.btnClass}`}
        onClick={this.openModal}
      >
        EDIT
      </button>
    );
  };
  render_modal_bottons = valid => {
    return (
      <div>
        <button
          className="my__btn close__btn"
          type="button"
          onClick={this.closeModal}
        >
          Close
        </button>
        <button
          className="my__btn submit__btn"
          type="submit"
          onClick={this.onSubmit}
        >
          OK
        </button>
      </div>
    );
  };

  onSubmit = event => {
    event.preventDefault();

    if (this.validate()) {
      //console.log("passed validation");

      if (this.props.type === "edit") {
        const new_book = {
          id: this.props.book.id,
          title: this.title_filter(this.state.title),
          author_name: this.title_filter(this.state.author),
          published_date: this.date_filter(this.state.published_date)
        };
        this.props.edit_book(new_book);
      } else {
        const new_book_add = {
          title: this.title_filter(this.state.title),
          author_name: this.title_filter(this.state.author),
          published_date: this.date_filter(this.state.published_date)
        };
        this.props.add_book(new_book_add);
      }
      this.closeModal();
    }
  };

  title_filter = str => {
    return str
      .toLowerCase()
      .replace(/\W/g, " ")
      .split(" ")
      .map(word => {
        return word.slice(0, 1).toUpperCase() + word.slice(1, word.length);
      })
      .join(" ")
      .replace(/^\s+|\s+$/g, "");
  };

  date_filter = date => {
    date = date.split("-");
    return `${date[2]}-${date[1]}-${date[0]}`;
  };
  formattedDate = (d = new Date()) => {
    let month = String(d.getMonth() + 1);
    let day = String(d.getDate());
    const year = String(d.getFullYear());

    if (month.length < 2) month = "0" + month;
    if (day.length < 2) day = "0" + day;

    return `${day}/${month}/${year}`;
  };

  validate = () => {
    const { published_date } = this.state;
    const cureent_date = new Date();

    const title = this.title_filter(this.state.title);
    const author = this.title_filter(this.state.author);

    const tmp_title_error = title.length === 0 ? "Title is required!" : "";
    const author_error = author.length === 0 ? "Author is required!" : "";
    const published_date_error = !published_date
      ? "Published date is required!"
      : new Date(published_date) > cureent_date
        ? `Please fill date not over ${this.formattedDate(cureent_date)} `
        : "";

    const id = this.props.book ? this.props.book.id : 0;
    const exist = this.props.books.find(book => {
      return book.title === title && book.id !== id ? true : false;
    });

    const title_error = exist ? "Title already exist!" : tmp_title_error;

    this.setState({
      title_error: title_error,
      author_error: author_error,
      published_date_error: published_date_error
    });

    const valid =
      title_error.length > 0 ||
      author_error.length > 0 ||
      published_date_error.length > 0
        ? false
        : true;

    return valid;
  };

  handle_change(value, e) {
    const error = `${value}_error`;
    this.setState({ [value]: e.target.value, [error]: "" });
  }
  render_field(value) {
    const type = value === "published_date" ? "date" : "text";
    const error = `${value}_error`;
    const placeholder =
      value !== "published_date"
        ? `Enter ${value}. Not english/numeric letters will replace in space`
        : `Enter ${value}`;
    console.log(value);
    console.log(placeholder);

    const field_label = value === "published_date" ? "published date" : value;
    const control_label = this.title_filter(`Book ${field_label}`);
    return (
      <FormGroup controlId={value}>
        <ControlLabel>
          <h5>{control_label}</h5>
        </ControlLabel>
        <FormControl
          className={classnames({
            "is-invalid": this.state[error] !== ""
          })}
          controlid={value}
          type={type}
          value={this.state[value]}
          placeholder={placeholder}
          onChange={e => {
            this.handle_change(value, e);
          }}
        />
        <HelpBlock style={{ color: "#cc0000" }}>{this.state[error]}</HelpBlock>
      </FormGroup>
    );
  }

  render() {
    return (
      <div>
        {this.render_edit_add_buttons()}
        <Modal show={this.state.show} onHide={this.handleClose}>
          <Modal.Header>
            <Modal.Title>{this.title_filter(this.props.title)}</Modal.Title>
          </Modal.Header>

          <Modal.Body>
            <form onSubmit={this.onSubmit} autoComplete="new-password">
              {this.render_field("title")}
              {this.render_field("author")}
              {this.render_field("published_date")}
            </form>
          </Modal.Body>
          <Modal.Footer>
            <div className="btn-group">{this.render_modal_bottons()}</div>
          </Modal.Footer>
        </Modal>
      </div>
    );
  }
}

const mapDispatchToProps = dispatch => {
  return bindActionCreators({ add_book, edit_book }, dispatch);
};

function mapStateToProps(state) {
  return { books: state.books };
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(NewBook);

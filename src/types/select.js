var React = require('react');
var ReactDOM = require('react-dom');
var uuid = require('uuid');
var clone = require('lodash/clone');
var reject = require('lodash/reject');

var SelectType = React.createClass({
  getDefaultProps: function() {
    return {
      editing: false,
      answerCallback: null,
      editCallback: null
    };
  },

  getInitialState: function() {
    return {
      id: null,
      name: null,
      required: false,
      description: null,
      answer: null,
      options: []
    }
  },

  componentDidMount: function() {
    if (!this.props.editing) {
      this.setState({
        id: this.props.id,
        name: this.props.name,
        required: this.props.required,
        description: this.props.description,
        options: this.props.options
      });
    }
    else {
      this.setState({
        id: uuid.v4()
      });
    }
  },

  answerChanged: function(ev) {
    this.setState({
      answer: ev.target.value
    });
  },

  nameChanged: function(ev) {
    this.setState({
      name: ev.target.value
    })
  },

  descriptionChanged: function(ev) {
    this.setState({
      description: ev.target.value
    })
  },

  selected: function(ev) {
    this.setState({
      answer: ev.target.value
    });
  },

  addOption: function() {
    var option = ReactDOM.findDOMNode(this.refs.option_name).value;
    var options = clone(this.state.options);
    options.push({
      id: uuid.v4(),
      name: option
    });
    this.setState({options: options});
  },

  removeOption: function(option_id) {
    var options = reject(this.state.options, function(option) {
      return option.id === option_id;
    });
    this.setState({options: options});
  },

  render: function() {
    if (!this.props.editing) {
      var options = (
        <select className="form-control" selected={this.state.answer} onChange={this.selected}>
          {this.state.options.map(function(option) {
            return <option value={option.id}>{option.name}</option>;
          }.bind(this))}
        </select>
      );
      return (
        <div>
          <h3>{this.state.name}</h3>
          <h4>{this.state.description}</h4>
          {options}
        </div>
      );
    }
    else {
      var options = (
        <ul className="list-group">
          {this.state.options.map(function(option) {
            return <li className="list-group-item" onClick={this.removeOption.bind(this, option.id)}>{option.name}</li>;
          }.bind(this))}
        </ul>
      )
      return (
        <div>
          <form>
            <div className="form-group">
              <label>Question name</label>
              <input type="text" className="form-control" placeholder="Question name" onChange={this.nameChanged} value={this.state.name}/>
            </div>
            <div className="form-group">
              <label>Question description</label>
              <input type="text" className="form-control" placeholder="Question description" onChange={this.descriptionChanged} value={this.state.description}/>
            </div>
          </form>
          <div className="row">
            <div className="col-md-6">
              <div className="panel panel-default">
                <div className="panel-heading">Add option</div>
                <div className="panel-body">
                  <div className="form-group">
                    <label>Option name</label>
                    <input type="text" className="form-control" placeholder="Option name" ref="option_name" />
                  </div>
                  <br />
                  <button className="btn btn-default" onClick={this.addOption}>Add option</button>
                </div>
              </div>
            </div>
            <div className="col-md-6">
              <div className="panel panel-default">
                <div className="panel-heading">Current options</div>
                <div className="panel-body">
                  <p>Below are the current options for this question.<br/><b>You can delete options by clicking on them.</b></p>
                  {options}
                </div>
              </div>
            </div>
          </div>
        </div>
      );
    }
  }
});

module.exports = SelectType;

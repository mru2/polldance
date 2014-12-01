/** @jsx React.DOM */
var Search = React.createClass({

  getInitialState: function() {
    return {
      results: []
    };
  },

  render: function() {

    var sectionStyle = {
      transform: 'translateX(' + (this.props.displayed ? '0' : '100%') + ')'
    };

    return (
      <section style={sectionStyle}>
        <h1>Search</h1>
      </section>
    );
  }

});
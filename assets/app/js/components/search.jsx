/** @jsx React.DOM */
var Search = React.createClass({

  mixins: [Reflux.ListenerMixin],

  getInitialState: function() {
    return {
      results: []
    };
  },

  componentDidMount: function() {
    this.listenTo(PD.SearchStore, this.onSearchChange);
  },

  onSearchChange: function() {
    console.log('[SEARCH] Search changed');
    this.state.results = PD.SearchStore.getResults();
  },

  handleSubmit: function(){
    console.log('[SEARCH] on submit');
    query = this.refs.searchInput.getDOMNode().value.trim();

    PD.Actions.search(query)
    PD.API.search(query)
          .then(PD.Actions.searchSuccess)
          .fail(PD.Actions.apiFailure);
 
    return false;
  },

  render: function() {

    var sectionStyle = {
      transform: 'translateX(' + (this.props.displayed ? '0' : '100%') + ')'
    };

    var resultNodes = _.map(this.state.results, function(result, index){

      var resultNode = (
        <Result 
          key={result.id}
          ref={result.id}
          id={result.id}
          artist={result.artist}
          title={result.title}
          position={index} />
      );

      return resultNode;

    });

    return (
      <section style={sectionStyle}>
        <h1>Search</h1>
        <form onSubmit={this.handleSubmit}>
          <input type="text" placeholder="Artist, track, ..." ref="searchInput" />
          <button onClick={this.handleSubmit}>Search</button>
        </form>

        { resultNodes }

      </section>
    );
  }

});
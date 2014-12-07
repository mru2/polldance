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
      transform: 'translateX(' + (this.props.displayed ? '0' : '100%') + ')',
      '-webkit-transform': 'translateX(' + (this.props.displayed ? '0' : '100%') + ')'
    };

    var resultNodes = _.map(this.state.results, function(result, index){

      var resultNode = (
        <Result 
          key={result.id}
          ref={result.id}
          id={result.id}
          artist={result.artist}
          title={result.title}
          position={index + 1} />
      );

      return resultNode;

    });

    return (
      <section style={sectionStyle}>
        <div className="item subheader">
          <form onSubmit={this.handleSubmit}>
            <div className="item-left">
              <div className="item-content">
                <input className="search-input" type="text" placeholder="Artist, track, ..." ref="searchInput" />
              </div>
            </div>
            <div className="item-right search-submit" onClick={this.handleSubmit}>
              <div className="item-content">
                <span className="item-icon">
                  <i className="fa fa-search"></i>
                </span>
              </div>
            </div>
          </form>          
        </div>

        { resultNodes }

      </section>
    );
  }

});
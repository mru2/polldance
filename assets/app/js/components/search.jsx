/** @jsx React.DOM */
var Search = React.createClass({

  mixins: [Reflux.ListenerMixin],

  getInitialState: function() {
    return {
      results: [],
      searching: false
    };
  },

  componentDidMount: function() {
    this.listenTo(PD.SearchStore, this.onSearchChange);
  },

  onSearchChange: function() {
    console.log('[SEARCH] Search changed');
    this.setState({
      results: PD.SearchStore.getResults(),
      searching: false
    });
  },

  handleSubmit: function(){
    console.log('[SEARCH] on submit');
    var input =  this.refs.searchInput.getDOMNode();
    query = input.value.trim();

    this.setState({
      searching: true
    });

    input.blur();

    // this.refs.searchInput.blur();
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

    var searchIcon = (this.state.searching) ? 'fa fa-circle-o-notch item-spinner' : 'fa fa-search';

    return (
      <section style={sectionStyle} className="scroll-content has-header">
        <div className="item subheader">
          <form onSubmit={this.handleSubmit}>
            <div className="item-left">
              <div className="item-content">
                <input className="search-input" type="text" placeholder="Type the artist or song name" autoComplete="off" autoCorrect="off" autoCapitalize="off" ref="searchInput" />
              </div>
            </div>
            <div className="item-right search-submit" onClick={this.handleSubmit}>
              <div className="item-content">
                <span className="item-icon">
                  <i className={searchIcon}></i>
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
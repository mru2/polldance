/** @jsx React.DOM */
var App = React.createClass({
  
  mixins: [Reflux.ListenerMixin],

  getInitialState: function() {
    return {
      searchDisplayed: false
    };
  },

  componentDidMount: function() {
    this.listenTo(PD.SearchStore, this.onSearchChange);
  },

  toggleSearch: function() {
    PD.Actions.toggleSearch();
  },

  onSearchChange: function(){
    console.log('[APP] Search changed');
    this.setState({searchDisplayed: PD.SearchStore.searchDisplayed()});
  },

  render: function() {

    return (
      
      <div className="main-container has-header">

        <header className="item header">
          <div className="item-content">
            <span className="header-title">poll<em>.dance</em> / 2</span>
            <span onClick={this.toggleSearch}>Search</span>
          </div>
        </header>

        <Playlist displayed={!this.state.searchDisplayed} />

        <Search displayed={this.state.searchDisplayed} />

      </div>

    );
  }
});
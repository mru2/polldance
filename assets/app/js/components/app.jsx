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

    var iconClassName;
    if (this.state.searchDisplayed) {
      iconClassName = 'fa fa-bars';
    }
    else {
      iconClassName = 'fa fa-search';      
    }

    return (
      
      <div className="main-container has-header">

        <header className="item header">
          <div className="item-right">
            <div className="item-content">
              <span className="item-icon">
                <i className={iconClassName} onClick={this.toggleSearch} />
              </span>
            </div>
          </div>

          <div className="item-left">
            <div className="item-content">
              <span className="header-title">poll.dance</span>
            </div>
          </div>
        </header>

        <Playlist displayed={!this.state.searchDisplayed} />

        <Search displayed={this.state.searchDisplayed} />

      </div>

    );
  }
});
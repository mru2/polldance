# Assets server
require 'sprockets'
require 'jsx'

class Assets < Sprockets::Environment

  def initialize

    # Base sprockets setup
    super

    append_path 'assets'

    # Handle .jsx files
    register_engine '.jsx', JSX::Template

    self.js_compressor  = :uglify
    self.css_compressor = :scss

  end

end
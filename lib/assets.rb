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

    # TODO (possible?) lazy compression
    if APP_ENV == :production
      js_compressor  = :uglify
      css_compressor = :scss
    end

  end

end
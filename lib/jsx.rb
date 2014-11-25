# Shamelessly stolen from https://github.com/reactjs/react-rails ^^

require 'tilt'
require 'execjs'

module JSX

  class Template < Tilt::Template
    self.default_mime_type = 'application/javascript'

    def prepare ; end

    def evaluate(scope, locals, &block)
      @output ||= JSX::transform(data)
    end
  end

  def self.context
    unless @context
      # If execjs uses therubyracer, there is no 'global'. Make sure
      # we have it so JSX script can work properly.
      contents = 'var global = global || this;' + File.read("#{APP_ROOT}/assets/vendor/react/JSXTransformer.js")
      @context = ExecJS.compile(contents)
    end

    @context
  end

  def self.transform(code)
    result = context.call('JSXTransformer.transform', code)
    return result['code']
  end
end

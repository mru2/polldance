# Monkey patches and utility methods
def Hash.symbolize_keys
  inject({}){|memo,(k,v)| memo[k.to_sym] = v; memo}
end 
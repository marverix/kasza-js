Kasza = {

  # Cache storage
  # @private
  _storage: {}

  # ttlTimers
  # @private
  _ttlTimers: {}

  # Default config
  # @private
  _config: {
    debug: false
    inNode: false
  }

  # config
  config: null


  # Setup
  setup: (config) ->
    @config = Object.assign({}, @_config, config)
    @config.inNode = module?.exports?


  # Debug
  # @private
  _debug: (msg) ->
    return unless @config.debug
    if typeof @config.debug is 'function'
      @config.debug msg
    else
      msg = '💾 Cache Service: ' + msg
      if @config.inNode
        console.log("\x1b[36m#{msg}\x1b[0m")
      else
        console.log("%c #{msg}", 'color: #87b5c4;')

  # Set
  set: (id, value, ttl) ->
    if @isStored(id)
      @_debug "Updating #{id}"
    else
      @_debug "Setting #{id}"

    @_storage[id] = value

    if ttl? and ttl > 0
      @_setTTL(id, ttl)
    return

  # Retrieve
  get: (id) ->
    @_storage[id]

  # Remove
  remove: (id) ->
    @_debug "Removing #{id}"
    delete @_storage[id]

  # Is stored?
  isStored: (id) ->
    @_storage[id]?

  # Set TTL timer
  # @private
  _setTTL: (id, ttl) ->
    @_debug "Setting TTL of #{id} to #{ttl}"
    if @_ttlTimers[id]?
      clearTimeout(@_ttlTimers[id])

    do (id, ttl) =>
      @_ttlTimers[id] = setTimeout( =>
        @remove(id)
        delete @_ttlTimers[id]
      , ttl)
    return

  # Truncate
  truncate: ->
    # Clear timers
    for id, timer of @_ttlTimers
      clearTimeout(timer)
    @_ttlTimers = {}

    # Clear storage
    @_storage = {}
    return

}


# Setup
Kasza.setup()

# Export
export default Kasza

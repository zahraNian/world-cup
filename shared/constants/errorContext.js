export const ERROR_SOURCE = Object.freeze({
  ABR_BUS: 'ABR_BUS',
  EMITTER: 'EMITTER',
})

export const ABR_EVENT = Object.freeze({
  PING: 'ping',
  SOCKET_RECONNECTED: 'socketReconnected',
  SOCKET_RECONNECTING: 'socketReconnecting',
  SOCKET_DISCONNECTED: 'socketDisconnected',
  TOKEN_VERIFIED: 'tokenVerified',
  TOKEN_REMOVED: 'tokenRemoved',
})

export const ERROR_COMPONENT = Object.freeze({
  USER_STORE: 'UserStore',
  ABR_BUS_SUBSCRIPTIONS: 'useAbrBusSubscriptions',
})

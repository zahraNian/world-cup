import mitt from 'mitt'

const emitter = mitt()

export const EventNames = {
  AUTH_INVALIDATED: 'AUTH_INVALIDATED',
}

export function emit(eventName, payload) {
  emitter.emit(eventName, payload)
}

export function subscribe(eventName, handler) {
  emitter.on(eventName, handler)
  return () => emitter.off(eventName, handler)
}

export function unsubscribe(eventName, handler) {
  emitter.off(eventName, handler)
}

export { emitter }
export default emitter

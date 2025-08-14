import { enableMapSet, produce } from "immer";

enableMapSet();

type Listener = () => void;

/**
 * A minimal external store for managing state outside of React’s internal state system.
 *
 * Designed for use with `useSyncExternalStore()`, this class bridges an imperative
 * state container with React’s rendering model.
 *
 * - `subscribe(listener)` registers a change listener, returning an unsubscribe function.
 * - `getSnapshot()` returns the current state, used by React to determine updates.
 * - `setState(updater)` uses Immer to update the state and notifies all listeners.
 *
 * When `setState` is called, all registered listeners are invoked.
 * React’s subscription via `useSyncExternalStore()` ensures `getSnapshot()`
 * is called after each change, triggering a re-render if needed.
 */
export class ExternalStore<T extends Record<string, unknown>> {
  protected _state: T;
  #listeners = new Set<Listener>();

  constructor(initialState: T) {
    this._state = initialState;
    this.setState = this.setState.bind(this);
    this.getSnapshot = this.getSnapshot.bind(this);
    this.subscribe = this.subscribe.bind(this);
  }

  getSnapshot(): T {
    return this._state;
  }

  setState(callback: (draft: T) => void) {
    this._state = produce(this._state, callback);
    this.#emitChange();
  }

  subscribe(listener: Listener): () => void {
    this.#listeners.add(listener);
    return () => {
      this.#listeners.delete(listener);
    };
  }

  #emitChange() {
    for (const listener of this.#listeners) {
      listener();
    }
  }
}

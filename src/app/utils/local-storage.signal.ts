import { assertInInjectionContext, inject, Injector, runInInjectionContext, signal, WritableSignal } from '@angular/core';

/**
 * local Storage Signal - Get and save a value from local storage
 * @param initialValue initial value
 * @param localStorageKey local storage key
 * @returns writable signal
 */
export function localStorageSignal<T>(initialValue: T, localStorageKey: string, injector?: Injector): WritableSignal<T> {
  if (!injector) {
    assertInInjectionContext(localStorageSignal);
  }
  injector ??= inject(Injector);
  return runInInjectionContext(injector, () => {
    const localStorage = globalThis.localStorage;
    if (!localStorage) {
      return signal(initialValue);
    }
    const storedValueRaw = localStorage.getItem(localStorageKey);
    if (storedValueRaw) {
      try {
        initialValue = JSON.parse(storedValueRaw);
      } catch (e) {
        throw new Error(`Failed to parse stored value for key: ${localStorageKey}`);
      }
    } else {
      localStorage.setItem(localStorageKey, JSON.stringify(initialValue));
    }

    const stateSignal = signal(initialValue);

    const originalSet = stateSignal.set;
    stateSignal.set = (value: T) => {
      originalSet(value);
      localStorage.setItem(localStorageKey, JSON.stringify(value));
    };

    const originalUpdate = stateSignal.update;
    stateSignal.update = (updater: (value: T) => T) => {
      originalUpdate(updater);
      const newValue = stateSignal();
      localStorage.setItem(localStorageKey, JSON.stringify(newValue));
    };

    return stateSignal;
  });
}

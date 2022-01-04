import { isNil } from 'lodash';
import { useEffect, useMemo, useState } from 'react';
import { BehaviorSubject, filter, groupBy, mergeAll, share } from 'rxjs';

type StoreEvent = Partial<Pick<StorageEvent, 'key' | 'oldValue' | 'newValue'>>;
const store$ = new BehaviorSubject<StoreEvent>({});

export function useLocalStore(
  key: string
): [string | null, (value: string) => void, StoreEvent] {
  const valuesFromLocalStorage = useMemo(() => {
    const isLocalStorage = !isNil(globalThis.localStorage);
    return isLocalStorage ? localStorage.getItem(key) : '';
  }, [key]);

  const [state$] = useState(store$);
  const [value, setValue] = useState<string | null>(valuesFromLocalStorage);
  const [event, setEvent] = useState<StoreEvent>({});

  const setLocalStoreValue = (newValue: string) => {
    const oldValue = localStorage.getItem(key);
    localStorage.setItem(key, newValue);
    state$.next({ key, oldValue, newValue });
  };

  useEffect(() => {
    const observable = state$.asObservable().pipe(
      groupBy((event) => event.key),
      share(),
      mergeAll(),
      filter((event) => !!event && event.key === key)
    );
    const subscription = observable.subscribe({
      next: (event) => {
        setEvent(event);
        setValue(event.newValue ?? null);
      },
    });
    return () => subscription.unsubscribe();
  }, [state$, key]);

  return [value, setLocalStoreValue, event];
}

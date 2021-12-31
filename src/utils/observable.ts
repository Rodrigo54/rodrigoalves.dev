import { useEffect, useState } from 'react';
import { Observable } from 'rxjs';

export function useObservable<T = unknown>(observable: Observable<T>) {
  const [value, setValue] = useState<T>();
  const [error, setError] = useState();
  const [completed, setCompleted] = useState(false);

  useEffect(() => {
    const subscription = observable.subscribe({
      next: (value) => setValue(value),
      error: (error) => setError(error),
      complete: () => setCompleted(true),
    });
    return () => subscription.unsubscribe();
  }, [observable]);

  return [value, error, completed];
}

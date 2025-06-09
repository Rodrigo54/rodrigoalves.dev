import {
  assertInInjectionContext,
  inject,
  Injector,
  runInInjectionContext,
  Signal,
} from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { ActivatedRoute } from '@angular/router';
import { map } from 'rxjs';

export function paramSignal<T>({
  defaultValue,
  paramKey,
  parse,
  injector,
}: {
  defaultValue: T;
  paramKey: string;
  parse?: (value: unknown) => T;
  injector?: Injector;
}): Signal<T> {
  if (!injector) {
    assertInInjectionContext(paramSignal);
  }
  injector ??= inject(Injector);
  return runInInjectionContext(injector, () => {
    const route = inject(ActivatedRoute);

    return toSignal(
      route.paramMap.pipe(
        map((params) => params.get(paramKey)),
        map((value) => (parse ? (value ? parse(value) : defaultValue) : value)),
        map((value) => (value === null ? defaultValue : (value as T)))
      ),
      { initialValue: defaultValue }
    );
  });
}

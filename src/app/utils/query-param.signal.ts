import {
  assertInInjectionContext,
  inject,
  Injector,
  runInInjectionContext,
  Signal,
} from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { ActivatedRoute } from '@angular/router';
import { map, tap } from 'rxjs';

export function queryParamSignal<T>({
  defaultValue,
  queryParamKey,
  parse,
  injector,
}: {
  defaultValue: T;
  queryParamKey: string;
  parse?: (value: unknown) => T;
  injector?: Injector;
}): Signal<T> {
  if (!injector) {
    assertInInjectionContext(queryParamSignal);
  }
  injector ??= inject(Injector);
  return runInInjectionContext(injector, () => {
    const route = inject(ActivatedRoute);

    return toSignal(
      route.queryParamMap.pipe(
        map((params) => params.get(queryParamKey)),
        map((value) => (parse && value ? parse(value) : defaultValue)),
        tap(console.log)
      ),
      { initialValue: defaultValue }
    );
  });
}

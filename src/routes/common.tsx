import {
  type MyInputIndexRouteObject,
  type MyInputNonIndexRouteObject,
  type MyOutputIndexRouteObject,
  type MyOutputNonIndexRouteObject,
  wrapRoute,
} from '#utils/routes';
import { Component as RootLayout } from '#views/RootLayout';


export type ExtendedProps = {
  title: string,
  visibility: 'is-authenticated' | 'is-not-authenticated' | 'anything',
  permissions?: (
      params: Record<string, number | string | undefined | null> | undefined | null,
  ) => boolean;
};

interface CustomWrapRoute {
  <T>(
      myRouteOptions: MyInputIndexRouteObject<T, ExtendedProps>
  ): MyOutputIndexRouteObject<ExtendedProps>
  <T>(
      myRouteOptions: MyInputNonIndexRouteObject<T, ExtendedProps>
  ): MyOutputNonIndexRouteObject<ExtendedProps>
}

export const customWrapRoute: CustomWrapRoute = wrapRoute;

// NOTE: We should not use layout or index routes in links

export const rootLayout = customWrapRoute({
  path: '/',
  errorElement: '/',
  component: {
      eagerLoad: true,
      render: RootLayout,
      props: {},
  },
  wrapperComponent: Auth,
  context: {
      title: 'Focus Flow',
      visibility: 'anything',
  },
});
import { customWrapRoute, rootLayout } from "./common";
import { unwrapRoute } from "#utils/routes";
import type { ExtendedProps } from "./common";

const home = customWrapRoute<ExtendedProps>({
  parent: rootLayout,
  path: "/",
  component: {
    render: () => import("../views/Home"),
    props: {},
  },
  context: {
    title: "Home",
    visibility: "anything",
  },
});

const about = customWrapRoute<ExtendedProps>({
  parent: rootLayout,
  path: "about",
  component: {
    render: () => import("../views/About"),
    props: {},
  },
  context: {
    title: "About",
    visibility: "anything",
  },
});

const services = customWrapRoute<ExtendedProps>({
  parent: rootLayout,
  path: "services",
  component: {
    render: () => import("../views/Services"),
    props: {},
  },
  context: {
    title: "Services",
    visibility: "anything",
  },
});

const contact = customWrapRoute<ExtendedProps>({
  parent: rootLayout,
  path: "contact",
  component: {
    render: () => import("../views/Contact"),
    props: {},
  },
  context: {
    title: "Contact",
    visibility: "anything",
  },
});

const wrappedRoutes = {
  rootLayout,
  home,
  about,
  services,
  contact,
};

export const unwrappedRoutes = unwrapRoute(Object.values(wrappedRoutes));
export default wrappedRoutes;

export type WrappedRoutes = typeof wrappedRoutes;

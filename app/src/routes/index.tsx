import { createBrowserRouter } from "react-router";
import type { RouteObject } from "react-router";

import RootLayout from "@/layouts/RootLayout";
import Homepage from "@/pages/root/Homepage";
import Ingame from "@/pages/Ingame";
import GameLayout from "@/layouts/GameLayout";
import Lobby from "@/pages/root/Lobby";
import UnderConstruction from "@/pages/UnderConstruction";

const rootRouteChildren: RouteObject[] = [
  {
    index: true,
    element: <Homepage />,
  },
  {
    path: "lobby",
    element: <Lobby />,
  },
  {
    path: "settings",
    element: <UnderConstruction />,
  },
];

const rootGameChildren: RouteObject[] = [
  {
    path: "",
    element: <Ingame />,
  },
];

const router = createBrowserRouter([
  {
    path: "/",
    element: <RootLayout />,
    children: rootRouteChildren,
  },
  {
    path: "/ingame",
    element: <GameLayout />,
    children: rootGameChildren,
  },
]);

export default router;

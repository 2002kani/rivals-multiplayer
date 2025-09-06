import { createBrowserRouter } from "react-router";
import type { RouteObject } from "react-router";

import RootLayout from "@/layouts/RootLayout";
import Homepage from "@/pages/root/Homepage";
import Ingame from "@/pages/Ingame";
import GameLayout from "@/layouts/GameLayout";
import Lobby from "@/pages/root/Lobby";

const rootRouteChildren: RouteObject[] = [
  {
    index: true,
    element: <Homepage />,
  },
  {
    path: "lobby",
    element: <Lobby />,
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
    path: "/game",
    element: <GameLayout />,
    children: rootGameChildren,
  },
]);

export default router;

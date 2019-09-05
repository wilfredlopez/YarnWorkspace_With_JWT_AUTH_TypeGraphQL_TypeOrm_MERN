// import Routes, * as nextRoutes from "next-routes"
const nextRoutes = require("next-routes")
// @ts-ignore
export const routes = nextRoutes() as any
export const Router = routes.Router
export const Link = routes.Link

//ADD HERE ROUTES THAT NEED PARAMETERS OR SO

routes.add("confirm", "/user/confirm/:token")
routes.add("change-password", "/user/change-password/:token")

import Login from '../pages/Authentication/Login';
import Dashboard from '../pages/Dashboard/Dashboard';
import AllUsers from '../pages/AllUsers/AllUsers';

const publicRoutes=[
    {path:'/login',component:Login},
    {path:'/*',component:Login},
]
const privateRoutes=[
    {path:'/dashboard',component:Dashboard},
    {path:'/Learner',component:AllUsers},
    {path:'/Instructor',component:AllUsers},
    {path:'/*',component:Dashboard}
]

export { privateRoutes, publicRoutes };
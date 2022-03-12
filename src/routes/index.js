import Chat from '../components/Chat';
import Login from '../components/Login';
import NotFound from '../components/NotFound';

export const routes = [
    {
        key: 'Chat',
        path: '/',
        exact: true,
        component: Chat,
    },
    {
        key: 'Login',
        path: '/login',
        exact: true,
        component: Login,
    },
    {
        key: 'NotFound',
        path: '*',
        exact: true,
        component: NotFound,
    },
];

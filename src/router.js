import { createRouter, createWebHashHistory } from 'vue-router';
import Dashboard from './pages/Dashboard.vue';

const routes = [
    {
        path: '/',
        name: 'dashboard',
        component: Dashboard,
    },
    {
        path: '/login',
        name: 'login',
        component: () => import('./pages/auth/Login.vue'),
    },
    {
        path: '/profile',
        name: 'profile',
        component: () => import('./pages/auth/Profile.vue'),
    },
    {
        path: '/users',
        name: 'users.index',
        component: () => import('./pages/users/Index.vue'),
    },
    {
        path: '/users/create',
        name: 'users.create',
        component: () => import('./pages/users/Create.vue'),
    },
    {
        path: '/users/:id/edit',
        name: 'users.edit',
        component: () => import('./pages/users/Edit.vue'),
    },
    {
        path: '/users/:id/show',
        name: 'users.show',
        component: () => import('./pages/users/Show.vue'),
    },

    {
        path: '/committees',
        name: 'committees.index',
        component: () => import('./pages/committees/Index.vue'),
    },
    {
        path: '/committees/create',
        name: 'committees.create',
        component: () => import('./pages/committees/Create.vue'),
    },
    {
        path: '/committees/:id/edit',
        name: 'committees.edit',
        component: () => import('./pages/committees/Edit.vue'),
    },
    {
        path: '/committees/:id/show',
        name: 'committees.show',
        component: () => import('./pages/committees/Show.vue'),
    },

    {
        path: '/event-locations',
        name: 'event-locations.index',
        component: () => import('./pages/event-locations/Index.vue'),
    },
    {
        path: '/event-locations/create',
        name: 'event-locations.create',
        component: () => import('./pages/event-locations/Create.vue'),
    },
    {
        path: '/event-locations/:id/edit',
        name: 'event-locations.edit',
        component: () => import('./pages/event-locations/Edit.vue'),
    },
    {
        path: '/event-locations/:id/show',
        name: 'event-locations.show',
        component: () => import('./pages/event-locations/Show.vue'),
    },

    {
        path: '/events',
        name: 'events.index',
        component: () => import('./pages/events/Index.vue'),
    },
    {
        path: '/events/create',
        name: 'events.create',
        component: () => import('./pages/events/Create.vue'),
    },
    {
        path: '/events/:id/edit',
        name: 'events.edit',
        component: () => import('./pages/events/Edit.vue'),
    },
    {
        path: '/events/:id/show',
        name: 'events.show',
        component: () => import('./pages/events/Show.vue'),
    },
    // {
    //     path: '/formlayout',
    //     name: 'formlayout',
    //     component: () => import('./components/FormLayoutDemo.vue'),
    // },
    // {
    //     path: '/input',
    //     name: 'input',
    //     component: () => import('./components/InputDemo.vue'),
    // },
    // {
    //     path: '/floatlabel',
    //     name: 'floatlabel',
    //     component: () => import('./components/FloatLabelDemo.vue'),
    // },
    // {
    //     path: '/invalidstate',
    //     name: 'invalidstate',
    //     component: () => import('./components/InvalidStateDemo.vue'),
    // },
    // {
    //     path: '/button',
    //     name: 'button',
    //     component: () => import('./components/ButtonDemo.vue'),
    // },
    // {
    //     path: '/table',
    //     name: 'table',
    //     component: () => import('./components/TableDemo.vue'),
    // },
    // {
    //     path: '/list',
    //     name: 'list',
    //     component: () => import('./components/ListDemo.vue'),
    // },
    // {
    //     path: '/tree',
    //     name: 'tree',
    //     component: () => import('./components/TreeDemo.vue'),
    // },
    // {
    //     path: '/panel',
    //     name: 'panel',
    //     component: () => import('./components/PanelsDemo.vue'),
    // },
    // {
    //     path: '/overlay',
    //     name: 'overlay',
    //     component: () => import('./components/OverlayDemo.vue'),
    // },
    // {
    //     path: '/menu',
    //     component: () => import('./components/MenuDemo.vue'),
    //     children: [
    //         {
    //             path: '',
    //             component: () => import('./components/menu/PersonalDemo.vue'),
    //         },
    //         {
    //             path: '/menu/seat',
    //             component: () => import('./components/menu/SeatDemo.vue'),
    //         },
    //         {
    //             path: '/menu/payment',
    //             component: () => import('./components/menu/PaymentDemo.vue'),
    //         },
    //         {
    //             path: '/menu/confirmation',
    //             component: () => import('./components/menu/ConfirmationDemo.vue'),
    //         },
    //     ],
    // },
    // {
    //     path: '/messages',
    //     name: 'messages',
    //     component: () => import('./components/MessagesDemo.vue'),
    // },
    // {
    //     path: '/file',
    //     name: 'file',
    //     component: () => import('./components/FileDemo.vue'),
    // },
    // {
    //     path: '/chart',
    //     name: 'chart',
    //     component: () => import('./components/ChartDemo.vue'),
    // },
    // {
    //     path: '/misc',
    //     name: 'misc',
    //     component: () => import('./components/MiscDemo.vue'),
    // },
    // {
    //     path: '/crud',
    //     name: 'crud',
    //     component: () => import('./pages/CrudDemo.vue'),
    // },
    // {
    //     path: '/timeline',
    //     name: 'timeline',
    //     component: () => import('./pages/TimelineDemo.vue'),
    // },
    // {
    //     path: '/empty',
    //     name: 'empty',
    //     component: () => import('./components/EmptyPage.vue'),
    // },
    // {
    //     path: '/documentation',
    //     name: 'documentation',
    //     component: () => import('./components/Documentation.vue'),
    // },
];

const router = createRouter({
    history: createWebHashHistory(),
    routes,
});

export default router;

// import all routes
import { createRouter, createWebHistory } from "vue-router";
import HelloWorld from '../components/HelloWorld.vue'


const router = createRouter({
    history: createWebHistory(),
    routes:[
        {
            path: "/",
            component: HelloWorld
        }
    ]
})

export default router

// const placeHolderPage = {
//   template: `
//     <router-view></router-view>
//   `
// }

// const detailsPage = {
//   template: `
//     <div class="md-card">
//       <h2>This is the details page </h2>
//       <md-menu md-size="small">
//       <md-button md-menu-trigger>Small</md-button>

//       <md-menu-content>
//         <md-menu-item>My Item 1</md-menu-item>
//         <md-menu-item>My Item 2</md-menu-item>
//         <md-menu-item>My Item 3</md-menu-item>
//       </md-menu-content>
//     </md-menu>

//     </div>
//   `
// }
// export default [
//   {
//     path: '/',
//     component: Home,
//     meta: {
//       breadcrumb: 'Home Page'
//     }
//   },
//   {
//     path: '/live',
//     meta: {breadcrumb: 'Live'},
//     component: placeHolderPage,
//     children: [
//       {
//         path: 'press',
//         meta: {
//           breadcrumb: 'Press',
//           submenu: 'Facilities'
//         },
//         component: placeHolderPage,
//         children: [
//           {
//             alias: '/presslive',
//             path: 'overview',
//             meta: {
//               breadcrumb: 'Overview',
//               menu: 'Facilities'
//             },
//             component: Dynamic
//           },
//           {
//             path: '271',
//             meta: {
//               breadcrumb: '2700-1',
//               menu: 'Facilities'
//             },
//             component: detailsPage
//           },
//           {
//             path: '272',
//             meta: {
//               breadcrumb: '2700-2',
//               menu: 'Facilities'
//             },
//             component: detailsPage
//           },
//           {
//             path: '273',
//             meta: {
//               breadcrumb: '2700-3',
//               menu: 'Facilities'
//             },
//             component: detailsPage
//           },
//           {
//             path: '321',
//             meta: {
//               breadcrumb: '3200-1',
//               menu: 'Facilities'
//             },
//             component: detailsPage
//           },
//           {
//             path: '322',
//             meta: {
//               breadcrumb: '3200-2',
//               menu: 'Facilities'
//             },
//             component: detailsPage
//           }
//         ]
//       },

//       {
//         path: 'body',
//         meta: {
//           breadcrumb: 'Body'
//         },
//         component: placeHolderPage,
//         children: [
//           {
//             path: '1',
//             meta: {
//               breadcrumb: 'Line 1',
//               submenu: 'Facilities'
//             },
//             component: placeHolderPage,
//             children: [
//               {
//                 alias: '/bodylive1',
//                 path: 'overview',
//                 meta: {
//                   breadcrumb: 'Overview',
//                   menu: 'Facilities'
//                 },
//                 component: Dynamic
//               },
//               {
//                 path: 'dc',
//                 meta: {
//                   breadcrumb: 'Dash Comps',
//                   menu: 'Facilities'
//                 },
//                 component: detailsPage
//               },
//               {
//                 path: 'ec',
//                 meta: {
//                   breadcrumb: 'Engine Comps',
//                   menu: 'Facilities'
//                 },
//                 component: detailsPage
//               },
//               {
//                 path: 'fm',
//                 meta: {
//                   breadcrumb: 'Floor Main',
//                   menu: 'Facilities'
//                 },
//                 component: detailsPage
//               },
//               {
//                 path: 'fmr',
//                 meta: {
//                   breadcrumb: 'Floor Respot',
//                   menu: 'Facilities'
//                 },
//                 component: detailsPage
//               }
//             ]
//           },
//           {
//             alias: '/bodylive2',
//             path: '2',
//             meta: {
//               breadcrumb: 'Line 2',
//               submenu: 'Facilities'
//             },
//             component: placeHolderPage,
//             children: [
//               {
//                 path: 'overview',
//                 meta: {
//                   breadcrumb: 'Overview',
//                   menu: 'Facilities'
//                 },
//                 component: Dynamic
//               },
//               {
//                 path: 'fsml',
//                 meta: {
//                   breadcrumb: 'FSM Left',
//                   menu: 'Facilities'
//                 },
//                 component: detailsPage
//               },
//               {
//                 path: 'fsmr',
//                 meta: {
//                   breadcrumb: 'FSM Right',
//                   menu: 'Facilities'
//                 },
//                 component: detailsPage
//               },
//               {
//                 path: 'ec',
//                 meta: {
//                   breadcrumb: 'Engine Comps',
//                   menu: 'Facilities'
//                 },
//                 component: detailsPage
//               },
//               {
//                 path: 'fm',
//                 meta: {
//                   breadcrumb: 'Floor Main',
//                   menu: 'Facilities'
//                 },
//                 component: detailsPage
//               },
//               {
//                 path: 'fmr',
//                 meta: {
//                   breadcrumb: 'Floor Respot',
//                   menu: 'Facilities'
//                 },
//                 component: detailsPage
//               }
//             ]
//           }
//         ]
//       },
//       {
//         path: 'paint',
//         meta: {
//           breadcrumb: 'Paint'
//         },
//         component: placeHolderPage,
//         children: [
//           {
//             path: '1',
//             meta: {
//               breadcrumb: 'Line 1',
//               submenu: 'Facilities'
//             },
//             component: placeHolderPage,
//             children: [
//               {
//                 alias: '/paintlive1',
//                 path: 'overview',
//                 meta: {
//                   breadcrumb: 'Overview',
//                   menu: 'Facilities'
//                 },
//                 component: Dynamic
//               }
//             ]
//           },
//           {
//             path: '2',
//             meta: {
//               breadcrumb: 'Line 2',
//               submenu: 'Facilities'
//             },
//             component: placeHolderPage,
//             children: [
//               {
//                 alias: '/paintlive2',
//                 path: 'overview',
//                 meta: {
//                   breadcrumb: 'Overview',
//                   menu: 'Facilities'
//                 },
//                 component: Dynamic
//               }
//             ]
//           }
//         ]
//       }
//     ]
//   }
// ]

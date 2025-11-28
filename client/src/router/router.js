import { createRouter, createWebHistory } from "vue-router";
import WordsPage from "../pages/CRUD/Words.vue";
import EditPage from "../pages/CRUD/Edit.vue"
import NewPage from "../pages/CRUD/New.vue"
import TestPage from "../pages/Test.vue"
import ShowPage from "../pages/CRUD/Show.vue"

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      redirect: '/words'
    },
    {
      path: "/words",
      name: "words",
      component: WordsPage,
    },
    {
      path:"/words/show/:id",
      name:"show",
      component:ShowPage
    },
    {
      path: '/words/edit/:id',
      name: 'edit',
      component: EditPage
    },
    {
      path: '/words/new',
      name: "new",
      component: NewPage
    },
    {
      path: '/test',
      name:"test",
      component: TestPage
    }
  ],
});

router.afterEach(async (to, from, failure) => {
  if (!failure) setTimeout(() => window.HSStaticMethods.autoInit(), 100);
});

export default router;

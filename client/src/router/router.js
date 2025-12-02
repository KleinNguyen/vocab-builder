import { createRouter, createWebHistory } from "vue-router";
import WordsPage from "../pages/CRUD/Words.vue";
import EditPage from "../pages/CRUD/Edit.vue"
import NewPage from "../pages/CRUD/New.vue"
import ShowPage from "../pages/CRUD/Show.vue"
import TestPage from "../pages/Testing/Test.vue"
import newTestPage from "../pages/Testing/newTest.vue";
import TypingTestPage from "../pages/Testing/TypingTest.vue";
import FlashCardPage from "../pages/Testing/FlashCard.vue";

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
      path: '/tests',
      name:"test",
      component: TestPage
    },
    {
      path:'/tests/new',
      name:"new test",
      component: newTestPage
    },
    {
      path:'/typing/:id',
      name:"typing",
      component: TypingTestPage
    },
    {
      path:"/flashcard/:id",
      name:"flashcard",
      component: FlashCardPage
    }
  ],
});

router.afterEach(async (to, from, failure) => {
  if (!failure) setTimeout(() => window.HSStaticMethods.autoInit(), 100);
});

export default router;

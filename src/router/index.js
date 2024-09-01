import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import ProfileView from '../views/ProfileView.vue'
import ArticleView from "@/views/ArticleView.vue";
import ShowArticleView from "@/views/ShowArticleView.vue";
import GaleriView from "@/views/GaleriView.vue";
import ShowPostView from "@/views/ShowPostView.vue";

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'Home',
      component: HomeView,
      meta: {
        enterClass: 'animate__animated animate__fadeInLeft',
        leaveClass: 'animate__animated animate__fadeOutRight'
      },
    },
    {
      path: '/profile',
      name: 'Profile',
      component: ProfileView,
      meta: {
        enterClass: 'animate__animated animate__fadeInLeft',
        leaveClass: 'animate__animated animate__fadeOutRight'
      },
    },
    {
      path: '/read',
      name: 'Article',
      component: ArticleView,
      meta: {
        enterClass: 'animate__animated animate__fadeInLeft',
        leaveClass: 'animate__animated animate__fadeOutRight'
      },
    },
    {
      path: '/read/slug',
      name: 'ShowArticle',
      component: ShowArticleView,
      meta: {
        enterClass: 'animate__animated animate__fadeInLeft',
        leaveClass: 'animate__animated animate__fadeOutRight'
      },
    },
    {
      path: '/galeri',
      name: 'Galeri',
      component: GaleriView,
      meta: {
        enterClass: 'animate__animated animate__fadeInLeft',
        leaveClass: 'animate__animated animate__fadeOutRight'
      },
    },
    {
      path: '/galeri/slug',
      name: 'ShowGaleri',
      component: ShowPostView,
      meta: {
        enterClass: 'animate__animated animate__fadeInLeft',
        leaveClass: 'animate__animated animate__fadeOutRight'
      },
    },
  ],
  scrollBehavior(to, from, savedPosition) {
    if (to.hash) {
      return {
        el: to.hash,
        behavior: 'smooth',
      }
    } else if (savedPosition) {
      return savedPosition
    } else {
      return { top: 0 }
    }
  },
});

export default router

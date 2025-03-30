import { createRouter, createWebHistory } from 'vue-router';

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: () => import('../views/user/Home.vue')
    },
    {
      path: '/signInUser',
      name: 'signInUser',
      component: () => import('../views/user/SignIn.vue')
    },
    {
      path: '/signUpUser',
      name: 'signUpUser',
      component: () => import('../views/user/SignUp.vue')
    },
    {
      path: '/contact',
      name: 'contact',
      component: () => import('../views/user/Contact.vue')
    },
    {
      path: '/courses',
      name: 'courses',
      component: () => import('../views/user/Courses.vue')
    },
    {
      path: '/exam/:id',
      name: 'exam',
      component: () => import('../views/user/Exam.vue')
    },
    {
      path: '/history',
      name: 'history',
      component: () => import('../views/user/History.vue')
    },
    {
      path: '/profile',
      name: 'profile',
      component: () => import('../views/user/Profile.vue')
    },
    {
      path: '/subject/:id',
      name: 'subject',
      component: () => import('../views/user/Subject.vue')
    },
    {
      path: '/test/:id',
      name: 'test',
      component: () => import('../views/user/Test.vue')
    },
    {
      path: '/admin',
      redirect: "/admin/top",
      name: 'admin',
      component: () => import('../views/admin/Admin.vue'),
      children: [
        {
          path: "coursesManager",
          name: "coursesManager",
          component: () => import('../views/admin/CoursesMananger.vue')
        },
        {
          path: 'examManager/:id',
          name: 'examManager',
          component: () => import('../views/admin/ExamMananger.vue')
        },
        {
          path: 'questionManager/:id',
          name: 'questionManager',
          component: () => import('../views/admin/QuestionMananger.vue')
        },
        {
          path: 'subjectManager/:id',
          name: 'subjectManager',
          component: () => import('../views/admin/SubjectMananger.vue')
        },
        {
          path: 'userManager',
          name: 'userManager',
          component: () => import('../views/admin/UserMananger.vue')
        },
        {
          path: 'top',
          name: 'top',
          component: () => import('../views/admin/Top.vue')
        },
        {
          path: '/admin/approved',
          name: 'approved',
          component: () => import('@/views/admin/Approved.vue')
        }
      ]
    },
    {
      path: "/:pathMatch(.*)*",
      name: "notFound",
      component: () => import("../components/NotFound.vue"),
    }
  ]
});

export default router;

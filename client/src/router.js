import Vue from 'vue';
import VueRouter from 'vue-router';
import WelcomePage from './pages/WelcomePage.vue';
import SignUpPage from './pages/SignUpPage.vue';
import ProfilePage from './pages/ProfilePage.vue';
import AddNewBoard from './components/addoptions/AddNewBoard.vue';
import EditBoardData from './components/profilePageComponents/EditBoardData.vue';
import TasksListContainer from './components/tasksComponent/TasksListContainer.vue';
import AddTask from './components/tasksComponent/AddTask.vue';
import SideTaskContainer from './components/tasksComponent/SideTasksMangerComponent/SideTaskContainer.vue';
import AddUserToTaskScreen from './components/tasksComponent/AddUserToTaskScreen.vue';
import DatePicker from './components/tasksComponent/DatePicker.vue';
import AddUserToBoardScreen from './components/profilePageComponents/AddUserToBoardScreen.vue';


Vue.use(VueRouter);

const routes = [
  {
    path:'/',
    name:'Welcome',
    component:WelcomePage
  },
  {
    path:'/signUp',
    name:'signUp',
    component:SignUpPage
  },
  {
    path:'/myProfile',
    name:'myProfile',
    component:ProfilePage,
    children:[
      {
        path:'/myProfile/AddNewBoard',
        name:'AddNewBoard',
        component:AddNewBoard
      },
      {
        path:'/myProfile/EditBoardData/:id',
        name:'EditBoardData',
        component:EditBoardData
      },
      {        
      path:'/myProfile/Board/:id/AssignUser',
      name:'AssignUSer',
      component:AddUserToBoardScreen
      },
      {
      path:'/myProfile/Board/:id',
      name:'TasksList',
      component:TasksListContainer,
        children:[
          {
            path:'/myProfile/Board/:id/AddTask',
            name:'AddTask',
            component:AddTask
          },
          {
            path:'/myProfile/Board/:id/:taskId',
            name:'TaskData',
            component:SideTaskContainer
          },
          {
            path:'/myProfile/Board/:id/:taskId/AssignUser',
            name:'AssignUser',
            component:AddUserToTaskScreen
          },
          {
            path:'/myProfile/Board/:id/:taskId/DueDate',
            name:'DueDate',
            component:DatePicker
          }
        ]
      }
    ]
  },
  {
    path:'/NewBoard',
    component:AddNewBoard
  }
];


const router = new VueRouter({
  mode:"history",
  base: process.env.BASE_URL,
  routes
});

export default router;
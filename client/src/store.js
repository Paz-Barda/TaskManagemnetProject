import Vue from 'vue';
import Vuex from 'vuex';
import axios from 'axios';
import router from  './router'

Vue.use(Vuex);

export default new Vuex.Store({
  state:{
    user: undefined,
    boards: undefined,
    boardData:undefined,
    tasksList: undefined,
    task:undefined
  },
  mutations:{
    //Set the data for the user state after the login process and store the user data
    // in the local storage (name, email, token (that will be used for the auth process)).
    LOGIN_USER(state, data){
      state.user = data;
      window.localStorage.setItem('user', JSON.stringify(data));
    },

    //Log-out user, clear the local storage from the user data.
    LOGOUT_USER(){
      // state.user=null;
      console.log('Clear storage');
      window.localStorage.clear();
    },

    //Update the list of the boards (projects of the user).
    LIST_OF_BOARDS(state,data){
      state.boards = data;
    },

    //Stores the data of a single selected board (project). 
    SINGLE_BOARD_DATA(state,data){
      state.boardData = data.board[0];
    },

    //When the user selecting a single board then set all the linked tasks to this board. 
    SET_TASK_LIST(state, data){
      state.tasksList = data;
    },

    //Setting the state of a single task out of the board will be used to show task data.
    SET_TASK_DATA(state,data){
      state.task = data;
    }
  },
  actions:{
    
    //Call loginUser from loginCarousel in order to set the data of the looged in user in the storage.
    //If the login process passed then we will push the user to the main screen.
    loginUser({commit}, data){
      commit('LOGIN_USER', data);
      router.push('/myProfile');
    },


    check_loged_user({commit}){
      //If in the local storage we have a user data then chack if user is authnticated and JWT is valid
      //if in local storage no data then clear redirect to the welcome page - means that the session of the token expired.
      const user = localStorage.getItem('user')
      

      if(user){
        axios.post('http://localhost:3000/users/checkLogedUser',{user:user},
        {
          headers:{
            'user':user
          }
        })
        .then(()=>{
          commit('LOGIN_USER',JSON.parse(user))  
        })
        .catch(()=>{
          //if we are getting that the JWT is no longer valid then call LOGOUT_USER mutations
          commit('LOGOUT_USER');
        })
      }else{
        commit('LOGOUT_USER');
      }
      
     
    },

    //Creating a new board will be calling to the /tasksBoard/newTaskBoard endpoint 
    add_new_board({commit},data){
      console.log(commit);

      //Get the user data from the local storage and pass in the header as part of the checkAuth process. 
      const user = localStorage.getItem('user');
      console.log(data);
      axios.post('http://localhost:3000/tasksBoard/newTaskBoard',{
        "user":data.user,
        "boardName":data.boardName,
        "userId":data.userId,
        "userName":data.userName
      },
      {
        headers:{
          'user': user
        }
      })
      .then(res=>{
        console.log(res);
        //If the new board was created then return back to the profile.
        //And call to get_list_of_boards action toghter with user and user id data
        // in order to get all the updated boards list of the user and update the state of boards.
        this.dispatch('get_list_of_boards',{"user":data.user, "userId":data.userId});
        router.push('/myProfile')
      })
      .catch(err=>{
        console.log(err);
        alert('Wasnt able to create new board, Try again later')
      })
    },


    //Getting boards list of the auth user using the tasksBoard/gettAllMyProjects endpoint
    get_list_of_boards({commit}, data){
    
      //Get the user data from the local storage and pass in the header as part of the checkAuth process. 
      const user = localStorage.getItem('user');
      axios.post('http://localhost:3000/tasksBoard/gettAllMyProjects',
      {
        "user":data.user,
        "userId":data.userId
      },
      {
        headers:{
          'user': user
        }
      })
      .then(res=>{
        // this.myBoards = res.data.projects
        //if we passed rthe call then call LIST_OF_BOARDS and update the state.
        commit('LIST_OF_BOARDS', res.data.projects)
      })
      .catch(err=>{
        console.log(err);
      })
    },

    //Delete board from the data using the tasksBoard/${data.board_id} endpoint when the board id is passed from the client
    deleteBoard({commit}, data){
      console.log(commit);
      //Get the user data from the local storage and pass in the header as part of the checkAuth process. 
      const user = localStorage.getItem('user')
      axios.delete(`http://localhost:3000/tasksBoard/${data.board_id}`,
      {
        headers:{
        'user': user
        }
      })
      .then(res=>{
        console.log(res.config.data);
        //Call get_list_of_boards action in order to update the list of the updated boards in the state.
        this.dispatch('get_list_of_boards',{"user":data.user, "userId":data.user.id});
        router.push('/myProfile')
      })
      .catch(err=>{
        console.log(err);
      })
    },
    

    //Get single board data by calling the  tasksBoard/getBoardInfo/${data} endpoint and call action to get all the tasks 
    //Used when the user selecting single record of a board to see.
    getSingleBoardData({commit}, data){
      //data stores the board id
      //Get the user data from the local storage and pass in the header as part of the checkAuth process. 
      const user = localStorage.getItem('user')
      axios.get(`http://localhost:3000/tasksBoard/getBoardInfo/${data}`,{
        headers:{
          'user': user
        }
      })
      .then((res)=>{
        //Update the state using the mutations SINGLE_BOARD_DATA
        commit('SINGLE_BOARD_DATA', res.data);
        //call getAllTasksForBoard action and padd the selected board id. 
        this.dispatch('getAllTasksForBoard', res.data.board[0]._id)
      })
      .catch((error)=>{
        console.log(error);
      })
    },


    //Add a new task using the task/newTask endpoint 
    addNewTask({commit},data){
      //Get the user data from the local storage and pass in the header as part of the checkAuth process. 
      const user = localStorage.getItem('user');
      console.log(commit);
      const userData= JSON.parse(user);
      

      //Add new task to the board
      axios.post('http://localhost:3000/task/newTask',{
        "taskName": data.taskName,
        "userId": userData.id,
        "userName":userData.name,
        "boardId":data.boardId,},
      {
        headers:{
          'user': user
        }
      })
      .then(res=>{
        console.log(res);

        //If the task was added to the data base then assgin the new task to the board
          axios.patch(`http://localhost:3000/tasksBoard/${res.data.createdTask.boardId}`,{
            "task": res.data.createdTask.taskId
          },
          {
            headers:{
              'user': user
            }
          })
          .then(res=>{
            console.log(res);
          })
          .catch(err=>{
            console.log(err);
          })

        //Call getSingleBoardData in order to update the boardData in the UI 
        this.dispatch('getSingleBoardData', res.data.createdTask.boardId);
        router.push(`/myProfile/Board/${res.data.createdTask.boardId}`);
      })
      .catch(err=>{
        console.log(err);
      })
    },


    //Getting all the tasks of  single board by calling /task/getAlltasksForBoard/${boardId} endpoint and then store then in the tasksList state using the SET_TASK_LIST mutations.
    //The data value stores the board id. 
    getAllTasksForBoard({commit},data){
      console.log(commit);
      const user = localStorage.getItem('user');
      const boardId = data;
      
      axios.get(`http://localhost:3000/task/getAlltasksForBoard/${boardId}`,{
        headers:{
          'user': user
        }
      })
      .then(res=>{
        //Call SET_TASK_LIST in order to set tasksList state with the updated data.
        commit('SET_TASK_LIST', res.data.tasks)
      })
      .catch(err=>{
        console.log(err);
      })
    },

    //Getting a single task data using the /task/${taskId} endpoint then commit  SET_TASK_DATA mutations in order to set the state of the single task. 
    getTaskDetails({commit},data){
      console.log(commit);
      const user = localStorage.getItem('user');
      const taskId = data

      axios.get(`http://localhost:3000/task/${taskId}`,{
        headers:{
        'user': user
      }})
      .then(res=>{
        commit('SET_TASK_DATA', res.data)
      })
      .catch(err=>{
        console.log(err);
      })
    },

    addUserToTask({commit},data){
      console.log(commit);
      const user = localStorage.getItem('user');
      const email = data.email;
      const task_id = data.taskId;
      console.log(email + ' ' + task_id);
      axios.patch(`http://localhost:3000/task/${task_id}/${email}`,{},
      {
        headers:{
          'user':user
        }
      })
      .then(res=>{
        console.log(res.data);
        alert(res.data.message);
      })
      .catch(error=>{
        console.log(error.message);
        alert(error.message);
      })
    },
  
    addDueDateToTask({commit},data){
      console.log(commit);
      const user = localStorage.getItem('user');
      const dueDate = data.date;
      const task_id = data.taskId;
      console.log(dueDate);
      axios.patch(`http://localhost:3000/task/dueDate/${task_id}/${dueDate}`,{},
      {
        headers:{
          'user':user
        }
      })
      .then(res=>{
        console.log(res.data);
        alert(res.data.message);
      })
      .catch(error=>{
        console.log(error);
      })
    },

  addUserToBoard({commit},data){
    console.log(commit);
    const user = localStorage.getItem('user');
    const email = data.email;
    const board_id = data.boardId;
    console.log(email + ' ' + board_id);
    axios.patch(`http://localhost:3000/tasksBoard/${board_id}/${email}`,{},
  {
      headers:{
      'user':user
    }
  })
   .then(res=>{
      console.log(res.data);
      alert(res.data.message);
    })
    .catch(error=>{
      console.log(error.message);
      alert(error.message);
    })
  },
},
  getters:{
    getUser(state){
      console.log(state.user);
      return state.user;
    },
    getBoardsList(state){
      console.log(state.boards);
      return state.boards;
    },
    getBoardData(state){
      return state.boardData;
    },
    gettasksList(state){
      return state.tasksList;
    },
    getTaskData(state){
      return state.task;
    }
  }
});
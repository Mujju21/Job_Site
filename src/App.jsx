import {Route,createRoutesFromElements,RouterProvider,createHashRouter} from 'react-router-dom';
import MainLayout from './layouts/MainLayout'
import HomePage from './Pages/HomePage';
import JobPages from './Pages/JobPages';
import NotFoundPage from './Pages/NotFoundPage';
import JobPage,{JobLoader} from './Pages/JobPage';
import AddJobPage from './Pages/AddJobPage';
import EditJobPage from './Pages/EditJobPage';
import Spinner from './components/Spinner';

const API = import.meta.env.VITE_API_URL;

const App = () => {

  //Add job
  const addJob = async(newJob) => {
  const res = await fetch(`${API}/jobs`,{
    method:'POST',
    headers:{
      'Content-Type': 'application/json',
    },
    body:JSON.stringify(newJob),
  })
  return;
  };

//Delete job
const deleteJob = async (id) => {
  const res = await fetch(`${API}/jobs/${id}`,{
    method:'DELETE',
  })
  return;
};

//Update job
const updateJob = async (job) => {
  const res = await fetch(`${API}/jobs/${job.id}`,{
    method:'PUT',
    headers: {
      'Content-Type':'application/json',
    },
    body: JSON.stringify(job),
  })
  return;
};

const router = createHashRouter(
  createRoutesFromElements(

      <Route path='/' element={<MainLayout/>}>
        <Route index element={<HomePage />}/>

        <Route path='/jobs' 
          element={<JobPages/>}
        />

        <Route path='/add-job' 
          element={<AddJobPage 
          addJobSubmit={addJob}/>} 
        />

        <Route path='/jobs/:id' 
          element={<JobPage
          deleteJob={deleteJob}/>} 
          loader={JobLoader}
          hydrateFallbackElement={<Spinner/>}
        />

        <Route path='/job-edit/:id' 
          element={<EditJobPage
          UpdateJobSubmit={updateJob}/>} 
          loader={JobLoader}
          hydrateFallbackElement={<Spinner/>}
        />

        <Route path='*' 
         element={<NotFoundPage/>}
        />
      </Route> 

  )
  );
  return (
  <RouterProvider router={router}
   hydrateFallbackElement={<Spinner/>}
  />
)
};

export default App;

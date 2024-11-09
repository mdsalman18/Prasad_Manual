import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from './components/Login'
// import Service from './components/Service'
import Navbar from './components/Navbar'
import Attendence from './Attendence/Attendence';
import Signup from './components/Signup';
// import Home from './Attendence/Home';
import Admission from './components/Admission';
import 'react-toastify/dist/ReactToastify.css';
import { ToastContainer } from 'react-toastify';
// import ViewDetail from "./Pages/Dean/ViewDetail";
import ViewAttendance from "./Dean/ViewAttendence";
import AddNewBatch from "./Dean/AddNewBatch";
import ImportCSV from "./Dean/ImportCSV";
import Monthly from "./Dean/Report/Monthly";
import ServiceAdmin from "./Dean/ServiceAdmin";
import AddNewBatch2 from "./Admin/addnewBatch";
import AddNewStudent from "./Admin/addnewstudent";
import AdminPortal from "./Admin/adminportal";
import NewEmp from "./Admin/newemp";
import NewSub from "./Admin/newsub";
import NewCSV from "./Admin/newCSV";
import Choi from './Attendence/choice';
import Fatten from "./facialui/Attendance";
import Facereg from "./facialui/facereg";
import Presh from "./facialui/PresenceSheet";
// import SidebarAdmin from "./Admin/SidebarAdmin";

function App() {
  
  return (
    <div className='contain bt-0'>
    <div className="cont h-screen w-full mt-0">
      
     <BrowserRouter>
      <Routes>
        <Route path='/' element={<Navbar/>}>
          {/* <Route index element={<Home/>}/> */}
          <Route index element={<Login/>} />
          <Route path="signup" element={<Signup/>} />
          <Route path='attendence' element={<Attendence/>}/>
          <Route path='admission' element={<Admission/>}/>
          <Route path='attchoi' element={<Choi/>}/>

          
          <Route path='service' element={<ServiceAdmin/>}>
            <Route path='monthly' element={<Monthly/>}/>
            <Route path='viewattendance' element={<ViewAttendance/>}/>
            <Route path='addbatch' element={<AddNewBatch/>}/> 
            <Route path='importcsv' element={<ImportCSV/>}/>
          </Route> 

          {/* <Route path='adminportal' element={<SidebarAdmin/>}> */}
            <Route path='adminportal' element={<AdminPortal/>}/>
            <Route path='addnew' element={<AddNewBatch2/>}/>
            <Route path='newstu' element={<AddNewStudent/>}/>
            <Route path='newemp' element={<NewEmp/>}/>
            <Route path='newsub' element={<NewSub/>}/>
            <Route path='newcsv' element={<NewCSV/>}/>
          {/* </Route> */}

          <Route path='fatten' element={<Fatten/>}/>
          <Route path='face' element={<Facereg/>}/>
          <Route path='sheet' element={<Presh/>}/>

        </Route>
          
      </Routes>
        <ToastContainer />
    </BrowserRouter>

    </div>

    </div>
  )
}

export default App

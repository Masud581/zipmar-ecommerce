
import { Outlet } from 'react-router-dom'
import './App.css'
import Header from './components/Header'
import Footer from './components/Footer'
import toast, { Toaster } from 'react-hot-toast';
import { useEffect } from 'react';
import FetchUserDetails from './utils/FetchUserDetails';
import { setUserDetails } from './store/userSlice';
import { useDispatch } from 'react-redux';
import { setAllCategory, setAllSubCategory} from './store/productSlice';
import Axios from './utils/Axios';
import SummaryApi from './apis/SummaryApi';

function App() {
  const dispatch = useDispatch()

  const fetchUser = async () => {
    const userData  = await FetchUserDetails()    
    dispatch(setUserDetails(userData.data))   

  }
  const fetchCategory = async () => {
    try {
       
        const response = await Axios({
            ...SummaryApi.getCategory,
        });
        const { data: responseData } = response;

        if (responseData.success) {
            dispatch(setAllCategory(responseData.data))
            // setCategoryData(responseData.data);
        }
    } catch (error) {
        AxiosToastError(error);
    } finally {
       
    }
};


const fetchSubCategory = async () => {
  try {
     
      const response = await Axios({
          ...SummaryApi.getSubCategory,
      });
      const { data: responseData } = response;

      if (responseData.success) {
          dispatch(setAllSubCategory(responseData.data))
          // setCategoryData(responseData.data);
      }
  } catch (error) {
      AxiosToastError(error);
  } finally {
     
  }
};
  useEffect(() => {
    fetchUser()
    fetchCategory()
    fetchSubCategory()
  },[])

   
  


  return (
   <>
    <Header/>
    <main className='min-h-[78vh]'>
      <Outlet/>
    </main>
    <Footer/>
    <Toaster/>
   </>
   
  )
}

export default App

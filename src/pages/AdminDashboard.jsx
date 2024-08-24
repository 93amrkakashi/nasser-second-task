import React, { useEffect } from 'react'
import BooksPage from "../components/BooksPage"
import { useSelector } from 'react-redux';
import {Helmet} from "react-helmet-async"

const AdminDashboard = () => {
  const { user} = useSelector((state) => state.auth);


  
  return (
<>
<Helmet>
<title>
لوحة التحكم
</title>

</Helmet>
    <BooksPage />
</>

  )
}

export default AdminDashboard

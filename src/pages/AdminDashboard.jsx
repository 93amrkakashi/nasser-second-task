import React, { useEffect } from 'react'
import BooksPage from "../components/BooksPage"
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';

const AdminDashboard = () => {
  const { user} = useSelector((state) => state.auth);
  const navigation = useNavigate();

  
  return (
    <BooksPage />
  )
}

export default AdminDashboard

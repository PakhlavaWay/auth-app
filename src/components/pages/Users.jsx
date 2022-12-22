import {React, useEffect, useState} from "react";
import { useDispatch, useSelector } from "react-redux";
import { trackURL } from "../trackURL";
import axios from "../../api/axios";

const Users = () => {
  const [users, setUsers] = useState([]);
  const isAuthorized = useSelector(state => state.isAuthorized);
  const id = useSelector((state) => state.id);
  const dispatch = useDispatch();
  const currentURL = window.location.href;

  const getUsersAll = async() => {
    const token = localStorage.getItem('token');
    const result = await axios.get('/users', { 
      headers: {
        'Authorization': `Bearer ${token}`
      }
    })
    setUsers(result.data)
    console.log(result)
    return result.data;
  }

  const getAUser = async() => {
    const token = localStorage.getItem('token');
    const result = await axios.get(`/users/${id}`, {
      headers: {
        'Authorization': `Bearer ${token}`
      }
    })
    console.log(result);
    return result;
  }

  useEffect(() => {
    trackURL(currentURL, dispatch, isAuthorized);
    getUsersAll();
  }, [currentURL]);

  
  return (
    <div style={{width: '90%', margin: '0 auto'}}>
      {users.map((user) => {
        return (<div style={{ margin: '10px 0', display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)' }}>
          <p>{user._id}</p>
          <p>{user.age}</p>
          <p>{user.email}</p>
          <p>{user.name}</p>
        </div>)
      })}
      <button onClick={getAUser}>Get a user</button>
    </div>
  );
};

export default Users;

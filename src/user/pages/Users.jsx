import React from 'react';
import UsersList from '../components/UsersList';

const Users = props => {
  const USERS = [
    { id: 'u1', 
      name: 'userOne', 
      image: 'https://p7.hiclipart.com/preview/355/848/997/computer-icons-user-profile-google-account-photos-icon-account.jpg',
      placeCount: 3
    }
  ]
  return (
    <UsersList items={USERS} />
  )
}

export default Users;

import React from 'react';
import './UsersList.css';
import UserItem from './UserItem';

const UsersList = props => {
  if(props.items.lenght === 0) {
    return (
      <div className="center">
        <h2>No users found.</h2>
      </div>
    );
  }
  return (
    <ul>
      {props.items.map(user => (
        <UserItem 
          id={user.id}
          key={user.id} 
          name={user.name}
          image={user.image}
          placeCount={user.places}
        />
      ))}
    </ul>
  );
}

export default UsersList;

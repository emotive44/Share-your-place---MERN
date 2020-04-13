import React from 'react';
import './UsersList.css';
import UserItem from './UserItem';
import Card from '../../shared/UIElements/Card';

const UsersList = props => {
  if(props.items.lenght === 0) {
    return (
      <div className="center">
        <Card>
          <h2>No users found.</h2>
        </Card>
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

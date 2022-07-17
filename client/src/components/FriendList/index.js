/*
props to the FriendList component: 
1. username whose friends these belong to
2. friend count
3. actual array of friends
*/

import React from 'react';
import {Link} from 'react-router-dom';

const FriendList = ({friendCount, username, friends}) =>{
    if(!friends || !friends.length) {
        return <p className="bg-dark text-light p-3">{username}, make some friends!</p>;
    }

    return (
        <div>
            <h5>
                {username}'s {friendCount} {friendCount===1? 'friend':'friends'}
            </h5>
            {friends.map(friend =>(
                <button className="btn w-100 display-block mb-2" key={friend._id}>
                    <Link to={`/profile/${friend.username}`}>{friend.username}</Link>
                </button>
            ))}
        </div>
    );
};

export default FriendList;
import React from 'react'

const UserList = ({ user, handleFunction }) => {

  return (
    <div onClick={handleFunction}  className="my-3 bg-gray-200 hover:bg-gray-600 cursor-pointer hover:text-gray-200 px-4 py-2 rounded-lg flex  justify-between items-center">
      <div>
      <h1 className='text-lg capitalize font-poppins font-semibold'>{user.name}</h1>
      <p className='text-sm font-poppins text-gray-500'>{user.email}</p>
      </div>  
      <div>
        <img 
        src={user.pic}
        alt={user.name}
        className="h-10 w-10 rounded-full"
        />
      </div>
    </div>
  )
}

export default UserList
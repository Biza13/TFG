import React from 'react'
import DeleteButton from './DeleteButton'
import EditButton from './EditButton'

export default function UserCard({user, onClickDelete, OnClickEdit}) {
  return (
    <tr className='border'>
      <td className='py-2'>{user.name}</td>
      <td className='py-2'>{user.email}</td>
      {/* Para convertir el array en un string y separar los roles con una ,  */}
      <td className='py-2'>{user.roles.join(', ')}</td>
      <td>
        <div className="flex justify-center items-center gap-2">
            {/* El !static quita el absolute para que se quede dentro de la tabla */}
            <DeleteButton onClick={() => onClickDelete(user.id)} optionalClass='!static !w-7 !h-7 !m-0 flex items-center justify-center'></DeleteButton>
            <EditButton onClick={() => OnClickEdit(user)} optionalClass='!static !w-7 !h-7 !m-0 flex items-center justify-center'></EditButton>
        </div>
      </td>
    </tr>
  )
}

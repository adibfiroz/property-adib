import getCurrentUser from '@/app/actions/getCurrentUser';
import CreatePropertyClient from '@/components/create-property-client'
import React from 'react'

const PropertyCreate = async () => {
    const currentUser = await getCurrentUser();
    return (
        <div className=' min-h-[80vh] p-4 mx-auto flex justify-center items-center'>
            <CreatePropertyClient currentUser={currentUser} />
        </div>
    )
}

export default PropertyCreate

import getCurrentUser from '@/app/actions/getCurrentUser'
import getProperties from '@/app/actions/getProperties'
import CreateCustomerClient from '@/components/Create-Customer-Client'
import React from 'react'

const CustomerCreate = async () => {
    const property = await getProperties()
    const currentUser = await getCurrentUser();

    return (
        <div className=' min-h-[80vh] p-4 mx-auto flex justify-center items-center'>
            <CreateCustomerClient currentUser={currentUser} property={property} />
        </div>
    )
}

export default CustomerCreate
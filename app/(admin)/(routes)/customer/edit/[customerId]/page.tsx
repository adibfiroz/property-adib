
import getCurrentUser from '@/app/actions/getCurrentUser';
import getCustomer from '@/app/actions/getCustomer'
import getProperties from '@/app/actions/getProperties';
import EditCustomerClient from '@/components/edit-Customer-Client';
import React from 'react'

interface IParams {
    customerId?: string;
}

const CustomerCreate = async ({ params }: { params: IParams }) => {
    const customer = await getCustomer(params)
    const property = await getProperties()
    const currentUser = await getCurrentUser();

    return (
        <div className=' min-h-[80vh] p-4 mx-auto flex justify-center items-center'>
            <EditCustomerClient currentUser={currentUser} property={property} customer={customer} />
        </div>
    )
}

export default CustomerCreate
import getCurrentUser from "@/app/actions/getCurrentUser";
import getProperty from "@/app/actions/getProperty"
import EditPropertyClient from "@/components/edit-property-client"

interface IParams {
    propId?: string;
}

const PropertyCreate = async ({ params }: { params: IParams }) => {
    const property = await getProperty(params)
    const currentUser = await getCurrentUser();


    return (
        <div className=' min-h-[80vh] p-4 mx-auto flex justify-center items-center'>
            <EditPropertyClient currentUser={currentUser} property={property} />
        </div>
    )
}

export default PropertyCreate
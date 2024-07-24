import getAdminRoles from "../../../actions/getAdminRoles";
import getCurrentUser from "../../../actions/getCurrentUser";
import RegisterClient from "@/components/register-client";

const RegisterPage = async () => {
    const currentUser = await getCurrentUser();
    const roles = await getAdminRoles();
    return (
        <main className="flex min-h-screen justify-center items-center p-4">
            <RegisterClient roles={roles} currentUser={currentUser} />
        </main>
    )
}

export default RegisterPage
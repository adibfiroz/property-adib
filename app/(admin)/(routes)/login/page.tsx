import LoginClient from "@/components/login-client";
import getCurrentUser from "../../../actions/getCurrentUser";

const LoginPage = async () => {
    const currentUser = await getCurrentUser();
    return (
        <main className="flex min-h-[80vh] justify-center items-center p-4">
            <LoginClient currentUser={currentUser} />
        </main>
    )
}

export default LoginPage
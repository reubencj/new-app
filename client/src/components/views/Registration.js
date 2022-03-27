import Navbar from "../smallComponents/Navbar";
import ProfileForm from "../forms/ProfileForm";
const Registration = (props) => {

    return (
        <div className="container">
            <Navbar />
            <div>
                <h1>Sign Up Page</h1>
            </div>
            <ProfileForm />
        </div>
    )
}

export default Registration;
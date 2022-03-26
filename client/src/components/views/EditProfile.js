import Navbar from "../smallComponents/Navbar";
import ProfileForm from "../forms/ProfileForm";
const EditProfile = (props) => {
const {userId} = props;

return (
    <div>
        <Navbar userId={userId} />
        <ProfileForm userId={userId} />
    </div>
)
}

export default EditProfile;
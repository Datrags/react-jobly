import {jwtDecode} from "jwt-decode";
import { useNavigate } from "react-router";
import { useEffect, useState } from "react";
function ProfilePage ({update, user}) {
    
    const token = localStorage.getItem("token");
    const navigate = useNavigate();
    useEffect(() => {
        function protectView() {
            if (token === 'null' || !token) {
                alert("Please Sign in")
                navigate("/");
            }
        }
        protectView()
    }, []);
    const {username} = jwtDecode(token);
    
    //TODO: API call to get user data
    let {firstName, lastName, email} = {user};

    const [formData, setFormData] = useState({
        firstName,
        lastName,
        email
      });

    const handleChange = (event) => {
    const { name, value } = event.target; 
    setFormData((prevData) => ({
        ...prevData,
        [name]: value // Update the corresponding field
    }));
    };

    const handleSubmit = async (event) => {
        event.preventDefault(); // Prevent the default form submission
        try {
            await update(formData);
            console.log("update sucessful")
            alert("Info Updated")
        } catch(e) {
            console.error(e);
        }
    }

    return(<>
        <h1>{username}</h1>
        <form onSubmit={handleSubmit}>
            <label htmlFor="firstName">First Name: </label>
            <input id="firstName" type="text" placeholder={firstName} value={formData.firstName} onChange={handleChange}/>
            <label htmlFor="lastName">Last Name: </label>
            <input id="lastName" type="text" placeholder={lastName} value={formData.lastName} onChange={handleChange}/>
            <label htmlFor="email">Email: </label>
            <input id="email" type="text" placeholder={email} value={formData.email} onChange={handleChange}/>
            <button>Save Changes</button>
        </form>
        
    
    </>)

}

export default ProfilePage;
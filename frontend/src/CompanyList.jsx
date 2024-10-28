/** CompanyList
 * Component that shows a list of companies. Made of CompanyCards.
 * Gets an array of companies as props.   
 */
import { useState, useEffect } from "react";
import { useNavigate } from "react-router";
import CompanyCard from "./CompanyCard";
function CompanyList({companies}) {
    
    const navigate = useNavigate();
    useEffect(() => {
        function protectView() {
            if (localStorage.getItem("token") === 'null') {
                alert("Please Sign in")
                navigate("/");
            }
        }
        protectView()
    }, []);

    const companyComponents = companies.map( (company, index) => (
        <li><CompanyCard key={"cc"+index} company={company}/></li>
    ))
    const [search, setSearch] = useState("");
    const handleChange = (e) => {
        setSearch(e.target.value)
    }
    const handleSubmit = (e) => {
        e.preventDefault();

    }
    return (
        <>
        <form onSubmit={handleSubmit}>
            <label htmlFor="search">Search: </label>
            <input type="text" id="search" name="search" value={search} onChange={handleChange}/> 
            <button>Find</button>
        </form>
        <ul>
            {companyComponents}
        </ul>
        </>

    )
}

export default CompanyList;
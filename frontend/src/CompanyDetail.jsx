/**Company Detail
 * page that shows the company's name, description, and jobs 
 * 
 */
import { useParams} from "react-router";
import {useState, useEffect} from 'react';
import JoblyApi from "./api"
function CompanyDetail() {

const {handle} = useParams();
const [company, setCompany] = useState(null);

useEffect(() =>{
    async function getComp() {
        try {
            const comp = await JoblyApi.getCompany(handle);
            setCompany(comp);
        }
        catch (e) {
            console.error(e)
        }
    }
    getComp();
}, [handle]);

return (
    <div> {company ? (
        <>
            <h1>{company.name}</h1>
            <p>{company.description}</p>
        </>
    ) : (<h1>Company Details not available</h1>)}</div>
)


}

export default CompanyDetail;
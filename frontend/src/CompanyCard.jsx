/** CompanyCard
 * 
 * Card that holds information about a company such as name
 * and description. Links to a CompanyDetail page.
 */

import { Link } from "react-router-dom";

function CompanyCard({company}) {
    return (
        <Link to={`/companies/${company.handle}`}>
            <div>        
                <h1>{company.name}</h1>
                <p>{company.description}</p>
            </div>
        </Link>
        
    )
}

export default CompanyCard;
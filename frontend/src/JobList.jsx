import JobCard from "./JobCard";
import { useNavigate } from "react-router";
import { useEffect } from "react";
function JobList({jobs}) {
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

    const jobComponents = jobs.map( job => (
        <li><JobCard key={job.id} job={job}/></li>
    ) )

    return (
        <>
            <ul>{jobComponents}</ul>
        </>
    )

}

export default JobList;
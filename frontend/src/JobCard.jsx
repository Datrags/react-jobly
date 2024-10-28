

function JobCard({job}) {
    return (

            <div>        
                <h4>{job.title}</h4>
                <p>{job.companyName}</p>
                <p>{job.description}</p>
                <p>{job.salary}</p>
                <p>{job.equity}</p>
            </div>
        
    )
}

export default JobCard;
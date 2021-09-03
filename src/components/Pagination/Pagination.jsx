import React from 'react'

//function for implementing the pagination logic

function Pagination({currentPage,totalLaunch,launchperPage,nextPage}) {
    let pageNumbers=[]
    for(let i=1;i<=Math.ceil(totalLaunch/launchperPage);i++){
        pageNumbers.push(i)

    }
    return (
        <div>
            <nav aria-label="Page navigation example">
                <ul class="pagination justify-content-end">
                    <li class={ currentPage==1 ?"page-item disabled":"page-item "}>
                    <a class="page-link" onClick ={()=>{nextPage(currentPage-1)}} href="#" aria-label="Previous">
                        <span aria-hidden="true">&laquo;</span>
                        <span class="sr-only">Previous</span>
                    </a>
                    </li>
                    {pageNumbers.map((i)=>{return (<li class={currentPage==i?"page-item active":"page-item"}><a class="page-link" onClick ={()=>{nextPage(i)}} href="#">{i}</a></li>)})}
                    <li class={currentPage==Math.ceil(totalLaunch/launchperPage)?"page-item disabled":"page-item"}>
                        <a class="page-link" onClick ={()=>{nextPage(currentPage+1)}} href="#" aria-label="Next">
                        <span aria-hidden="true">&raquo;</span>
                        <span class="sr-only">Next</span>
                        </a>
                    </li>
                </ul>
        </nav>
    </div>
    )
}

export default Pagination

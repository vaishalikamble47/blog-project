import React from "react";
import { MDBPagination, MDBPaginationLink, MDBPaginationItem, MDBBtn } from "mdb-react-ui-kit"
const Pagination = ({ currentPage, pagelimit, loadBlogData, data, totalBlog }) => {

    const renderPagination = () => {
        if((currentPage === 0 && data.lrngth<5) ||(totalBlog=== pagelimit && currentPage === 0)) return null;
        if (currentPage === 0) {
            return (
                <MDBPagination center className="mb-0">
                    <MDBPaginationItem>
                        <MDBPaginationLink>1</MDBPaginationLink>
                    </MDBPaginationItem>
                    <MDBPaginationItem>
                        <MDBBtn rounded onClick={() => loadBlogData(5, 10,1)}>Next</MDBBtn>
                    </MDBPaginationItem>
                </MDBPagination>
            );
        } else if (currentPage < pagelimit - 1 && data.length === pagelimit 
            &&(totalBlog-data.lenght!==pagelimit)) {
          return( <MDBPagination center className="mb-0">
                <MDBPaginationItem>
                    <MDBBtn rounded onClick={() => loadBlogData((currentPage-1)*5,currentPage*5,-1)}>
                        Prev
                    </MDBBtn>
                </MDBPaginationItem>

                <MDBPaginationItem>
                    <MDBPaginationLink>{currentPage + 1}</MDBPaginationLink>
                </MDBPaginationItem>

                <MDBPaginationItem>
                    <MDBBtn rounded onClick={() => loadBlogData((currentPage+1)*5,(currentPage+2)*5,1)}>
                        Next
                    </MDBBtn>
                </MDBPaginationItem>
            </MDBPagination>
            )

        } else {
           return(
            <MDBPagination center className="mb-0">
            <MDBPaginationItem>
                <MDBBtn rounded onClick={() => loadBlogData((currentPage-1)*5,currentPage*5,-1)}>
                    Prev
                </MDBBtn>
            </MDBPaginationItem>

            <MDBPaginationItem>
                <MDBPaginationLink>{currentPage + 1}</MDBPaginationLink>
            </MDBPaginationItem>
        </MDBPagination>
           )
        }
    }


    return (
        <div>{renderPagination()}</div>
    )
}
export default Pagination;
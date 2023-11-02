import React from "react";
import {MDBCardBody,MDBCardImage,MDBCol,MDBRow,MDBCard}from "mdb-react-ui-kit"
import {Link} from "react-router-dom"

const LatestBlog = ({imageUrl,id,title})=>{
    return(
        <div>
            <Link to={`/blog/${id}`}>
                <MDBCard style={{maxWidth:"300px", height:"80px"}} className="mt-2">
                 <MDBCol md="3">
                    <MDBCardImage
                    src={imageUrl}
                    alt={title}
                    fluid
                    className="rounded-circle"
                    style={{height:"80px"}}
                    />
                     </MDBCol>
                     <MDBCol md="9">
                    <MDBCardBody>
                        <p className=" text-start latest-title">{title}</p>
                    </MDBCardBody>
                     </MDBCol>
                </MDBCard>
            </Link>
        </div>
    )
}
export default LatestBlog;
import React from "react";
import {
    MDBCard,
    MDBCardBody,
    MDBIcon,
    MDBCol,
    MDBCardTitle,
    MDBCardText,
    MDBCardImage,
    MDBBtn,
} from "mdb-react-ui-kit"
import { Link } from "react-router-dom"
// import { Badge } from "react-bootstrap";
import Badge from "./Badge";
const Blogs = ({ title, description, category, id, imageUrl, expert, handleDelete }) => {
    return (
        <MDBCol size="4">
            <MDBCard className="h-100 mt-2" style={{ maxWidth: "22rem" }}>
                <MDBCardImage
                    src={imageUrl}
                    alt={title}
                    position="top"
                    style={{ maxHeight: "180px", maxWidth: "100%" }}
                />
                <MDBCardBody>
                    <MDBCardTitle>{title}</MDBCardTitle>
                    <MDBCardText>{expert(description)}
                    <Link to={`/blog/${id}`}>Read More</Link>
                    </MDBCardText>
                     <Badge>{category}</Badge>
                     <span>
                        <MDBBtn className="mt-1" tag="a" color="none" onClick={()=>handleDelete(id)}>
                        <MDBIcon
                        fas
                        icon="trash"
                        style={{color:"#dd4b39"}}
                        size="lg"
                        />
                        </MDBBtn>
                        <Link to={`/addEdit/${id}`}>
                            <MDBIcon fas
                        icon="edit"
                        style={{color:"#55acee", marginLeft:"10px"}}
                        size="lg"/>
                        </Link>
                       
                     </span>
                </MDBCardBody>
            </MDBCard>
        </MDBCol>
    )
}
export default Blogs;
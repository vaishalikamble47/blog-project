import React, { useState,useEffect } from "react";
import {
MDBIcon,
MDBCardText,
MDBBtn,
MDBContainer,
MDBCol,
MDBRow,
MDBCardImage,
MDBCardTitle,
MDBCardBody,
MDBTypography
} from "mdb-react-ui-kit"
import axios from "axios"
import {useParams,Link} from "react-router-dom"
import Badge from "../Component/Badge";
import { toast } from "react-toastify";

const Blog =()=>{
    const [blog,setBlog]=useState();
    const {id}=useParams();



const getSingleblog = async(id)=>{
const response= await axios.get(`http://localhost:3005/blogs/${id}`)
if (response.status===200) {
    setBlog(response.data)
} else {
    toast.error("something went wrong")
}
};
const styleInfo={
    display:"inline",
    marginLeft:"5px",
    float:"right",
    marginRight:"7px"
}
useEffect(()=>{
    if (id) {
        getSingleblog(id)
    }
},[id]);
   return(
<MDBContainer style={{border:"1px solid #d1ebe8"}}>
<Link to="/">
    <strong style={{float:"left",color:"black"}}>Go Back</strong>
</Link>
<MDBTypography
 tag="h2"
 style={{display:"inline-block"}}
 className="text-muted mt-2"
 >
    {
        (blog && blog.title)
    }

</MDBTypography>
<img
src={blog && blog.imageUrl}
className="img-fluid-rounded"
alt= {blog && blog.title}
style={{width:"100%", maxHeight:"400px"}}
/>
<div style={{marginTop:"20px"}}>
<div style={{height:"45px", background:"#f6f6f6"}}>
    <MDBIcon
    style={{float:"left"}}
    className="mt-3"
    far
    icon="calender-alt"
    size="lg"
    />
    <strong style={{float:"left",marginTop:"12px",marginLeft:"2px"}}>
        {blog&& blog.date}
    </strong>
    <Badge styleInfo={styleInfo}>{blog && blog.category}</Badge>
</div>
<MDBTypography className="lead md-0">
    {blog&&blog.description}
</MDBTypography>
</div>
</MDBContainer>
   )
}
export default Blog;
import React, { useEffect, useState } from "react";
import axios from "axios"
import { MDBCol, MDBRow, MDBContainer, MDBTypography } from "mdb-react-ui-kit"
import { toast } from 'react-toastify'
import Blogs from "../Component/Blogs";
const Home = () => {
    const [data, setData] = useState([]);
    useEffect(() => {
        loadBlogsData()
    }, [])
    const loadBlogsData = async () => {
        const response = await axios.get("http://localhost:3005/blogs")
        if (response.status === 200) {
            setData(response.data)
        } else {
            toast.error("something went wrong")
        }

    }
    console.log("data", data)

    const handleDelete = async (id) => {
        if (window.confirm("Are you sure that you wanted to delete that blog")) {
            const response = await axios.delete(`http://localhost:3005/blogs/${id}`)
            if (response.status === 200) {
               toast.success("blog deleted successfully")
               loadBlogsData();
            } else {
                toast.error("something went wrong")
            }
        }
       

    }
    const expert = (str) => {
        if (str.length > 50) {
            str = str.substring(0, 50) + " ... "
        }
        return str;

    }

    return (
        <>
            <MDBRow>
                {data.length === 0 && (
                    <MDBTypography className="text-center mb-0" tag="h2">
                        No Blog Found
                    </MDBTypography>
                )}
                <MDBCol>
                    <MDBContainer>
                        <MDBRow>
                            {data && data.map((item, index) => (
                                <Blogs key={index} {...item}
                                    expert={expert}
                                    handleDelete={handleDelete}
                                />
                            ))}
                        </MDBRow>
                    </MDBContainer>
                </MDBCol>
            </MDBRow>

        </>
    )
}
export default Home;
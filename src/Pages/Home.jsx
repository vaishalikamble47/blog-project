import React, { useEffect, useState } from "react";
import axios from "axios"
import { MDBCol, MDBRow, MDBContainer, MDBTypography } from "mdb-react-ui-kit"
import { toast } from 'react-toastify'
import Blogs from "../Component/Blogs";
import Search from "../Component/Search";
import Category from "../Component/Category";
import LatestBlog from "../Component/LatestBlog";
import Pagination from '../Component/Pagination';
const Home = () => {
    const [data, setData] = useState([]);
    const [latestBlog, setLatestBlog] = useState()
    const [searchValue, setSearchValue] = useState("")
    const [currentPage, setCurrentPage] = useState(0)
    const [totalBlog, setTotalBlog] = useState(null)
    const [pageLimit] = useState(5)

    const option = ["travel", "fashion", "fitness", "food", "sport", "tech"]


    const loadBlogsData = async (start, end, increase, operation) => {
        const totalBlog = await axios.get("http://localhost:3005/blogs")
        setTotalBlog(totalBlog.data.length)
        const response = await axios.get(`http://localhost:3005/blogs?_start=${start}_end=${end}`)
        if (response.status === 200) {
            setData(response.data)
            if (operation) {
                setCurrentPage(0)
            } else {
                setCurrentPage(currentPage + increase)
            }

        } else {
            toast.error("something went wrong")
        }

    }
debugger
    const fetchlatestBlog = async () => {
        const totalBlog = await axios.get("http://localhost:3005/blogs")
        setTotalBlog(totalBlog.data.length)
        const start = totalBlog.data?.length - 4;
        const end = totalBlog.data.length;
        const response = await axios.get(`http://localhost:3005/blogs?_start=${start}_end=${end}`)
        if (response.status === 200) {
            setLatestBlog(response.data)
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
                loadBlogsData(0, 5, 0, "delete");
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
    const onInputChange = (e) => {
        if (!e.target.value) {
            loadBlogsData(0, 5, 0);
        }
        setSearchValue(e.target.value)
    };

    const handleSearch = async (e) => {
        console.log(searchValue);
        e.preventDefault();
        const response = await axios.get(`http://localhost:3005/blogs?q=${searchValue}`)
        if (response.status === 200) {
            setData(response.data)
        } else {
            toast.error("something went wrong")
        }
    };
    const handelCategory = async (category) => {
        const response = await axios.get(`http://localhost:3005/blogs?category=${category}`)
        if (response.status === 200) {
            setData(response.data)
        } else {
            toast.error("something went wrong")
        }
    }
    useEffect(() => {
        loadBlogsData(0, 5, 0)
        fetchlatestBlog();
    }, [])
    return (
        <>
            <Search searchValue={searchValue} onInputChange={onInputChange} handleSearch={handleSearch} />
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
                <MDBCol size="3">

                    <h4 className="text-start">Latest Post</h4>
                    {latestBlog && latestBlog.map((item, index) => (
                        <LatestBlog key={index} {...item} />
                    ))}
                    <Category option={option} handelCategory={handelCategory} />

                </MDBCol>
            </MDBRow>
            <div className="mt-3">
                <Pagination currentPage={currentPage}
                    loadBlogData={loadBlogsData}
                    pagelimit={pageLimit}
                    data={data}
                    totalBlog={totalBlog}
                />
            </div>
        </>
    )
}
export default Home;
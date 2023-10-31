import React, { useState, useEffect } from "react";
import { MDBValidation, MDBInput, MDBBtn } from 'mdb-react-ui-kit'
import axios from 'axios'
import { toast } from 'react-toastify'
import { useNavigate, useParams } from "react-router-dom"

const option = ["travel", "fashion", "fitness", "food", "sport", "tech"]
const initialState = {
    title: "",
    description: "",
    category: "",
    imageUrl: ""
}
const AddEdit = () => {

    const [formValue, setFormValue] = useState(initialState);
    const [catogoryErrMsg, setCatogoryErrMsg] = useState(null)
    const [descriptionErrMsg, setDescriptionErrMsg] = useState(null)
    const [titleErrMsg, setTitleErrMsg] = useState(null)
    const [base64Image, setBase64Image] = useState(null);
    const [editmode, setEditmode] = useState(false)
    const { title, description, category, imageUrl } = formValue || {};
    const Navigate = useNavigate();

    const { id } = useParams();
    useEffect(() => {
        if (id) {
            setEditmode(true);
            getsingleBlog(id)
        } else {
            setEditmode(false);
            setFormValue({ ...initialState })
        }
    }, [id]);

    const getsingleBlog = async (id) => {
        const singelBlog = await axios.get(`http://localhost:3005/blogs/${id}`)
        if (singelBlog.status === 200) {
            setFormValue({ ...singelBlog.data })
        } else {
            toast.error("something went wrong")
        }

    }

    const getDate = () => {
        let today = new Date();
        let dd = String(today.getDate()).padStart(2, "0");
        let mm = String(today.getMonth() + 1).padStart(2, "0");
        let yyyy = today.getFullYear();

        today = dd + "/" + mm + "/" + yyyy;

        return today;
    }

    const handelSubmit = async (e) => {
        e.preventDefault();
        if (!title) {
            setTitleErrMsg("please fill the the title")
        } else {
            setTitleErrMsg("")
        }

        if (!category) {
            setCatogoryErrMsg("please select the category")
        } else {
            setCatogoryErrMsg("")
        }
        if (!description) {
            setDescriptionErrMsg("please fill the description")
        } else {
            setDescriptionErrMsg("")
        }
        const imageValidation =!editmode? imageUrl: true;
        if (title && description && category && imageUrl) {
            const currentDate = getDate();
            if (!editmode) {
  
                const updatedBlogData = { ...formValue, date: currentDate };
                const response = await axios.post("http://localhost:3005/blogs", updatedBlogData)
                if (response.status === 201) {
                    toast.success("blog created successfully")
                } else {
                    toast.error("something went wrong")
                } 
            }else{
               
                const response = await axios.put(`http://localhost:3005/blogs/${id}`, formValue)
                if (response.status === 200) {
                    toast.success("blog updated successfully")
                } else {
                    toast.error("something went wrong")
                } 
            }
            
            setFormValue({ title: "", description: "", category: "", imageUrl: "" })
            Navigate("/")
        }
    }

    const oninputChange = (e) => {
        const { name, value } = e.target
        setFormValue({ ...formValue, [name]: value });
    }

    const onUploadImage = (image) => {
        // console.log("file",file);
        // const formdata = new FormData();
        // formdata.append("file",file);
        // formdata.append()
        // axios.post()

        const file = image[0];

        if (file) {
            const reader = new FileReader();
            reader.onload = () => {
                setFormValue({ ...formValue, imageUrl: reader.result });
            };
            reader.readAsDataURL(file);
        }

    }

    const onCategoryChange = (e) => {
        setFormValue({ ...formValue, category: e.target.value })
        setCatogoryErrMsg(null)

    }


    return (
        <MDBValidation className="row g-3"
            style={{ marginTop: "100px" }}
            noValidate onSubmit={handelSubmit}>
            <p className="fs-2 fw-bold">{editmode ? "Update" : "Add"}</p>
            <div style={{
                margin: "auto",
                padding: "15px",
                maxWidth: "400px",
                alignContent: "center"
            }}>
                <MDBInput
                    value={title || ""}
                    name="title"
                    type="text"
                    onChange={oninputChange}
                    required
                    label="Title"
                    validation="please provoid a title"
                    invalid />
                {
                    titleErrMsg && (
                        <div className="catogoryErrMsg">{titleErrMsg}</div>
                    )
                }
                <br />
                <MDBInput
                    value={description || ""}
                    name="description"
                    type="text"
                    onChange={oninputChange}
                    required
                    label="Description"
                    validation="please provoid a Description"
                    textarea
                    rows={4}
                    invalid />
                {
                    descriptionErrMsg && (
                        <div className="catogoryErrMsg">{descriptionErrMsg}</div>
                    )
                }
                <br />

                {!editmode && (
                    <><MDBInput

                        type="file"
                        onChange={(e) => { onUploadImage(e.target.files) }}
                        required

                        validation="please provoid a Title"
                        invalid />
                         <br/>
                    </>
                   
                )}

                <select className="categoryDropdown" style={{ marginTop: "20px" }} onChange={onCategoryChange} value={category}>
                    <option>please select category</option>
                    {option.map((option, index) =>
                        <option value={option || ""} key={index}>{option}</option>
                    )}

                </select>
                {
                    catogoryErrMsg && (
                        <div className="catogoryErrMsg">{catogoryErrMsg}</div>
                    )
                }
                <br />
                <br />

                <MDBBtn type="submit" style={{ marginRight: "10px" }} onClick={handelSubmit}>

                    {editmode ? "Update" : "Add"}</MDBBtn>
                <MDBBtn color="danger" style={{ marginRight: "10px" }} onClick={() => Navigate("/")}>GO BACK</MDBBtn >

            </div>

        </MDBValidation>
    )
}
export default AddEdit;
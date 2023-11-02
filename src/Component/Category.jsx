import React from "react";
import { MDBCard, MDBListGroup, MDBListGroupItem } from "mdb-react-ui-kit"

const Category = ({handelCategory,option}) => {
    return (
        <MDBCard style={{ width: "18rem", marginTop: "20px" }}>
            <h4>Categories</h4>
            <MDBListGroup flush>
                {
                    option.map((item, index) => {
                      return(  <MDBListGroupItem
                            key={index}
                            style={{ cursor: "pointer" }}
                            onClick={() => handelCategory(item)}
                        >
                            {item}
                        </MDBListGroupItem>)
                    })}
            </MDBListGroup>
        </MDBCard>
    )
}
export default Category;
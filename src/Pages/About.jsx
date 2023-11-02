import React from "react";
import { MDBContainer, MDBTypography } from 'mdb-react-ui-kit'
const About =()=>{
   return(
    <div>
       <MDBContainer style={{marginTop:"100px"}}>
        <MDBTypography note noteColor="primary">
            It is a blogging website where you find blog post related to 
            different category like Travel, Food, Sport, Tech and Fashion
        </MDBTypography>
       </MDBContainer>
    </div>
   )
}
export default About;
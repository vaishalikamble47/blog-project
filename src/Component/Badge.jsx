import React, { } from "react-router-dom"
import { MDBBadge } from "mdb-react-ui-kit"
const Badge = ({ children, styleInfo }) => {
    const colorKey = {
        Fashion: "primary",
        Travel: "success",
        Fitness: "danger",
        Food: "warning",
        tech: "info",
        Sport: "dark"
    }
    return (
        <h5 style={styleInfo}>
            <MDBBadge color={colorKey[children]}>{children}</MDBBadge>
        </h5>
    )
}
export default Badge;
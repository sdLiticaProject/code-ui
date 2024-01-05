import GraphBlock from "./GraphBlock";
import PropTypes from "prop-types";
import React from "react";
import {Grid} from "@material-ui/core";
import {AiFillDelete, BsFillGrid3X3GapFill} from "react-icons/all";


const GridItem = React.forwardRef(({title, data, type, className, style, dispatch, root, children, ...rest}, ref) => {
    const width = parseInt(style.width, 10) - 20;
    const height = parseInt(style.height, 10) - 25;

    return (
        <div ref={ref} className={`grid-item ${className}`} style={style} {...rest}>
            <div className="grid-item__title" style={{borderBottom: "1px solid #3F88C5" }}>
                <Grid container spacing={3}>
                    <Grid item xs={12} sm={1} className="grid-item__title_move"><BsFillGrid3X3GapFill/></Grid>
                    <Grid item xs={12} sm={9}>{title}</Grid>
                    <Grid item xs={12} sm={2} style={{textAlign: "right"}}><AiFillDelete/></Grid>
                </Grid>
            </div>
            <div className="grid-item__graph" style={{display: "flex", justifyContent: "center"}}>
                <GraphBlock type={type} data={data} width={width} height={height}/>
            </div>
            {children}
        </div>
    )
})

GridItem.propTypes = {
    title: PropTypes.string.isRequired,
    type: PropTypes.string.isRequired,
    data: PropTypes.array.isRequired,
    root: PropTypes.string.isRequired,
    children: PropTypes.array
};

export default GridItem;
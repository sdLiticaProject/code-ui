import GridItem from "./GridItem";
import PropTypes from "prop-types";
import {connect} from "react-redux";
import React from "react";


const GridItemContainer = React.forwardRef(({ title, type, data, children, item, ...props }, ref) => {
    return (
        <GridItem ref={ref} className={title} title={title} type={type} data={data} root={item.id} {...props}>
            {children}
        </GridItem>
    )
})

GridItemContainer.propTypes = {
    title: PropTypes.string.isRequired,
    type: PropTypes.string.isRequired,
    item: PropTypes.string.isRequired,
    data: PropTypes.array.isRequired,
    children: PropTypes.array
};

export default GridItemContainer;
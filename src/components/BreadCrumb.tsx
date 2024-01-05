import { Link, useLocation } from 'react-router-dom';
import styled from 'styled-components';
import {Breadcrumbs, Box, Icon, Hidden} from "@material-ui/core";
import { NavLink } from 'react-router-dom';
import {MdOutlineNavigateNext} from "react-icons/all";
import {AiFillHome} from "react-icons/ai";
import {HOME} from "../constants/routes";

// styled components
const BreadcrumbRoot = styled(Box)({
    display: 'flex',
    flexWrap: 'wrap',
    alignItems: 'center',
    marginBottom: '5px'
});

const BreadcrumbName = styled('h4')({
    margin: 0,
    fontSize: '16px',
    paddingBottom: '1px',
    verticalAlign: 'middle',
    textTransform: 'capitalize'
});

const SubName = styled('span')({
    textTransform: 'capitalize',
    color: "rgba(52, 49, 76, 0.75)"
});

const Separator = styled('h4')({
    margin: 0,
    marginLeft: 8,
    paddingBottom: '3px',
    color: "#000000"
});

const StyledIcon = styled(Icon)({
    marginLeft: 8,
    marginBottom: '4px',
    verticalAlign: 'middle'
});

const Breadcrumb = ({routeSegments}): JSX.Element => {
    return (
        <BreadcrumbRoot>
            {routeSegments ? (
                <Hidden xsDown>
                    <BreadcrumbName>{routeSegments[routeSegments.length - 1]['name']}</BreadcrumbName>
                    <Separator>|</Separator>
                </Hidden>
            ) : null}

            <Breadcrumbs separator={<Icon style={{ color: "black", marginBottom: "6px"}}><MdOutlineNavigateNext /></Icon>}
                style={{ display: 'flex', alignItems: 'center', position: 'relative' }}
            >
                <NavLink to={HOME}>
                    <StyledIcon color="primary"><AiFillHome style={{width: "24px", height: "24px"}}/></StyledIcon>
                </NavLink>

                {routeSegments
                    ? routeSegments.map((route, index) => {
                        return index !== routeSegments.length - 1 ? (
                            <NavLink key={index} to={route.path} style={{textDecoration: "none"}}>
                                <SubName>{route.name}</SubName>
                            </NavLink>
                        ) : (
                            <SubName key={index}>{route.name}</SubName>
                        );
                    })
                    : null}
            </Breadcrumbs>
        </BreadcrumbRoot>
    );
};

export default Breadcrumb;
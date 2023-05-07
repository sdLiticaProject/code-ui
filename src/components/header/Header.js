import React from 'react';
import * as Sc from "../../pages/home/HomePage.styles";
import MenuWrapper from "../../pages/home/components/header-menu/HeaderMenu";

const Header = () => {

    return (
        <Sc.HeaderWrapper>
            <MenuWrapper/>
        </Sc.HeaderWrapper>
    );
};

export default Header;

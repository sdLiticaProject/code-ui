import React from 'react';
import Sidebar from '../sidebar/Sidebar';
import {SLayout, SMain} from './styles';
import * as Sc from "../../pages/home/HomePage.styles";
import {useLocation} from "react-router-dom";
import Tabs from "../../pages/home/components/tabs/Tabs";
import * as routes from '../../constants/routes';
import Header from "../header/Header";

const Layout = ({children}) => {
    return (
        <SLayout>
            <Sidebar/>
            <div style={{ display: "table", width: "100%"}}>
                <Header/>
                <Sc.MainWrapper>
                    {children}
                </Sc.MainWrapper>
            </div>
        </SLayout>
    );
};

export default Layout;

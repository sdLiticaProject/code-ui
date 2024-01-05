import * as Sc from "../../home/HomePage.styles";
import Breadcrumb from "../../../components/BreadCrumb";
import React, {useEffect, useState} from "react";
import {Responsive, WidthProvider} from "react-grid-layout";
import GridItemContainer from "./GridItemContainer";
import PropTypes from "prop-types";
import {connect} from "react-redux";
import set from "react-hook-form/dist/utils/set";
import GridLayout from "./GridLayout";
import Panel from "./Panel";

const ResponsiveGridLayout = WidthProvider(Responsive);

const ExplorerWidgets = (dashboardId): JSX.Element => {
    let [layouts, setLayouts] = useState({});

    const data = [
        {
            "id": 1,
            "title": "Temperature 1984",
            "type": "lines+markers",
            "layout": {lg: {x: 0, y: 0, w: 4, h: 3, minW: 4, minH: 3}},
            "timeSeriesId": '12321'
        },
        {
            "id": 2,
            "title": "Temperature 1987",
            "type": "lines+fill",
            "layout": {lg: {x: 3, y: 4, w: 4, h: 3}},
            "timeSeriesId": '12321'
        },
        // {
        //     "id": 3,
        //     "title": "Temp 3",
        //     "type": "bar",
        //     "layout": {lg: {x: 6, y: 8, w: 4, h: 3}},
        //     "timeSeriesId": '12321'
        // },
        // {
        //     "id": 4,
        //     "title": "Temp Stats",
        //     "type": "stats",
        //     "layout": {lg: {x: 6, y: 8, w: 4, h: 3}},
        //     "timeSeriesId": '12321'
        // }
    ]

    useEffect(() => {
        setLayouts({"undefined": data.map(item => item.layout.lg)});
    }, []);


    return (
        <Sc.ContentWrapper>
            <Breadcrumb routeSegments={[{
                'name': 'Dashboards',
                "path": "/home/dashboards"
            }, {'name': dashboardId.dashboardId}]}/>
            <Panel/>
            <GridLayout data={data} layouts={layouts}/>
        </Sc.ContentWrapper>
    )
}

ExplorerWidgets.propTypes = {
    dashboardId: PropTypes.string.isRequired,
};

export default connect(null, null, null, { pure: false })(ExplorerWidgets);
import PropTypes from "prop-types";
import {connect} from "react-redux";
import {Component, createRef, PureComponent} from "react";
import {Responsive, WidthProvider} from "react-grid-layout";
import GridItemContainer from "./GridItemContainer";
import {setBreakPoint} from "../../../actions/dashboard-actions";
import {StyledGridItemContainer} from "./styles/ExplorerWidjets.styles";

const ResponsiveGridLayout = WidthProvider(Responsive);

class GridLayout extends PureComponent {
    static defaultProps = {
        isDraggable: true,
        isResizable: true,
        items: 20,
        rowHeight: 30,
        onLayoutChange: function() {},
        cols: 12
    };

    handleBreakPointChange = (breakpoint) => {
        this.breakpoint = breakpoint;
        this.props.setBreakPoint(breakpoint);
    };

    handleLayoutChange = (newLayout) => {
        console.log("newLayout", newLayout);
        console.log("layouts", this.props.layouts);
        console.log("breakpoint", this.breakpoint);
        // this.props.layouts[TouchList.breakpoint] = newLayout;
    };

    // TODO: Исправить breakpoint
    render() {
        const { data, layouts } = this.props;

        return (
            <ResponsiveGridLayout
                className="layout"
                layouts={layouts}
                onBreakpointChange={this.handleBreakPointChange}
                onLayoutChange={this.handleLayoutChange}
                isDraggable
                isRearrangeable
                isResizable
                draggableHandle=".grid-item__title_move"
                // breakpoints={{ lg: 1280, md: 992, sm: 767, xs: 480, xxs: 0 }}
                // cols={{ lg: 12, md: 10, sm: 6, xs: 4, xxs: 2 }}
            >
                {data.map((item) => (
                    <StyledGridItemContainer key={item.id} item={item} data={item.data} title={item.title} type={item.type}/>
                ))}
            </ResponsiveGridLayout>
        );
    }
}

GridLayout.propTypes = {
    data: PropTypes.object.isRequired,
    layouts: PropTypes.object.isRequired
};

export default connect(null, { setBreakPoint })(GridLayout);
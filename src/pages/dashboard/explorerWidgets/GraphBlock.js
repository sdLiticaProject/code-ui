import Plot from 'react-plotly.js';
import PropTypes from "prop-types";
import {TitleBox} from "../../home/main/Main.styles";
import {Box, Grid} from "@material-ui/core";

const GraphBlock = ({type, data, width, height}) => {
    let graphComponent;

    const layout = {
        title: '',
        autosize: true,
    };

    const colors = [
        '#1f77b4',
        '#ff7f0e',
        '#2ca02c',
        '#d62728',
        '#9467bd',
        '#8c564b',
        '#e377c2',
        '#7f7f7f',
        '#bcbd22',
        '#17becf',
    ];

    let plotData;

    switch (type) {
        case 'lines':
            plotData = data.map((d, index) => ({
                x: d.x,
                y: d.y,
                type: type,
                mode: type,
                marker: {color: colors[index % colors.length]},
                name: d.name,
            }));
            return <Plot data={plotData} layout={layout} useResizeHandler style={{width: '90%', height: height}}/>;
        // return (<div style={{background: "blue", width: width, height: height}}>1</div>);
        case 'lines+markers':
            plotData = data.map((d, index) => ({
                x: d.x,
                y: d.y,
                type: type,
                mode: type,
                marker: {color: colors[index % colors.length]},
                name: d.name,
            }));
            return <Plot data={plotData} layout={layout} useResizeHandler style={{width: '90%', height: height}}/>;
        case 'lines+fill':
            plotData = data.map((d, index) => ({
                x: d.x,
                y: d.y,
                type: type,
                mode: type,
                fill: "tozeroy",
                marker: {color: colors[index % colors.length]},
                name: d.name,
            }));
            return <Plot data={plotData} layout={layout} useResizeHandler style={{width: '90%', height: height}}/>;
        // return (<div style={{background: "red", width: "90%", height: height}}>2</div>);
        case 'bar':
            plotData = data.map((d, index) => ({
                x: d.x,
                y: d.y,
                type: type,
                mode: type,
                marker: {color: colors[index % colors.length]},
                name: d.name,
            }));
            return (<Plot data={plotData} layout={layout} useResizeHandler style={{width: '90%', height: height}}/>);
        case 'markers':
            plotData = data.data.map((d, index) => ({
                x: d.x,
                y: d.y,
                type: type,
                mode: type,
                marker: {color: colors[index % colors.length]},
                name: d.name,
            }));
            return (<Plot data={plotData} layout={layout} useResizeHandler style={{width: '90%', height: height}}/>);
        case 'stats':
            return (<>
                <Box>
                    <Grid container spacing={3} style={{textAlign: "center"}}>
                        <Grid item xs={6} sm={12} style={{fontWeight: "bold"}}>Simple statistics</Grid>
                        <Grid item xs={6} sm={6}>
                            Min: 12
                        </Grid>
                        <Grid item xs={6} sm={6}>
                            Max: 13
                        </Grid>
                        <Grid item xs={6} sm={6}>
                            Mean: 12.2
                        </Grid>
                        <Grid item xs={6} sm={6}>
                            Sum: 61
                        </Grid>
                    </Grid>
                </Box>
            </>);
        case 'histogram':
            plotData = data.map((d, index) => ({
                x: d.x,
                type: type,
                mode: type,
                marker: {color: colors[index % colors.length]},
                name: d.name,
            }));
            return (<Plot data={plotData} layout={layout} useResizeHandler style={{width: '90%', height: height}}/>);
        default:
            return null;
    }
}

GraphBlock.propTypes = {
    type: PropTypes.string.isRequired,
    data: PropTypes.array.isRequired,
    width: PropTypes.number.isRequired,
    height: PropTypes.number.isRequired
};

export default GraphBlock;
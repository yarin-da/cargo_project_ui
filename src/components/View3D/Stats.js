import React from "react";
import { Box, Typography, LinearProgress } from "@mui/material";

function LinearProgressWithLabel(props) {
    return (
        <Box sx={{ display: 'flex', alignItems: 'center' }}>
            <Box sx={{ width: '100%', mr: 1 }}>
                <LinearProgress sx={{ filter: 'brightness(85%)', height: 5 }} color="secondary" variant="determinate" {...props} />
            </Box>
            <Box sx={{ minWidth: 35 }}>
                <Typography variant="body2" color="text.secondary">
                    {`${Math.round(props.value,)}%`}
                </Typography>
            </Box>
        </Box>
    );
}

const Stats = ({ stats, container }) => {
    const divStyle = {
        position: 'absolute', 
        top: 10, 
        right: 10, 
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'flex-start',
        padding: '0 0 10px 20px',
        background: 'rgba(170, 170, 200, 0.33)',
        boxShadow: '1px 2px 0 0 rgba(0, 0, 0, 0.33)',
        borderRadius: 10,
    };
    return (
        <div style={divStyle}>
            <div>
                <div className="unselectable-text" style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', columnGap: 10 }}>
                    <h4>Stats</h4>
                    <span style={{ gridColumn: 1 }}>
                        Profit
                    </span>
                    <span style={{ gridColumn: 2 }}>
                        {stats['profit']}
                    </span>
                    <span style={{ gridColumn: 1 }}>
                        Weight
                    </span>
                    <span style={{ gridColumn: 2 }}>
                        {/* {stats['weight']} / {container['maxWeight']} */}
                        <LinearProgressWithLabel value={100 * stats['weight'] / container['maxWeight']} />
                    </span>
                    <span style={{ gridColumn: 1 }}>
                        Space
                    </span>
                    <span style={{ gridColumn: 2 }}>
                        <LinearProgressWithLabel value={100 * stats['space_usage']} />
                    </span>
                    <h4>Boxes Used</h4>
                    {Object.keys(stats['box_usage']).map(t => 
                    <React.Fragment key={`box-usage-${t}`}>
                        <span style={{ gridColumn: 1 }}>
                            {t}
                        </span>
                        <span style={{ gridColumn: 2 }}>
                            {stats['box_usage'][t]['used']} / {stats['box_usage'][t]['total']}
                        </span>
                    </React.Fragment>
                    )}
                </div>
            </div>
        </div>
    );
};

export default Stats;
import React from "react";
import { Box, Typography, LinearProgress } from "@mui/material";
import CustomText from "../CustomText";
import '../../styles/Stats.css'

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
    return (
        <div className="stats-div">
            <div className="unselectable-text data">
                <CustomText text="stats" variant="h6" style={{ gridColumnStart: 1, gridColumnEnd: 3 }} />
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
                    <LinearProgressWithLabel value={100 * stats['weight'] / container['maxWeight']} />
                </span>
                <span style={{ gridColumn: 1 }}>
                    Space
                </span>
                <span style={{ gridColumn: 2, marginBottom: 20 }}>
                    <LinearProgressWithLabel value={100 * stats['space_usage']} />
                </span>
                <CustomText text="boxesUsed" variant="h6" style={{ gridColumnStart: 1, gridColumnEnd: 3 }}/>
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
    );
};

export default Stats;
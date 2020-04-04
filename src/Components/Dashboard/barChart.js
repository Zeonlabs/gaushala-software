import React from 'react'
import {ResponsiveBar} from '@nivo/bar'

export const BarChart = ({ data}) => (
    <ResponsiveBar
        data={data}
        keys={[ 'income', 'expense']}
        indexBy="type"
        margin={{ top: 20, right: 30, bottom: 20, left: 85 }}
        padding={0.45}
        colors={bar => bar.id == 'income' ? '#36B971' : 'rgb(255, 77, 79)'}
        axisTop={null}
        axisRight={null}
        axisBottom={{
            tickSize: 5,
            tickPadding: 5,
            tickRotation: 0,
            legendPosition: 'middle',
            legendOffset: 32
        }}
        axisLeft={{
            tickSize: 5,
            tickPadding: 10,
            tickRotation: 0,
            legend: 'Amount',
            legendPosition: 'middle',
            legendOffset: -75,
            tickValues: 5,
        }}
        labelSkipWidth={12}
        labelSkipHeight={12}
        labelTextColor={{ from: 'color', modifiers: [ [ 'darker', 1.6 ] ] }}
        animate={true}
        motionStiffness={90}
        motionDamping={15}
    />
)
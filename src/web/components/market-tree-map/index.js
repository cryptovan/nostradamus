import React from 'react'
import d3 from 'd3'
import { Treemap } from 'd3plus-react'

import './index.css'

const data = [
    { id: "BTC", value: 29 },
    { id: "ETH", value: 10 },
    { id: "NEO", value: 1 },
    { id: "ARK", value: 20 },
    { id: "LISK", value: 30 },
    { id: "NAV", value: 17 },
    { id: "XVG", value: 15 }
];

export default class MarketTreeMap extends React.Component {
    render() {
        return (
            <div className="market-tree-map-container panel-container">
                <Treemap config={{ data: data }} />
            </div>
        )
    }
}

MarketTreeMap.propTypes = {
}
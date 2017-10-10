import React, { Component } from 'react'
import { createObserver } from 'dop'
import styled from 'styled-components'
import { Show } from '/doprouter/react'
import IconMore from 'react-icons/lib/md/more-vert'

import routes from '/const/routes'
import styles from '/const/styles'
import { currencies } from '/const/currencies'


import { numberWithSeparation, round } from '/api/numbers'
import { Assets } from '/api/Assets'

import state from '/store/state'
import {
    setHref,
    exportAssets,
    importAssetsFromFile,
    closeSession
} from '/store/actions'

import CountUp from 'react-countup'
import {
    DropDown,
    DropDownItem,
    DropDownMenu,
    DropDownArrow
} from '/components/styled/Dropdown'
import ButtonBig from '/components/styled/ButtonBig'
import AssetList from '/components/partials/AssetList'

export default class Left extends Component {
    componentWillMount() {
        this.state = { balance_start: 0 }
        this.observer = createObserver(mutations => this.forceUpdate())
        this.observer.observe(state, 'balance')
        this.observer.observe(state, 'menuOpen')
        this.observer.observe(state, 'totalAssets')

        this.onMenuOpen = this.onMenuOpen.bind(this)
        this.onExport = this.onExport.bind(this)
        this.onImport = this.onImport.bind(this)
        this.onClose = this.onClose.bind(this)
    }
    componentWillUnmount() {
        this.observer.destroy()
    }
    shouldComponentUpdate() {
        return false
    }

    onExport(e) {
        exportAssets()
    }
    onImport(e) {
        importAssetsFromFile()
    }
    onClose(e) {
        closeSession()
    }

    onMenuOpen(e) {
        state.menuOpen = true
    }

    onMenuClose(e) {
        state.menuOpen = false
    }

    render() {
        const balance_start = this.state.balance_start
        this.state.balance_start = state.balance
        return React.createElement(LeftTemplate, {
            ascii: currencies[state.currency].ascii,
            balance_start: balance_start,
            balance_end: state.balance,
            // balance: numberWithSeparation(round(state.balance)),
            color: state.balance > 0 ? Assets.BTC.color : '#DDDDDD',
            menuOpen: state.menuOpen,
            onMenuOpen: this.onMenuOpen,
            onMenuClose: this.onMenuClose,
            onExport: this.onExport,
            onImport: this.onImport,
            onClose: this.onClose,
            totalAssets: state.totalAssets
        })
    }
}

function LeftTemplate({
    ascii,
    balance_start,
    balance_end,
    color,
    menuOpen,
    onMenuOpen,
    onMenuClose,
    onExport,
    onImport,
    onClose,
    totalAssets
}) {
    return (
        <LeftDiv>
            <ColumnLeftChart onClick={e => setHref(routes.home())}>
                <ColumnLeftChartBalance>
                    <ColumnLeftChartLabel>Total balance</ColumnLeftChartLabel>
                    <ColumnLeftChartNumber>
                        <AmountSuper>{ascii}</AmountSuper>
                        <Amount>
                            <CountUp
                                start={balance_start}
                                end={balance_end}
                                duration={5}
                                useEasing={true}
                                useGrouping={true}
                                separator=","
                            />
                        </Amount>
                        {/* <AmountSuper>.52</AmountSuper>  */}
                    </ColumnLeftChartNumber>
                </ColumnLeftChartBalance>
                <ColumnLeftChartChart>
                    <svg width="100%" height="200" viewBox="0 0 28 28">
                        <circle
                            cx="14"
                            cy="15"
                            r="12.3"
                            fill="transparent"
                            stroke={color}
                            strokeWidth="1.3"
                        />
                    </svg>
                </ColumnLeftChartChart>
            </ColumnLeftChart>
            <ColumnLeftHeader>
                <ColumnLeftHeaderLeft>
                        <IconMore size={35} color={styles.color.front2} />
                </ColumnLeftHeaderLeft>
                <ColumnLeftHeaderRight />
            </ColumnLeftHeader>
            <ColumnLeftContent>
                <AssetList />
            </ColumnLeftContent>
            <ColumnLeftFooter>
                <ButtonBig
                    onClick={e => {
                        setHref(routes.add())
                    }}
                >
                    Add Asset
                </ButtonBig>
            </ColumnLeftFooter>
        </LeftDiv>
    )
}

const LeftDiv = styled.div`
    position: absolute;
    height: 100%;
    width: ${styles.leftColumn};
    ${styles.media.second} {
        left: -${styles.paddingOutMobile};
        top: -${styles.headerHeight};
        height: calc(100% + ${styles.paddingOutMobile} + ${styles.headerHeight});
        background: white;
    }
`

const ColumnLeftHeader = styled.div`
    position: absolute;
    top: 0;
`
const ColumnLeftHeaderLeft = styled.div`
    float: left;
    padding-left: 5px;
    padding-top: 10px;
`
const ColumnLeftHeaderRight = styled.div`float: right;`

const ColumnLeftChart = styled.div`cursor: pointer;`
const ColumnLeftChartChart = styled.div``

const ColumnLeftChartBalance = styled.div`
    position: absolute;
    text-align: center;
    width: 100%;
    padding-top: 80px;
`

const ColumnLeftChartLabel = styled.div`
    font-size: 12px;
    color: ${styles.color.front2};
`

const ColumnLeftChartNumber = styled.div`line-height: 35px;`

const ColumnLeftContent = styled.div`
    border-top: 1px solid ${styles.color.background4};
    height: calc(100% - 277px);
    overflow-y: auto;
    position: absolute;
    width: 100%;
    top: 215px;
`
// &::-webkit-scrollbar {
//     width: 8px;
//     height: 8px;
// }
// &::-webkit-scrollbar-thumb {
//     background: ${styles.color.background4};
//     cursor: grab;
// }
// &::-webkit-scrollbar-track {
//     background: transparent;
// }

const ColumnLeftFooter = styled.div`
    position: absolute;
    bottom: 0;
    width: calc(100% - 20px);
    padding: 10px;
`

const AmountSuper = styled.span`
    position: relative;
    top: -10px;
    font-size: 20px;
    font-weight: bold;
    color: ${styles.color.front3};
`
const Amount = styled.span`
    font-size: 36px;
    font-weight: bold;
    color: ${styles.color.front3};
`

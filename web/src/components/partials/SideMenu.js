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
        this.observer = createObserver(mutations => this.forceUpdate())
        this.observer.observe(state, 'sideMenuOpen')
    }
    componentWillUnmount() {
        this.observer.destroy()
    }
    shouldComponentUpdate() {
        return false
    }


    onClickBackground() {
        state.sideMenuOpen = false
    }



    render() {
        return React.createElement(LeftTemplate, {
            open: state.sideMenuOpen,
            onClickBackground: this.onClickBackground
        })
    }
}

function LeftTemplate({
    open,
    onClickBackground
}) {
    return (
        <Container>
            <Menu open={open}>
                <Content>
                    <AssetList />
                </Content>
                <Footer>
                    <ButtonBig
                        onClick={e => {
                            setHref(routes.add())
                        }}
                    >
                        Add Asset
                    </ButtonBig>
                </Footer>
            </Menu>
            <Background open={open} onClick={onClickBackground} />
        </Container>
    )
}

const Container = styled.div`
    z-index: 2;
    position: absolute;
    left: 0;
    top: 0;
    width: 100%;
    height: 100%;
    pointer-events: none;
`

const Background = styled.div`
    ${styles.media.first} {
        transition: 0.5s ease all;
        width: 100%;
        height: 100%;
        pointer-events: auto;
        display: ${props=>props.open ? 'block' : 'none'};
        background-color: rgba(0, 0, 0, ${props=>props.open ? .35 : 0});
    }
`

const Menu = styled.div`
    pointer-events: auto;
    position: relative;
    height: calc(100% - ${styles.paddingOut} - ${styles.headerHeight});
    width: ${styles.leftColumn};
    left: ${styles.paddingOut};
    top: ${styles.headerHeight};
    ${styles.media.first} {
        box-shadow: 4px 0 4px 0px rgba(0,0,0,${props=>props.open? .2 : 0});
        width: ${styles.leftColumnMobile};
        transition: 0.5s ease all;
        position: fixed;
        left: ${props=>props.open? 0 : '-'+styles.leftColumnMobile};
        top: 0;
        height: 100%;
        background: white;
    }
`



const Content = styled.div`
    height: calc(100% - 60px);
    overflow-y: auto;
    width: 100%;
    &::-webkit-scrollbar {
        width: 8px;
        height: 8px;
    }
    &::-webkit-scrollbar-thumb {
        background: ${styles.color.background4};
        cursor: grab;
    }
    &::-webkit-scrollbar-track {
        background: transparent;
    }
`

const Footer = styled.div`
    width: calc(100% - 20px);
    padding: 10px;
`






// const balance_start = this.state.balance_start
// this.state.balance_start = state.balance
// ascii: currencies[state.currency].ascii,
// balance_start: balance_start,
// balance_end: state.balance,
// // balance: numberWithSeparation(round(state.balance)),
// color: state.balance > 0 ? Assets.BTC.color : '#DDDDDD',
// menuOpen: state.menuOpen,
// onMenuOpen: this.onMenuOpen,
// onMenuClose: this.onMenuClose,
// onExport: this.onExport,
// onImport: this.onImport,
// onClose: this.onClose,
// totalAssets: state.totalAssets


// <Chart onClick={e => setHref(routes.home())}>
// <ChartBalance>
//     <ChartLabel>
//         Total balance
//     </ChartLabel>
//     <ChartNumber>
//         <AmountSuper>{ascii}</AmountSuper>
//         <Amount>
//             <CountUp
//                 start={balance_start}
//                 end={balance_end}
//                 duration={5}
//                 useEasing={true}
//                 useGrouping={true}
//                 separator=","
//             />
//         </Amount>
//         {/* <AmountSuper>.52</AmountSuper>  */}
//     </ChartNumber>
// </ChartBalance>
// <ChartChart>
//     <svg width="100%" height="200" viewBox="0 0 28 28">
//         <circle
//             cx="14"
//             cy="15"
//             r="12.3"
//             fill="transparent"
//             stroke={color}
//             strokeWidth="1.3"
//         />
//     </svg>
// </ChartChart>
// </Chart>
// <Header>
// <HeaderLeft>
//     <IconMore size={35} color={styles.color.front2} />
// </HeaderLeft>
// <HeaderRight />
// </Header>




// const Chart = styled.div`cursor: pointer;`
// const ChartChart = styled.div``

// const ChartBalance = styled.div`
//     position: absolute;
//     text-align: center;
//     width: 100%;
//     padding-top: 80px;
// `

// const ChartLabel = styled.div`
//     font-size: 12px;
//     color: ${styles.color.front2};
// `

// const ChartNumber = styled.div`line-height: 35px;`



// const Header = styled.div`
// position: absolute;
// top: 0;
// `
// const HeaderLeft = styled.div`
// float: left;
// padding-left: 5px;
// padding-top: 10px;
// `
// const HeaderRight = styled.div`float: right;`



// const AmountSuper = styled.span`
//     position: relative;
//     top: -10px;
//     font-size: 20px;
//     font-weight: bold;
//     color: ${styles.color.front3};
// `
// const Amount = styled.span`
//     font-size: 36px;
//     font-weight: bold;
//     color: ${styles.color.front3};
// `
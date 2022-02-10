
import React from 'react';
import { connect } from 'react-redux';
import { StyledEngineProvider } from '@mui/material/styles';
import Menu from "../common/MenuList";
import { ToastContainer, toast } from 'react-toastify';


class HomeHeader extends React.Component {

    constructor(props) {
        super(props);
    }

    render() {
        return (
            <>
                <ToastContainer>
                </ToastContainer>

                <div className='header'>
                    <div className="content mx-auto">
                        <div className='flex align-center'>
                            <img alt='' src='/img/logo.png' className='logo-img' />
                            {/* <span className='logo-title'>
                                PHOENIX
                            </span> */}
                        </div>
                        <div className='menu-container flex1 align-center flex justify-center'>
                            <span className='menu'>
                                <a href='/'>HOME</a>
                            </span>
                            {/* <span className='menu'>
                                <a>STORY</a>
                            </span> */}
                            <span className='menu'>
                                <a href='mailto:help@thephoenix.finance'>CONTACT</a>
                            </span>
                            <span className='menu'>
                                <a href="/#section-faq">FAQ</a>
                            </span>
                            <span className='menu'>
                                <a href="https://twitter.com/phoenix_fi" target="_blank" rel="nofollow noopener noreferrer"><i className="fab fa-twitter"></i></a>
                            </span>
                            <span className='menu'>
                                <a href="https://discord.gg/uUaZgsZXM5" target="_blank" rel="nofollow noopener noreferrer"><i className="fab fa-discord"></i></a>
                            </span>
                            <span className='menu'>
                            <a href="https://medium.com/@phoenix-community-capital" target="_blank" rel="noreferrer noopener"><i className="fab fa-medium"></i></a>
                            </span>
                            <span className='menu flex1'></span>
                           
                            <div className="certik" onClick={() => { window.open("https://www.certik.com/projects/thephoenix") }}></div>
                        </div>
                        <a id='launch_btn' className='btn action-btn' href='/app'>
                            LAUNCH APP
                        </a>
                        <a id='launch_sm_btn'>
                            <StyledEngineProvider injectFirst>
                                <Menu />
                            </StyledEngineProvider>,
                        </a>
                    </div>
                </div>
                <div className='header_border'></div>
            </>
        );
    }
}
const mapStateToProps = state => {
    return { state };
}
export default connect(mapStateToProps)(HomeHeader);


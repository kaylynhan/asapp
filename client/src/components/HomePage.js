import React from 'react';
import SignUp from "../components/Signup.js"
import "./homepage.css"
import UnitSlider from "../components/UnitSlider"
import 'rc-slider/assets/index.css';
import GapSlider from './GapSlider.js';
import ProfDropdown from './ProfDropdown.js';
import Grid from "./Grid.js"


class HomePage extends React.Component {
    render() {
        return (
            <div>
                <div id="page_container">
                    <header>
                        <h1> Header </h1>
                    </header>
                    <div id="left_sidebar">
                        <div id="search_input">
                            <p> Search_input</p>
                        </div>
                        <div id="search_result">
                            <p> Search_result</p>
                        </div>
                        <div id="generate">
                            <p> Generate Btn</p>
                        </div>
                        <div id="need_want">
                            <p> Need vs want</p>
                        </div>
                    </div>
                    <div id="schedule_area">
                        <div id="preferences">
                            <div id="unitPref">
                                <UnitSlider />
                            </div>
                            <div id="minGap">
                                <GapSlider />
                            </div>
                            <div id="profPref">
                                <ProfDropdown title="Pref Prof" />
                            </div>
                            <div id="profAvoid">
                                <ProfDropdown title="Avoid Prof"></ProfDropdown>
                            </div>
                        </div>
                            <div id="sort">
                                <p> sort_by</p>
                            </div>
                            <div id="grid_area">
                                <p> grid_area</p>
                                <br></br>
                                <br></br>
                                <br></br>
                                <br></br>
                                <br></br>
                                <br></br>
                                <br></br>
                                <br></br>
                                <br></br>
                                <br></br>
                                <br></br>
                                <br></br>
                                <br></br>
                                <br></br>
                                <br></br>
                                <br></br>
                                <br></br>
                                <br></br>
                                <br></br>
                                <br></br>
                                <br></br>
                                <br></br>
                                <br></br>
                                <br></br>
                                <br></br>
                                <br></br>
                                <br></br>
                                <br></br>
                                <br></br>
                                <br></br>
                            </div>
                        </div>
                    </div>
                </div>
                )
            }
        }
        
export default HomePage;
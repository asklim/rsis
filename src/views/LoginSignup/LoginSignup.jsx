
import React from "react";
//import PropTypes from "prop-types";
import { NavLink } from "react-router-dom";

// core components
import { Grid } from "@mui/material";
//import GridContainer from "components/m-d-r/Grid/GridContainer.js";

import {
    //CallMadeIcon as Arrow45,
    AlternateEmail as AtIcon,
    PermIdentity,
    LockOpen,
} from "@mui/icons-material";

import "./login3d.css";
import "./placeholder.css";


export default function LoginSignupPage () {
    return (<>
        <Grid container><Grid item xs={12} sm={10} md={8} lg={6}>
            <div className="section container row full-height justify-content-center">
                <div className="col-12 text-center align-self-center py-5">
                    <div className="section pb-5 pt-5 pt-sm-2 text-center">
                        <h6 className="mb-0 pb-3"><span>Log In </span><span>Sign Up</span></h6>
                        <input
                            className="checkbox"
                            type="checkbox"
                            id="chbox-log-sign"
                            name="log-sign-switch"
                        />
                        <label htmlFor="chbox-log-sign"></label>
                        <div className="card-3d-wrap">
                            <div className="card-3d-wrapper">
                                <div className="card-front">
                                    <div className="center-wrap">
                                        <div className="section text-center">
                                            <h4 className="mb-4 pb-3">Log In</h4>
                                            <div className="form-group">
                                                <input
                                                    type="email"
                                                    name="logemail"
                                                    className="form-style"
                                                    placeholder=""
                                                    id="logemail"
                                                    autoComplete="off"
                                                />
                                                <AtIcon className="input-icon uil uil-at"></AtIcon>
                                                <div className="cut"></div>
                                                <label htmlFor="logemail" className="placeholder text-3xl underline">Email</label>
                                            </div>
                                            <div className="form-group mt-4">
                                                <input
                                                    type="password"
                                                    name="logpass"
                                                    className="form-style"
                                                    placeholder="Your Password"
                                                    id="logpass"
                                                    autoComplete="off"
                                                />
                                                <LockOpen className="input-icon uil uil-lock-alt"></LockOpen>
                                            </div>
                                            <a href="#" className="btn">submit</a>
                                            <p>
                                                <a href="/admin" className="link">link to Admin</a>
                                                <NavLink to="/admin" >
                                                    NavLink to Admin
                                                </NavLink>
                                                <a href="#0" className="link">Forgot your password?</a>
                                            </p>
                                        </div>
                                    </div>
                                </div>
                                <div className="card-back">
                                    <div className="center-wrap">
                                        <div className="section text-center">
                                            <h4 className="mb-4 pb-3">Sign Up</h4>
                                            <div className="form-group">
                                                <input
                                                    type="text" name="logname"
                                                    className="form-style"
                                                    placeholder="Your Full Name"
                                                    id="signupname"
                                                    autoComplete="off"
                                                />
                                                <PermIdentity className="input-icon uil uil-user"></PermIdentity>
                                            </div>
                                            <div className="form-group mt-2">
                                                <input
                                                    type="email"
                                                    name="logemail"
                                                    className="form-style"
                                                    placeholder="Your Email"
                                                    id="signupemail"
                                                    autoComplete="off"
                                                />
                                                <AtIcon className="input-icon uil uil-at"></AtIcon>
                                            </div>
                                            <div className="form-group mt-2">
                                                <input
                                                    type="password"
                                                    name="logpass"
                                                    className="form-style"
                                                    placeholder="Your Password"
                                                    id="signuppass"
                                                    autoComplete="off"
                                                />
                                                <LockOpen className="input-icon uil uil-lock-alt"></LockOpen>
                                            </div>
                                            <a href="#" className="btn">submit</a>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </Grid>
        </Grid>
    </>);
}


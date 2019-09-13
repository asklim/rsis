/* eslint-disable react/prop-types*/
import React from "react";
import PropTypes from "prop-types";
import { Switch, Route /*, Redirect*/ } from "react-router-dom";

// creates a beautiful scrollbar
import PerfectScrollbar from "perfect-scrollbar";
import "perfect-scrollbar/css/perfect-scrollbar.css";

// @material-ui/core components
import withStyles from "@material-ui/core/styles/withStyles";

// core components
import Navbar from "components/Navbars/Navbar.jsx";
import Footer from "components/Footer/Footer.jsx";
import Sidebar from "components/Sidebar/Sidebar.jsx";
import FixedPlugin from "components/FixedPlugin/FixedPlugin.jsx";

import Whoops404 from "components/misc/Whoops404.jsx";
import routes from "./InvoiceRoutes.js";

import dashboardStyle from "assets/jss/layouts/dashboardStyle.jsx";

import image from "assets/img/sidebar-2.jpg";
import logo from "assets/img/reactlogo.png"; // must be an image

const switchRoutes = (
  <Switch>
    {routes.map((prop, key) => {
      if (prop.layout === "/invoice") {
        return (
          <Route
            path={prop.layout + prop.path}
            component={prop.component}
            key={key}
          />
        );
      }
      return null;
    })}
    <Route component={Whoops404} />
  </Switch>
);

class InvoiceBoard extends React.Component 
{
  constructor(props) 
  {
    super(props);
    this.state = {
      image: image,
      color: "blue",
      hasImage: true,
      fixedClasses: "dropdown",
      mobileOpen: false,
    };
  }

  handleImageClick = image => {
    this.setState({ image: image });
  };

  handleColorClick = color => {
    this.setState({ color: color });
  };

  handleFixedClick = () => {
    if(this.state.fixedClasses === "dropdown") {
      this.setState({ fixedClasses: "dropdown show" });
    } 
    else {
      this.setState({ fixedClasses: "dropdown" });
    }
  };

  handleDrawerToggle = () => {
    this.setState({ mobileOpen: !this.state.mobileOpen });
  };

  resizeFunction = () => {
    if (window.innerWidth >= 960) {
      this.setState({ mobileOpen: false });
    }
  };

  componentDidMount() {
    if (navigator.platform.indexOf("Win") > -1) {
      // eslint-disable-next-line no-unused-vars, react/no-string-refs
      const ps = new PerfectScrollbar(this.refs.mainPanel);
    }
    window.addEventListener("resize", this.resizeFunction);  
  }

  componentDidUpdate(e) {
    if (e.history.location.pathname !== e.location.pathname) {
      // eslint-disable-next-line react/no-string-refs
      this.refs.mainPanel.scrollTop = 0;
      if (this.state.mobileOpen) {
        this.setState({ mobileOpen: false });
      }
    }
  }

  componentWillUnmount() {
    window.removeEventListener("resize", this.resizeFunction);
  }

  render() 
  {
    const { classes, ...rest } = this.props;
    //console.log('InvoBoard ...rest : ', rest);

    return (
      <div className={classes.wrapper}>
        <Sidebar
          routes={routes}
          logoText={"Invoice Board"}
          logo={logo}
          image={this.state.image}
          handleDrawerToggle={this.handleDrawerToggle}
          open={this.state.mobileOpen}
          color={this.state.color}
          {...rest}
        />
        {/* eslint-disable-next-line react/no-string-refs */}
        <div className={classes.mainPanel} ref="mainPanel">
          <Navbar
            routes={routes}
            handleDrawerToggle={this.handleDrawerToggle}
            {...rest}
          />

            <div className={classes.content}>
              <div className={classes.container}>
                {switchRoutes}
              </div>
            </div>
       
          <Footer />
          <FixedPlugin
            handleImageClick={this.handleImageClick}
            handleColorClick={this.handleColorClick}
            bgColor={this.state["color"]}
            bgImage={this.state["image"]}
            handleFixedClick={this.handleFixedClick}
            fixedClasses={this.state.fixedClasses}
          />
        </div>
      </div>
    );
  }
}

InvoiceBoard.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(dashboardStyle)(InvoiceBoard);

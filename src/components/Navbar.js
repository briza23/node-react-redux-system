import PropTypes from 'prop-types'
import * as TransactionActions from "../actions/Transaction";
import React from "react";
import { connect } from "react-redux";
import {Row, Col, Button, Navbar, MenuItem, Nav, NavItem, NavDropdown} from "react-bootstrap";
class NavBar extends React.Component {
    render() {
        return (
            <Navbar className="navbar-color" inverse collapseOnSelect>
                <Navbar.Header>
                  <Navbar.Brand>
                    <img width="150px" src="logo.png"/>
                    <a href="#"></a>
                  </Navbar.Brand>
                  <Navbar.Toggle />
                </Navbar.Header>
                <Navbar.Collapse>
                  <Nav pullRight>
                  </Nav>
                </Navbar.Collapse>
            </Navbar>
        );
    }
}

NavBar.propTypes = {
};

function mapStateToProps(state) {
    return state;
}

const VisibleNavBar = connect(
    mapStateToProps,
    TransactionActions
)(NavBar);

export default VisibleNavBar;

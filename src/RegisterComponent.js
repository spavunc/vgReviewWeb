import React, { Component } from 'react'
import { Carousel, Row, Col, Container } from 'react-bootstrap';
import bcryptjs from 'bcryptjs';
import axios from 'axios';
import {Link} from "@reach/router";

class RegisterComponent extends Component {

    state = {
        username: '',
        password: '',
        email: ''
    }

    handleSubmit = async() =>{
        const saltRounds = 10;
        const salt = bcryptjs.genSaltSync(saltRounds);
        let hash = bcryptjs.hashSync(this.state.password, salt);
        hash = hash.replace(/\//g, "slash");
        await axios.post('http://localhost:8080/user/register?username=' + this.state.username 
            + "&password=" + hash + "&email=" + this.state.email).catch(
                //
            );
    }

    handleChange = (evt) =>{
        this.setState({
            ...this.state,
            [evt.target.name]: evt.target.value
        })
    }


    render() {
        return (
            <>  
                <form>
                    <Row>
                        <label> UserName:
                            <input type="text" name="username" value={this.state.username} onChange={this.handleChange}/>
                        </label>
                    </Row>
                    <Row>
                        <label> Password:
                            <input type="password" name="password" value={this.state.password} onChange={this.handleChange}/>
                        </label>
                    </Row>
                    <Row>
                        <label> Email:
                            <input type="email" name="email" value={this.state.email} onChange={this.handleChange}/>
                        </label>
                    </Row>
                    <Link to="/" className="btn btn-success" onClick={this.handleSubmit}>Submit</Link>
                </form>
            </>
        )
    }
}

export default RegisterComponent
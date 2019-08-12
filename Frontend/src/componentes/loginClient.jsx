import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import axios from 'axios'
import { Button, FormGroup, Input } from 'reactstrap';

import logo from '../logo.png'

import '../estilos/loginClient.css'

class LoginClient extends Component {
    constructor(props) {
        super(props);
        //console.log(props)
        this.state = {
            identificador: "",
            contrasena: "",
            conductor: "true",
            showPassword: true,
        };
        this.handleOnchange = this.handleOnchange.bind(this);
        this.enviarSolicitud = this.enviarSolicitud.bind(this)
        this.enviar = this.enviar.bind(this);

    }


    handleOnchange = input => e => {
        this.setState({ [input]: e.target.value });
    }

    enviarSolicitud() {
      const mensaje = {
        nick: this.state.identificador,
        clave: this.state.contrasena
        
      }
      //Axios se encarga de hacer solicitudes de forma sencilla
      axios.post('http://localhost:4000/cliente/login', mensaje)
      .then((response) => {
        alert(JSON.stringify(response.data))
      })
    }

    
    enviar() {
        /*
            let esConductor = (JSON.parse(this.state.conductor));
            if(this.state.identificador.match("^[0-9]+$")!=null){
              if(this.state.contrasena !== ""){
                const input = {
                  identificador: this.state.identificador, 
                  contrasena: this.state.contrasena,
                  conductor: false
                };
                let url = "http://"+ this.props.url +":4000/login";
                if(esConductor){
                  input.conductor = true;
                }
                const opciones = {
                  method: 'POST',  
                  body: JSON.stringify(input),  
                  headers:{
                    'Content-Type': 'application/json'
                  }
                };
                const request = new Request(url, opciones);
                this.setState({closedProgress: false})
                fetch(request).then(res => res.json())
                .then((response) => {
        
                  this.setState({closedProgress: true})
                  console.log('Exito:', JSON.stringify(response))
        
                  if (response.identificador) {
                    if(response.contrasena){
                      if(esConductor){
                        if(response.ocupado){
                          handleClick({message: "El taxi esta siendo usado!!"})
                        }else{
                          this.props.iniciarSesion({valor: esConductor, nombre: response.nombre, id:response.id, placa: response.placa});
                        }
                      }else{
                        if(response.ocupado){
                          handleClick({message: "La sesion ya esta iniciada"})
                        }else{
                          this.props.iniciarSesion({valor: esConductor, nombre: response.nombre, id:response.id});
                        }
                      }            
                    }else{
                      handleClick({message: "Contraseña incorrecta"})
                    }
                  }else{
                    handleClick({message: (esConductor)?
                                          "El Conductor no esta registrado":
                                          "El Pasajero no esta registrado"
                                        })
                  }
                }
                )
                .catch(error => {
                  console.log('Error:', error)
                  this.setState({closedProgress: true})
                  handleClick({message: "Error de red, intentelo mas tarde"})
                  });
        
              }else{
                handleClick({message: "La contraseña esta vacia"})
              }
            }else{
              handleClick({message: (esConductor)?
                          "El número de CEDULA es invalido":
                          "El número de CELULAR es invalido"
                          })
            } 
            */
    }

    render() {
        if (this.props.autenticado) {
            console.log("Esta logeado")

        }
        return (
            <div>
              <div id="espacio" />
              <div className="header-logo-login">
                <Link className="logo" to={"/"} ><img src={logo} alt=""/></Link>                
              </div>

                
                <div className="card card-1">
                    <div className="card-heading">
                    </div>
                    <div id="formularioLogin">
                        <h2>Iniciar Sesión</h2>
                        <br />
                        <FormGroup>
                        <i className="fa fa-user"></i>
                            <Input type="email" name="email"
                                onChange={this.handleOnchange('identificador')}
                                placeholder="Usuario" 
                                />

                        </FormGroup>
                        <br />
                        <FormGroup>
                        <i className="fa fa-lock"></i>
                            <Input type="password" name="password"
                                onChange={this.handleOnchange('contrasena')}
                                placeholder="contrasena" />

                        </FormGroup>
                        <br />
                        <Button color="danger" block onClick={this.enviarSolicitud}>INGRESAR</Button>{' '}

                        <br /><br />
                        <span className="mensajito">¿Aun sin cuenta? <Link to={"/registro"} >registrare aqui</Link></span>
                    </div>
                </div>
            </div>
        );
    }
}

export default LoginClient;
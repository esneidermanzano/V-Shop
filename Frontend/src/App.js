import React, {Component} from 'react';
import jwt from 'jsonwebtoken'

import { BrowserRouter, Route, Redirect, Link, Switch } from 'react-router-dom'
import { Fade } from 'reactstrap';

import Admon from './componentes/admon/Dashboard'
import LoginAdmon from './componentes/admon/LoginAdmon'
import Cliente from './componentes/cliente/Dashboard'
import LoginCliente from './componentes/cliente/LoginClient'

import Header from './componentes/principal/Header'
import Main from './componentes/principal/Main'
import Footer from './componentes/principal/Footer'
import Regitro from './componentes/principal/Registro'
import ProductPage from './componentes/principal/ProductPage'
import { ProductoProvider } from './componentes/principal/Context'

import logo from './imagenes/logo-black.png'
import 'bootstrap/dist/css/bootstrap.min.css';

const BlackLogo = () =>{
    return(
        <div className="header-logo-black">
            <Link className="logo" to={"/"} ><img src={logo} alt=""/></Link>                
        </div>
    )
}

//En esta parte renderizamos lo prinipal
class App extends Component {
    constructor(props){
        super(props)
        this.state = {

            clienteLogueado: false,
            idCliente: "",
            nickCliente: "",   

            adminLogueado: true,
            idAdmin: "",
            nickAdmin: "",

            managerLogueado: true,
            idManager: "",
            nickManager: "",
        };
        this.handleChangeLoggin = this.handleChangeLoggin.bind(this)
    }

    componentDidMount(){
        const token = localStorage.getItem('token-login')
        if(token){ 
            const nombre = jwt.verify(token, 'tugfaide').nick    
            const id = jwt.verify(token, 'tugfaide').id_usuario    
            this.setState({
                clienteLogueado: true,
                nickCliente: nombre,
                idCliente: id
              })              
        }
    }

    handleChangeLoggin(valor, usuario){
        if(valor===0){
            if(this.state.clienteLogueado){
                localStorage.removeItem('token-login')
                this.setState({
                    clienteLogueado:false,
                    nickCliente: "",
                    idCliente: ""
                })
            }else{
                const token = {id_usuario: usuario.id_usuario, nick: usuario.nick}            
                localStorage.setItem('token-login', jwt.sign(token, 'tugfaide'))  
                this.setState({
                    clienteLogueado: true,
                    nickCliente: usuario.nick,
                    idCliente: usuario.id_usuario
                })
            }           
        }else if(valor===1){
            this.setState({
                adminLogueado: !this.state.adminLogueado,
                idAdmin: usuario.id_usuario,
                nickAdmin: usuario.nick
            })
        }else{
            this.setState({
                managerLogueado: !this.state.managerLogueado,
                idManager: usuario.id_usuario,
                nickManager: usuario.nick
            })
        }         
    }

render(){
    
    const propiedades={
        tipo_documento: "CC",
        numero_documento: "",
        nombres: "",
        apellidos: "",
        telefono: "",
        direccion: "",
        fecha_de_nacimiento: "",
        correo: "",           
        nick: "",
        clave: "",
    };

    return (
        //En react, para dar estilos CSS usamos className en lugar de class
        <div className="App" >
            <BrowserRouter>
                <Switch>                

                    <Route  path="/admin" render={({location}) =>
                        this.state.adminLogueado ?
                        <Admon isAdmin={true}
                            location={location}
                            userId={this.state.idAdmin}
                            userNick={this.state.nickAdmin}
                        /> :
                        <LoginAdmon isAdmin={true}
                            login={this.handleChangeLoggin}                                                        
                        />
                    }/>

                    <Route path="/manager" render={({location}) => 
                        this.state.managerLogueado ? 
                        <Admon isAdmin={false}
                            location={location}
                            userId={this.state.idManager}
                            userNick={this.state.nickManager}
                        /> :
                        <LoginAdmon isAdmin={false}                    
                            login={this.handleChangeLoggin}
                        />
                    }/>                    
                
                    <Route path="/registro" render={() => 
                        this.state.clienteLogueado ?
                        <Redirect to="/" /> : 
                        (<Fade in={true} id="registro"> 
                            <BlackLogo/> 
                            <div id="registro-container">                    
                                <Regitro isManager={false}
                                actualizar={false}
                                datos={propiedades}
                                mensaje={"REGISTRARME"}                             
                                />                                
                            </div>
                        </Fade>
                    )}/>                    
                    
                    <Route path="/login" render={() => 
                        this.state.clienteLogueado ? 
                        <Redirect to="/cliente"/> :
                        (<Fade in={true} id="login">
                            <BlackLogo/>                                         
                            <LoginCliente login={this.handleChangeLoggin}/>
                        </Fade>                        
                    )}/>

                    {/*Aplicando patron singleton para el Header*/}
                    <Route path="/" render={() =>(
                        <div className="body-ctn">
                            <ProductoProvider>
                            <Fade in={true} >
                                <Header                     
                                    nombre={this.state.nickCliente}
                                    login={this.handleChangeLoggin}                                 
                                    logueado={this.state.clienteLogueado}                         
                                />                                       
                                <Switch>
                                    <Route path="/cliente" render={({location}) =>
                                        this.state.clienteLogueado ? 
                                        (<Cliente location = {location}
                                            idCliente={this.state.idCliente}                                                                    
                                        />) : <Redirect to="/login" />
                                                                       
                                    }/>

                                    <Route path="/producto/:id_producto" render={() => 
                                            <ProductPage/>  
                                    }/>

                                    <Route exact path="/" render={() =>
                                        <Main/>  
                                    }/>

                                    <Route render={() => (<h1>Pagina no encontrada</h1>)} />
                                </Switch>  
                                <Footer/>  
                            </Fade> 
                            </ProductoProvider>                           
                        </div>
                    )}/>                
                   
                </Switch>
            </BrowserRouter>
        </div>
    );
}
}
export default App;
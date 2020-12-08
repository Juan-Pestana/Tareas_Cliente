import React, {useState, useContext, useEffect} from 'react'
import {Link} from 'react-router-dom'
import AlertaContext from '../../context/alertas/alertasContext'
import AuthContext from '../../context/autenticacion/authContext'

const Login = (props) => {


        //extraer los valores del context
        const alertaContext = useContext(AlertaContext)
        const {alerta, mostrarAlerta} = alertaContext
    
        const authContext = useContext(AuthContext)
        const { mensaje, iniciarSesion, autenticado} = authContext



    useEffect(()=>{

        if (autenticado){
            props.history.push('/proyectos')
        }
        if (mensaje) {
            mostrarAlerta(mensaje.msg, mensaje.categoria)
        }

    },[mensaje, autenticado, props.history])

    const [usuario, setUsuario] = useState({
        email: '',
        password: ''
    })



const {email, password} = usuario

const onChange = e =>{
    setUsuario({
        ...usuario, 
        [e.target.name] : e.target.value
    })
}

const onSubmit = e =>{
    e.preventDefault()

    //validar no vacios
    if(email.trim() === '' || password.trim() === ''){
        mostrarAlerta('Todos los campos son obligatorios', 'alerta-error')
    }

    //pasar al action
    iniciarSesion({email, password})

}

    return (
        <div className="form-usuario">
            {alerta? (<div className={`alerta ${alerta.categoria}`}>{alerta.msg}</div>) : null}
            <div className="contenedor-form sombra-dark">
                <h1>Iniciar Sesión</h1>
                <form onSubmit={onSubmit}>
                    <div className="campo-form">
                        <label htmlFor="email">Email</label>
                        <input type="email"
                            id='email'
                            name='email'
                            value={email}
                            placeholder='Tu Email'
                            onChange={onChange}
                        />
                    </div>
                    <div className="campo-form">
                        <label htmlFor="password">Password</label>
                        <input type="password"
                            id='password'
                            name='password'
                            value={password}
                            placeholder='Password'
                            onChange={onChange}
                        />
                    </div>
                    <div className="campo-form">
                        <input type="submit" className="btn btn-primario btn-block" value='Iniciar Sesión'/>
                    </div>
                </form>
                <Link to='/registro' className='enlace-cuenta'>Obtener nueva cuenta</Link>
            </div>
        </div>
    )
}

export default Login
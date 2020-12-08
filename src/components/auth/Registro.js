import React, {useState, useContext, useEffect} from 'react'
import {Link} from 'react-router-dom'
import AlertaContext from '../../context/alertas/alertasContext'
import AuthContext from '../../context/autenticacion/authContext'




const Registro = (props) => {

    //extraer los valores del context
    const alertaContext = useContext(AlertaContext)
    const {alerta, mostrarAlerta} = alertaContext

    const authContext = useContext(AuthContext)
    const {registrarUsuario, mensaje, autenticado} = authContext

//en el caso de que el usuario se haya registrado o sea un registro duplicado,

    useEffect(()=>{

        if (autenticado){
            props.history.push('/proyectos')
        }
        if (mensaje) {
            mostrarAlerta(mensaje.msg, mensaje.categoria)
        }

    },[mensaje, autenticado, props.history])

// State para realizar el registro
    const [usuario, setUsuario] = useState({
        email: '',
        password: '',
        nombre: '',
        confirmar: '',
    })

//extraemos los valores de usuario
    const {email, password, nombre, confirmar} = usuario

//actualizamos el State con el input del usuario
    const onChange = e =>{
        setUsuario({
            ...usuario, 
            [e.target.name] : e.target.value
        })
    }
//Envíamos la solicitud de registro de usuario
    const onSubmit = e =>{
        e.preventDefault()


        //rellena todos los campos
        if(nombre.trim() === "" || password.trim() === '' || email.trim() === '' || confirmar.trim() === ''){
            mostrarAlerta('todos los campos son obligatorios', 'alerta-error' )
            return
        }
        //el password de al menos 6 caracteres
        if(password.length < 6){
            mostrarAlerta('El password debe tener al menos 6 caracteres', 'alerta-error')
            return
        }
        // password y confirmación del password
        if(password !== confirmar){
            mostrarAlerta('Revisa que ambos password sean iguales', 'alerta-error')
            return
        }

        //llamar al Action (llamada a la API para crear usuario)

        registrarUsuario({
            nombre,
            email,
            password
        })



    }

    return (
        <div className="form-usuario">
            {alerta? (<div className={`alerta ${alerta.categoria}`}>{alerta.msg}</div>) : null}
            <div className="contenedor-form sombra-dark">
                <h1>Registro Usuario</h1>
                <form onSubmit={onSubmit}>
                    <div className="campo-form">
                        <label htmlFor="nombre">Nombre Usuario</label>
                        <input type="text"
                            id='nombre'
                            name='nombre'
                            value={nombre}
                            placeholder='Tu Nombre'
                            onChange={onChange}
                        />
                    </div>
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
                            placeholder='Indica tu Password'
                            onChange={onChange}
                        />
                    </div>
                    <div className="campo-form">
                        <label htmlFor="confirmar">Confirmar Password</label>
                        <input type="password"
                            id='confirmar'
                            name='confirmar'
                            value={confirmar}
                            placeholder='Vuelve a indicar Password'
                            onChange={onChange}
                        />
                    </div>
                    <div className="campo-form">
                        <input type="submit" className="btn btn-primario btn-block" value='Registrarme'/>
                    </div>
                </form>
                <Link to='/' className='enlace-cuenta'>Volver a Iniciar Sesión</Link>
            </div>
        </div>
    )
}

export default Registro
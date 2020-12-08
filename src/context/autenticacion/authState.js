import React, {useContext, useReducer} from 'react'
import AuthContext from './authContext'
import AuthReducer from './authReducer'
import tokenAuth from '../../config/tokenAuth'

import {
    REGISTRO_OK,
    REGISTRO_ERROR,
    OBTENER_USUARIO,
    LOGIN_OK,
    LOGIN_ERROR,
    CERRAR_SESION,
} from '../../types'
import authContext from './authContext'

import clienteAxios from '../../config/axios'

const AuthState = props =>{
    const initialState = {
        token: localStorage.getItem('token'),
        autenticado: null,
        usuario: null,
        mensaje: null,
        cargando: true

    }

    const [ state, dispatch] = useReducer(AuthReducer, initialState)

    const registrarUsuario = async datos =>{

        try {
            const respuesta = await clienteAxios.post('/api/usuarios', datos)

            console.log(respuesta)

            dispatch({
                type: REGISTRO_OK,
                payload: respuesta.data
            })

        usuarioAutenticado()


        } catch (error) {
            const alerta = {
                msg: error.response.data.msg,
                categoria: 'alerta-error'
            }
            dispatch({
                type: REGISTRO_ERROR,
                payload: alerta
            })
        }
    }

    const usuarioAutenticado = async () =>{
        const token = localStorage.getItem('token');
        if (token){
            tokenAuth(token)

        }

        try {
            const respuesta = await clienteAxios.get('/api/auth')
            dispatch({
                type: OBTENER_USUARIO,
                payload: respuesta.data.usuario
            })


        } catch (error) {
            console.log(error)
            dispatch({
                type: LOGIN_ERROR
            })
            
        }

    }

    //cuando el usuario inicia sesion

    const iniciarSesion = async datos =>{

        try {
            const respuesta = await clienteAxios.post('/api/auth', datos);
            
            dispatch({
                type: LOGIN_OK,
                payload: respuesta.data
            })
            //T
            usuarioAutenticado()

        } catch (error) {
            console.log(error.response.data)
            const alerta = {
                msg: error.response.data.errores[0].msg,
                categoria: 'alerta-error'
            }
            dispatch({
                type: LOGIN_ERROR,
                payload: alerta
            })
        }

    }

    const cerrarSesion = () =>{
        dispatch({
            type: CERRAR_SESION
        })
    }


    return (
        <AuthContext.Provider
            value={{
                token: state.token,
                autenticado: state.autenticado,
                usuario: state.usuario,
                mensaje: state.mensaje,
                cargando: state.cargando,
                registrarUsuario,
                iniciarSesion,
                usuarioAutenticado,
                cerrarSesion

            }}>
            {props.children}
        </AuthContext.Provider>

    )

}

export default AuthState
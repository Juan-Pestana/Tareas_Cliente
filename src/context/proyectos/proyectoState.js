import React, { useReducer } from 'react'
import proyectoContext from './proyectoContext'
import proyectoReducer from './proyectoReducer'



import  {FORMULARIO_PROYECTO,
        OBTENER_PROYECTOS,
        AGREGAR_PROYECTO,
        VALIDAR_FORMULARIO,
        PROYECTO_ACTUAL,
        ELIMINAR_PROYECTO,
        PROYECTO_ERROR} from '../../types'

import clienteAxios from '../../config/axios'




const ProyectoState = props =>{


    const initialState = {
        proyectos : [],
        formulario : false,
        errorFormulario: false,
        proyecto: null,
        mensaje: null
    }

        const [state, dispatch] = useReducer(proyectoReducer, initialState)

        const mostrarFormulario = () => {
            dispatch({
                type: FORMULARIO_PROYECTO
            })
        }

        const obtenerProyectos = async () =>{
            
            try {
                
                const resultado = await clienteAxios.get('/api/proyecto')
                console.log(resultado)

                dispatch({
                    type: OBTENER_PROYECTOS,
                    payload: resultado.data.proyectos
                })

            } catch (error) {
                const alerta ={
                    msg: 'Hubo un error al obtener los proyectos',
                    categoria: 'alerta-error'
                }
                dispatch({
                    type: PROYECTO_ERROR,
                    payload: alerta
                })
            }
        }

        const crearProyecto = async proyecto =>{
            
            try {
                const resultado = await clienteAxios.post('/api/proyecto', proyecto)
                
                dispatch({
                    type: AGREGAR_PROYECTO,
                    payload: resultado.data
                })

            } catch (error) {
                const alerta ={
                    msg: 'Hubo un error al crear el proyecto',
                    categoria: 'alerta-error'
                }
                dispatch({
                    type: PROYECTO_ERROR,
                    payload: alerta
                })
            }

       
        }

        const mostrarError = () =>{
            dispatch({
                type: VALIDAR_FORMULARIO
            })
        }

        const proyectoActual = proyectoID =>{
            dispatch({
                type: PROYECTO_ACTUAL,
                payload: proyectoID
            })
        }

        const elminarProyecto = async proyectoId =>{
           
            try {

                await clienteAxios.delete(`/api/proyecto/${proyectoId}`)
                
                dispatch({
                    type: ELIMINAR_PROYECTO,
                    payload: proyectoId
                })
            } catch (error) {
                const alerta ={
                    msg: 'Hubo un error al eliminar proyecto',
                    categoria: 'alerta-error'
                }
                dispatch({
                    type: PROYECTO_ERROR,
                    payload: alerta
                })
            }
        }



        return(
            <proyectoContext.Provider
                value={{
                    proyectos: state.proyectos,
                    formulario: state.formulario,
                    errorFormulario: state.errorFormulario,
                    proyecto: state.proyecto,
                    mensaje: state.mensaje,
                    mostrarFormulario,
                    obtenerProyectos,
                    crearProyecto,
                    mostrarError,
                    proyectoActual,
                    elminarProyecto
                }}
            >

                {props.children}
            </proyectoContext.Provider>
        )

}

export default ProyectoState
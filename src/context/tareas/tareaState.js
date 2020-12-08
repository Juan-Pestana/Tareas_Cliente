import React, { useReducer } from 'react'
import TareaContext from './tareaContext'
import TareaReducer from './tareaReducer'

import { TAREAS_PROYECTO,
        CREAR_TAREA,
        VALIDAR_TAREA,
        ELIMINA_TAREA,
 
        TAREA_ACTUAL,
        ACTUALIZAR_TAREA
        } from '../../types'

import clienteAxios from '../../config/axios'


const TareaState = props =>{
    const initialState ={
        
        tareasProyecto : [],
        errorTarea : false,
        tareaSeleccionada: null
    }

    const [state, dispatch] = useReducer(TareaReducer, initialState)

    //crear funciones

    //obtener tareas de un proyecto
    const obtenerTareas = async proyecto =>{

        try {
           const resultado = await clienteAxios.get('/api/tareas', {params: {proyecto}})
        //    console.log(resultado)
            dispatch({
                type: TAREAS_PROYECTO,
                payload: resultado.data.tareas
            })
        } catch (error) {
            console.log(error)
        }
        
    }

    const crearTarea = async tarea =>{

        try {
            const resultado = await clienteAxios.post('/api/tareas', tarea)
            // console.log(resultado)
        } catch (error) {
            console.log(error)
        }

        dispatch({
            type: CREAR_TAREA,
            payload: tarea
        })
    }

    const validarTarea = () =>{
        dispatch({
            type: VALIDAR_TAREA,

        })
    }

    const eliminarTarea = async (tareaId, proyecto) =>{

        try {
            
            await clienteAxios.delete(`api/tareas/${tareaId}`, {params: {proyecto}})

            dispatch({
                type: ELIMINA_TAREA,
                payload: tareaId
            })

        } catch (error) {
            console.log(error)
        }

    }



    const actualizarTarea = async tarea =>{
        try {
            
            const resultado = await clienteAxios.put(`api/tareas/${tarea._id}`, tarea)
            // console.log(resultado.data.tareaActual)

            dispatch({
                type: ACTUALIZAR_TAREA,
                payload: resultado.data.tareaActual
            })

        } catch (error) {
            console.log(error)
        }
     
    }

    const guardarTareaActual = tarea =>{
        dispatch({
            type: TAREA_ACTUAL,
            payload: tarea
        })
    }




    return (
        <TareaContext.Provider
                value={{
                    
                    tareasProyecto: state.tareasProyecto,
                    errorTarea: state.errorTarea,
                    tareaSeleccionada: state.tareaSeleccionada,
                    obtenerTareas,
                    crearTarea,
                    validarTarea,
                    eliminarTarea,
                    guardarTareaActual,
                    actualizarTarea
                }}>


            {props.children}
        </TareaContext.Provider>
    )
}

export default TareaState
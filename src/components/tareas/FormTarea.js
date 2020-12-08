import React, {useContext, useState, useEffect} from 'react'
import proyectoContext from '../../context/proyectos/proyectoContext'
import tareaContext from '../../context/tareas/tareaContext'


const FormTarea = () => {

    const proyectosContext = useContext(proyectoContext)
    const {proyecto} = proyectosContext

    const tareasContext = useContext(tareaContext)
    const {errorTarea, crearTarea, validarTarea, obtenerTareas, tareaSeleccionada, actualizarTarea} = tareasContext

    const [tarea, setTarea] = useState({
        nombre: '',
    })

    useEffect(()=>{
        if(tareaSeleccionada !== null){
            setTarea(tareaSeleccionada)
        }else{
            setTarea({
                nombre: "",
            })
        }


    },[tareaSeleccionada])

    const {nombre} = tarea

    if (!proyecto){
        return null}

    const [proyectoActual] = proyecto 

    const onSubmitTarea = async e =>{
        e.preventDefault()

        //validación de tarea
        if (nombre.trim() === ''){
            validarTarea()
            return
        }

        if(!tareaSeleccionada){
            //agregar tarea al state principal de tareas
            tarea.proyecto = proyectoActual._id

             await crearTarea(tarea)

            
            

        } else{

            actualizarTarea(tarea)

        }


        //filtra y renderiza las tareas concretas del proyecto seleccionado
        obtenerTareas(proyectoActual._id)

        setTarea({
            nombre: ''
        })


    }



    const handleChange = e =>{
        setTarea({
            ...tarea,
            [e.target.name] : e.target.value
        })
    }

    return (
        <div className="formulario">
            <form onSubmit={onSubmitTarea}>
                <div className="contenedor-input">
                    <input type="text" 
                    className="input-text" 
                    name='nombre' 
                    value = {nombre}
                    onChange = {handleChange}
                    placeholder='Nombre de la tarea...'/>
                </div>
                <input type="submit"
                value={tareaSeleccionada ? 'Editar Tarea' : 'Agregar Tarea'}
                className="btn btn-primario btn-submit btn-block"/>
            </form>
            {errorTarea ? <h3 className= 'mensaje error'>el nombre de la tarea es obligatorio</h3> : null}
        </div>
    )
}

export default FormTarea

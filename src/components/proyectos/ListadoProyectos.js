import React, { useContext, useEffect } from 'react'
import Proyecto from './Proyecto'
import proyectoContext from '../../context/proyectos/proyectoContext'
import AlertaContext from '../../context/alertas/alertasContext'
import {CSSTransition, TransitionGroup} from 'react-transition-group'
import {uuid} from 'uuidv4'
import { MOSTRAR_ALERTA } from '../../types'

const ListadoProyectos = () => {

    const proyectosContext = useContext(proyectoContext)
    const {proyectos, obtenerProyectos, mensaje} = proyectosContext

    const alertaContext = useContext(AlertaContext)
    const {alerta, mostrarAlerta} = alertaContext

    useEffect(() => {

        if(mensaje) {
            mostrarAlerta(mensaje.msg, mensaje.categoria)
        }

        obtenerProyectos()
    }, [mensaje])

    
    if (proyectos.length === 0) return <h3>No hay Proyectos, comienza creando uno.</h3>

    

    return (
        <ul className="listado-proyectos">
            { alerta ? <div className={`alerta ${alerta.categoria}`}>{alerta.mensaje}</div>: null}
            <TransitionGroup>
                {proyectos.map(proyecto =>
                <CSSTransition
                key={proyecto._id}
                timeout={200}
                classNames='proyecto'>
                    <Proyecto  proyecto={proyecto}/>
                </CSSTransition>
                ) }

            </TransitionGroup>
        </ul>
    )
}

export default ListadoProyectos

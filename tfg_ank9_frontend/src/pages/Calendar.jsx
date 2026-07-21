import React, { useState, useEffect } from 'react'
import Header from '../components/Header'
import FullCalendar from '@fullcalendar/react'
import dayGridPlugin from '@fullcalendar/daygrid'
import interactionPlugin from '@fullcalendar/interaction'
import Footer from '../components/Footer'
import api from '../api/axios';
import Loading from '../components/Loading'
import ModalAddDogToEvent from '../components/ModalAddDogToEvent'
import EditDeleteEvent from '../components/EditDeleteEvent'
import CreateEvent from '../components/CreateEvent'
import timeGridPlugin from '@fullcalendar/timegrid'
import AddButton from '../components/AddButton'
import useDeviceType from '../hooks/useDeviceType'

export default function Calendar() {

    const[events, setEvents] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const [isAddingDog, setIsAddingDog] = useState(false);
    const [isEditEvent, setIsEditEvent] = useState(false);
    const [isCreateEvent, setIsCreateEvent] = useState(false);
    const [selectedEvent, setSelectedEvent] = useState(null);
    const roles = sessionStorage.getItem('role');
    const isAdmin = roles?.includes('ROLE_ADMIN');

    /* Para la vista movil del calendario */
    const { isMobile } = useDeviceType();

    useEffect (() => {

        const fetchEvents = async () => {

            setIsLoading(true);

            try {

                const response = await api.get('/events')

                // Hacemos un map para ponerlo como quiero la lbreria de el calendario
                const mapped = response.data.member.map(event => ({
                    id: event.id,
                    title: event.service.name,
                    start: event.dateTime,
                    extendedProps: {
                        capacity: event.capacity,
                        enrolled: event.dogs.length,
                        serviceId: event.service.id,
                    }
                }))
                // y lo seteamos en en estado
                setEvents(mapped);
                
            } catch (error) {
                
            } finally {
                setIsLoading(false);
            }

        }

        // Hay que llamar al fetch
        fetchEvents();

    }, [])

  return (
    <>
        {/* Estilos para el calendario ya que no acepta tailwind */}
        <style>{`
            .fc-event-title { font-size: 10px; color: white; }
            .fc-col-header-cell-cushion { color: white; }
            .fc-col-header-cell { background-color: #1c2230; }
            .fc-daygrid-day-number { color: white; }
            .fc-toolbar-title { color: white; }
            .fc-event { cursor: pointer; }
            .fc-daygrid-event { width: 100%; }
            .fc-toolbar { gap: 8px; flex-wrap: wrap; }
            .fc-toolbar-chunk { display: flex; gap: 4px; }
            .fc-button { padding: 4px 10px !important; }
        `}</style>

        <div className='bg-[#1c2230] min-h-screen'>
        
            <Header>
                <div className='gap-5 flex items-center justify-center'>

                    <div>
                        {isAdmin && (
                            <AddButton add={() => setIsCreateEvent(true)}><p>Crear evento</p></AddButton>
                        )}
                    </div>
              
                    <div>
                        {/* Children para cuando esta en tablet o escritorio */}
                        <p className='font-bold text-3xl mt-5 hidden md:block'>Apuntate a nuestras clases guiadas</p>
                        <p className='hidden md:block text-2xl'>Y mira como avanza tu mascota</p>
                    </div>        
                
                </div>
                
                {/* Children para cuando esta en movil */}
                <p className='block md:hidden text-center'>
                Calendario
                </p>
            </Header>
        
            <div className='w-[70%] m-auto mb-5 mt-8 flex flex-col'>

                {
                    isMobile ? 
                        <FullCalendar
                        plugins={[dayGridPlugin, interactionPlugin, timeGridPlugin]}
                        initialView={"dayGridDay"}
                        slotMinTime="08:00:00"
                        slotMaxTime="22:00:00"
                        height="auto"
                        locale="es"
                        firstDay={1}
                        // Ponemos los eventos del estado
                        events={events}
                        // Dateclick es para el onclick en el recuadro de la fecha, es otra propiedad que no vamos a utilizar
                        //EventClick es para el onclick en el evento cuando hay evento
                        eventClick={(info) => {
                            if (isAdmin) {
                                setIsEditEvent(true)
                                setSelectedEvent({
                                    id: info.event.id,
                                    date: info.event.startStr,
                                    capacity: info.event.extendedProps.capacity,
                                    serviceId: info.event.extendedProps.serviceId,
                                });
                            } else {
                                setIsAddingDog(true);
                            }
                        }}
                        // Para que el titulo apareza al mantener el cursor encima
                        eventDidMount={(info) => {
                            info.el.title = info.event.title
                        }}
                        eventContent={(arg) => {
                            // Aqui se van a restar la capacidad a los perros apuntados para darnos las plazas libres
                            const free = arg.event.extendedProps.capacity - arg.event.extendedProps.enrolled;
                            return (
                                <div 
                                    className='text-white text-[10px] p-1 truncate pointer-events-none'
                                    >
                                    <p className='font-bold truncate'>{arg.event.title}</p>
                                    <p>{arg.event.start.toLocaleTimeString('es-ES', {hour: '2-digit', minute: '2-digit'})}</p>
                                    <p>{free} plazas libres</p>
                                </div>
                            )
                        }}
                    />
                :
                    <FullCalendar
                        plugins={[dayGridPlugin, interactionPlugin, timeGridPlugin]}
                        initialView={"dayGrid"}
                        views={{
                            dayGrid: {
                                duration: { weeks: 2 }
                            }
                        }}
                        slotMinTime="08:00:00"
                        slotMaxTime="22:00:00"
                        height="auto"
                        locale="es"
                        firstDay={1}
                        // Ponemos los eventos del estado
                        events={events}
                        // Dateclick es para el onclick en el recuadro de la fecha, es otra propiedad que no vamos a utilizar
                        //EventClick es para el onclick en el evento cuando hay evento
                        eventClick={(info) => {
                            if (isAdmin) {
                                setIsEditEvent(true)
                                setSelectedEvent({
                                    id: info.event.id,
                                    date: info.event.startStr,
                                    capacity: info.event.extendedProps.capacity,
                                    serviceId: info.event.extendedProps.serviceId,
                                });
                            } else {
                                setIsAddingDog(true);
                            }
                        }}
                        // Para que el titulo apareza al mantener el cursor encima
                        eventDidMount={(info) => {
                            info.el.title = info.event.title
                        }}
                        eventContent={(arg) => {
                            // Aqui se van a restar la capacidad a los perros apuntados para darnos las plazas libres
                            const free = arg.event.extendedProps.capacity - arg.event.extendedProps.enrolled;
                            return (
                                <div 
                                    className='text-white text-[10px] p-1 truncate pointer-events-none'
                                    >
                                    <p className='font-bold truncate'>{arg.event.title}</p>
                                    <p>{arg.event.start.toLocaleTimeString('es-ES', {hour: '2-digit', minute: '2-digit'})}</p>
                                    <p>{free} plazas libres</p>
                                </div>
                            )
                        }}
                    />
                }

            </div>
        
            <Footer></Footer>

            {isLoading && (
              <Loading>Cargando eventos...</Loading>
            )}

            {isAddingDog && (
                <ModalAddDogToEvent closeModal={setIsAddingDog}></ModalAddDogToEvent>
            )}

            {isEditEvent && (
                <EditDeleteEvent closeModal={setIsEditEvent} event={selectedEvent}></EditDeleteEvent>
            )}

            {isCreateEvent && (
                <CreateEvent closeModal={setIsCreateEvent}></CreateEvent>
            )}
        
        </div>
    </>
  )
}

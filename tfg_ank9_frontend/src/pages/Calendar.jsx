import React, { useState, useEffect } from 'react'
import Header from '../components/Header'
import FullCalendar from '@fullcalendar/react'
import dayGridPlugin from '@fullcalendar/daygrid'
import interactionPlugin from '@fullcalendar/interaction'
import Footer from '../components/Footer'
import api from '../api/axios';

export default function Calendar() {

    const[events, setEvents] = useState([]);

    useEffect (() => {

        const fetchEvents = async () => {

            try {

                const response = await api.get('/events')
                console.log(response.data)

                // Hacemos un map para ponerlo como quiero la lbreria de el calendario
                const mapped = response.data.member.map(event => ({
                    id: event.id,
                    title: event.service.name,
                    date: event.dateTime,
                }))
                // y lo seteamos en en estado
                setEvents(mapped);
                
            } catch (error) {
                
            }

        }

        // Hay que llamar al fetch
        fetchEvents();

    }, [])

  return (
    <div className='bg-[#1c2230] min-h-screen'>

        <Header>
            <div className='gap-5'>
          
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

        <div className='w-[70%] m-auto mb-5'>
            <FullCalendar
            plugins={[dayGridPlugin, interactionPlugin]}
            initialView="dayGridMonth"
            aspectRatio={2.5}
            // Ponemos los eventos del estado
            events={events}
            dateClick={(info) => console.log('Click en día:', info.dateStr)}
            eventClick={(info) => console.log('Click en evento:', info.event.title)}
        />
        </div>

        <Footer></Footer>

    </div>
  )
}

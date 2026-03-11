import { useState, useEffect } from 'react';

interface calendarProp {
    setDate: (date: string) => void
}

function Calendar({ setDate }: calendarProp) {
    const [selectedDate, setSelectedDate] = useState<string>("");

    // Funzione per generare un array di date (es. 15 giorni a cavallo di oggi)
    const generateDates = () => {
        const dates = [];
        for (let i = -7; i <= 7; i++) {
            const d = new Date();
            d.setDate(d.getDate() + i);
            
            // Formattazione gg-mm-yyyy
            const day = String(d.getDate()).padStart(2, '0');
            const month = String(d.getMonth() + 1).padStart(2, '0');
            const year = d.getFullYear();
            
            dates.push(`${day}-${month}-${year}`);
        }
        return dates;
    };

    const dates = generateDates();

    // Impostiamo la data odierna come predefinita all'avvio
    useEffect(() => {
        const today = new Date();
        const formattedToday = `${String(today.getDate()).padStart(2, '0')}-${String(today.getMonth() + 1).padStart(2, '0')}-${today.getFullYear()}`;
        setSelectedDate(formattedToday);
        setDate(formattedToday);
    }, [setDate]);

    const handleDateClick = (date: string) => {
        setSelectedDate(date);
        setDate(date);
    };

    return (
        <nav className="calendar-container">
            <ul className="calendar-list">
                {dates.map((date) => (
                    <li 
                        key={date} 
                        className={`calendar-item ${selectedDate === date ? 'active' : ''}`}
                        onClick={() => handleDateClick(date)}
                    >
                        {date}
                    </li>
                ))}
            </ul>
        </nav>
    );
}

export default Calendar;
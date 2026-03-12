import Calendar from "./Calendar"
import "./Navbar.css"

interface NavBarProps {
    view: (view: string) => void
    date: (date: string) => void
    currentView: string
}

function NavBar({ view, date, currentView }: NavBarProps) {
    return (
        <div>
            <Calendar setDate={date} />
            <div className="view-menu">
                <span 
                    className={currentView === "all" ? "active" : ""} 
                    onClick={() => view("all")}
                >All</span>
                <span 
                    className={currentView === "completed" ? "active" : ""} 
                    onClick={() => view("completed")}
                >Completed</span>
                <span 
                    className={currentView === "not-completed" ? "active" : ""} 
                    onClick={() => view("not-completed")}
                >Not Completed</span>
            </div>
        </div>
    )
}
export default NavBar
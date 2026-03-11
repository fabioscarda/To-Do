import Calendar from "./Calendar"
import "./Navbar.css"

interface NavBarProps{
    view: (view: string) => void
    date: (date: string) => void
 }

function NavBar({ view, date }: NavBarProps){
    return(
        <>
            <Calendar setDate={date}/>
            <div className="view-menu">
                <span>All</span>
                <span>Completed</span>
                <span>Not Completed</span>
            </div>
        </>
    )
}
export default NavBar

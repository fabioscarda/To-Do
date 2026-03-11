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
                <span onClick={() => view("all")}>All</span>
                <span onClick={() => view("completed")}>Completed</span>
                <span onClick={() => view("not-completed")}>Not Completed</span>
            </div>
        </>
    )
}
export default NavBar

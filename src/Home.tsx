
import Progessbar from "./components/base/Progressbar";
import Checklist from "./components/checklist/Checklist";
import Navbar from "./components/Navbar";

export default function Home() {



    return (
        <div className="body">
            <Navbar/>
            <div className="page-box">
                <h1>Цель</h1>
                <Progessbar/>
    
                <h1>Задачи</h1>

                <Checklist/>
            </div>
        </div>
    );
}





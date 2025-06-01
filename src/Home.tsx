
import React from "react";
import Progessbar from "./components/base/Progressbar";
import Checklist from "./components/checklist/Checklist";
import Navbar from "./components/Navbar";
import useScore from "./hooks/useScore";

export default function Home({edit=false}:{edit?:boolean}) {

    const [score, setScore] = useScore('home-page');

    return (
        <div className="body">
            <Navbar/>
            <div className="page-box">
                <h1>Цель</h1>
                <Progessbar value={score}/>
                <h1>Задачи</h1>
                <Checklist edit={edit}/>
            </div>
        </div>
    );
}





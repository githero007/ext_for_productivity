import React, { useState, useRef } from "react";
function Clock() {
    const [time, setTime] = useState(30);
    const [seconds, setSeconds] = useState(0);
    const [button, setButton] = useState('start');
    const [active, setActive] = useState(false);
    const handleTime = () => {
        setButton('stop');
        setTime((time) => time - 1);
        const current = new Date();
        if (button == 'stop') {
            alert('session started cannot be stopped');
            return;
        }
        setInterval(e => {
            console.log(time);
            setSeconds((prevSeconds) => {
                if (prevSeconds > 0) return prevSeconds - 1;
                else return 59;
            })
        }, 1 * 1000);
        setInterval((e) => {
            setTime((prevTime) => {
                if (prevTime > 0) return prevTime - 1;
                else if (time == 0) return 0;
                else return 0;
            })
        }, 60 * 1000);

    }
    return (<>
        <div className="flex justify-center items-center radius-30">
            <div className="flex">
                <div className="text-5xl">{time} : {seconds}</div>
                <div className="ml-5">
                    <button className="border border-white" onClick={e => setTime(time + 5)}> ▲</button>
                    <br></br>
                    <button className="border border-white mt-4" onClick={e => setTime(time - 5)}> ▼ </button>
                </div>
            </div>
        </div>
        <button onClick={handleTime}>{button}</button>
    </>)
}
export default Clock;
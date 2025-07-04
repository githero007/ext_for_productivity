import { React, useEffect, useState } from "react";
function Goal() {
    const [goal, setGoal] = useState('');
    const handleChange = (e) => {
        setGoal(e.target.value);
        localStorage.setItem('goal', goal);
    }
    useEffect(() => {
        const lsgoal = localStorage.getItem('goal');

        setGoal(lsgoal);
    }, [])

    return (
        <> <div> <input type="text" value={goal} name="" id="" placeholder="enter your screen goal" onChange={e => handleChange(e)} /></div>

        </>
    )
}
export default Goal;

import React from "react";
import FormGroup from '@mui/material/FormGroup';
import { useState } from "react";
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import { formLabelClasses } from "@mui/material";


function WebBlocker() {
    const [block, setBlock] = useState({
        "Social Media": true,
        "Youtube": false,
        "BrainRot": true
    })
    const handleChange = (label) => {
        let name = label[0];
        const updatedSite = {
            ...block,
            [name]: !label[1],
        }
        setBlock(updatedSite);
        //because i am changing the entire content of the website i need to send the listening to the current tab which is active
    }
    return (<>

        <FormGroup>
            {Object.entries(block).map((label, check) => {
                return (
                    <FormControlLabel
                        key={label}
                        control={<Checkbox
                            defaultChecked={label[1]}
                            onChange={e => handleChange(label)}

                        />
                        } label={label[0]} />

                )
            })}

        </FormGroup>
    </>)
}
export default WebBlocker;
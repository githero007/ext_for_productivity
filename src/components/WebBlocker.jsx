import React from "react";
import FormGroup from '@mui/material/FormGroup';
import { useState } from "react";
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import { formLabelClasses } from "@mui/material";


function WebBlocker() {
    const [block, setBlock] = useState({
        "Social Media": false,
        "Youtube": true,
        "BrainRot": true
    })
    const handleChange = (label) => {
        let name = label[0];
        const updatedSite = {
            ...block,
            [name]: !label[1],
        }
        setBlock(updatedSite);
        chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
            if (tabs.length === 0) return; // no active tab

            chrome.tabs.sendMessage(tabs[0].id, { updatedSite }, function (response) {
                if (chrome.runtime.lastError) {
                    console.error("Message failed:", chrome.runtime.lastError.message);
                } else {
                    console.log("Response from content script:", response);
                }
            });
        });
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
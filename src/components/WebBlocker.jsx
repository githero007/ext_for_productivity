import React, { useEffect } from "react";
import FormGroup from '@mui/material/FormGroup';
import { useState } from "react";
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import { formLabelClasses } from "@mui/material";


function WebBlocker() {
    const [block, setBlock] = useState({
        "Social Media": true,
        "Youtube": true,
        "BrainRot": true
    })
    const [custom, setCustom] = useState([]);
    const [web, setWeb] = useState("");
    useEffect(() => {
        chrome.storage.local.get(["customWeb"], (result) => {
            const customSites = result.customWeb;
            if (Array.isArray(customSites)) {
                setCustom(customSites);
            }
            else setCustom([]);
        }
        )
    }, []);
    const handleChange = (label) => {
        let name = label[0];
        const updatedSite = {
            ...block,
            [name]: !label[1],
        }
        setBlock(updatedSite);
        chrome.storage.local.set({ blockedSites: updatedSite });

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
    const handleAdd = () => {
        if (web == "") return;
        const customSite = [...custom, web];
        setCustom(customSite);
        console.log(customSite);
        chrome.storage.local.set({ customWeb: customSite });
        chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
            if (tabs.length === 0) return;
            chrome.tabs.sendMessage(tabs[0].id, { customSite }, function (response) {
                if (chrome.runtime.lastError) {
                    console.error("Message failed:", chrome.runtime.lastError.message);
                } else {
                    console.log("Response from content script:", response);
                }
            });
        });
    }
    const handleDelete = async (index) => {
        let customSite = [...custom];
        customSite.splice(index, 1);
        setCustom(customSite);
        console.log(customSite);
        chrome.storage.local.set({ customWeb: customSite });
        chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
            if (tabs.length === 0) return;
            chrome.tabs.sendMessage(tabs[0].id, { customSite }, function (response) {
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
                        key={label[0]}
                        control={<Checkbox
                            checked={label[1]}
                            onChange={e => handleChange(label)}

                        />
                        } label={label[0]} />

                )
            })}
        </FormGroup>
        <div className="add" style={{ display: block }}>
            <input type="text"
                id=""
                value={web}
                onChange={e => setWeb(e.target.value)} placeholder="enter your url" />
            <button onClick={handleAdd}> Add urls</button>
        </div>
        <br />
        {custom.length > 0 && custom.map((urls, index) => {
            return (
                <div key={index}>
                    <p>{urls}</p>
                    <button onClick={() => handleDelete(index)}>Delete Urls</button>
                    <br />
                </div>
            )
        })}
    </>)
}
export default WebBlocker;
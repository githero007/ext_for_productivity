import React, { useEffect, useState } from "react";
import FormGroup from '@mui/material/FormGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';

function WebBlocker() {
    const [block, setBlock] = useState({
        "Social Media": true,
        "Youtube": true,
        "BrainRot": true
    });
    const [custom, setCustom] = useState([]);
    const [web, setWeb] = useState("");

    useEffect(() => {
        chrome.storage.local.get(["customWeb", "blockedSites"], (result) => {
            const customSites = result.customWeb;
            const blockedSites = result.blockedSites || blockedSites;
            if (Array.isArray(customSites)) {
                setCustom(customSites);
            } else {
                setCustom([]);
            }
            if (Object.keys(blockedSites).length != 0) {
                setBlock(blockedSites);
            }
        });
    }, []);

    const handleChange = (label) => {
        let name = label[0];
        const updatedSite = {
            ...block,
            [name]: !label[1],
        };
        setBlock(updatedSite);
        chrome.storage.local.set({ blockedSites: updatedSite });

        chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
            if (tabs.length === 0) return;

            chrome.tabs.sendMessage(tabs[0].id, { updatedSite }, function (response) {
                if (chrome.runtime.lastError) {
                    console.error("Message failed:", chrome.runtime.lastError.message);
                } else {
                    console.log("Response from content script:", response);
                }
            });
        });
    };

    const handleAdd = () => {
        if (web === "") return;
        const customSite = [...custom, web];
        setCustom(customSite);
        setWeb(""); // clear input after add
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
    };

    const handleDelete = (index) => {
        let customSite = [...custom];
        customSite.splice(index, 1);
        setCustom(customSite);
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
    };

    return (
        <div className="p-4 space-y-4">
            <FormGroup>
                {Object.entries(block).map((label) => (
                    <FormControlLabel
                        key={label[0]}
                        control={
                            <Checkbox
                                checked={label[1]}
                                onChange={() => handleChange(label)}
                            />
                        }
                        label={label[0]}
                    />
                ))}
            </FormGroup>

            <div className="flex gap-2">
                <input
                    type="text"
                    value={web}
                    onChange={(e) => setWeb(e.target.value)}
                    placeholder="Enter your URL"
                    className="flex-1 border rounded-lg px-2 py-1 text-sm"
                />
                <button
                    onClick={handleAdd}
                    className="bg-blue-500 text-white text-sm px-3 py-1 rounded-lg hover:bg-blue-600"
                >
                    Add URL
                </button>
            </div>

            <div>
                {custom.length > 0 &&
                    custom.map((url, index) => (
                        <div
                            key={index}
                            className="flex items-center justify-between bg-gray-100 p-2 rounded-lg shadow-sm mb-2"
                        >
                            <p className="text-sm text-gray-700 break-all">{url}</p>
                            <button
                                onClick={() => handleDelete(index)}
                                className="text-red-500 text-xs font-semibold hover:underline"
                            >
                                Delete
                            </button>
                        </div>
                    ))}
            </div>
        </div>
    );
}

export default WebBlocker;

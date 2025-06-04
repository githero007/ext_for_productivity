import React from "react";
import FormGroup from '@mui/material/FormGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';

function WebBlocker() {
    return (<>

        <FormGroup>
            <FormControlLabel control={<Checkbox defaultChecked />} label="Social Media" />
            <FormControlLabel control={<Checkbox />} label="Yotube" />
            <FormControlLabel control={<Checkbox defaultChecked />} label="Brain Rot" />

        </FormGroup>
    </>)
}
export default WebBlocker;
import { Dialog, DialogActions, DialogContent, DialogContentText, Button } from "@mui/material";
import { useState } from "react";

function LoginNoExitoso() {
    const [open, setOpen] = useState(true);
    const abrirAlerta = () => {
        setOpen(true);
    }

    const cerrarAlerta = () => {
        setOpen(false);
    }
    return (
        <>
            <div className="Popup_container">
                <Dialog open={open} onClose={abrirAlerta}>

                    <DialogContent className="Popup_container">
                        <DialogContentText >
                            <p className="Popup_text">No se ha podido inicar sesión por favor verifique la información ingresada.</p>
                        </DialogContentText>
                    </DialogContent>

                    <DialogActions className="Popup_button_container">
                        <Button onClick={cerrarAlerta} className="Popup_button"><p className="Popup_text_button">Aceptar</p></Button>
                    </DialogActions>

                </Dialog>

            </div>
        </>
    )
}
export default LoginNoExitoso;
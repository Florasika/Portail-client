import React, { useState } from 'react';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, IconButton, Dialog, DialogTitle, DialogContent, DialogActions, Button } from '@mui/material';
import { RiDownloadCloud2Line } from "react-icons/ri";
import './tableFacture.css';

const TableFactureC = () => {

    {/*const [open, setOpen] = useState(false);

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    const handleConfirmDownload = () => {
        // Logique pour confirmer le téléchargement
        setOpen(false); // Fermer la boîte de dialogue après confirmation
    };*/}

    const rows = [
        { marchandise: 'N°120536', montant: '500 000Fcfa', dateEmission: '22-07-24' },
        { marchandise: 'N°120536', montant: '500 000Fcfa', dateEmission: '22-07-24' },
        { marchandise: 'N°120536', montant: '500 000Fcfa', dateEmission: '22-07-24' },
        { marchandise: 'N°120536', montant: '500 000Fcfa', dateEmission: '22-07-24' },
        { marchandise: 'N°120536', montant: '500 000Fcfa', dateEmission: '22-07-24' },
       
    ];
    return(
        <>
            <TableContainer component={Paper} className="invoice-container">
                <Table className="invoice-table-root" aria-label="simple table">
                    <TableHead className="invoice-header">
                    <TableRow className="invoice-row-head">
                        <TableCell className="invoice-cell-head">Marchandise</TableCell>
                        <TableCell className="invoice-cell-head">Montant</TableCell>
                        <TableCell className="invoice-cell-head">DateEmission</TableCell>
                        <TableCell className="invoice-cell-head">Télécharger</TableCell>
                    </TableRow>
                    </TableHead>

                    <TableBody className="invoice-body">
                    {rows.map((row, index) => (
                        <TableRow key={index} className="invoice-row-body">
                        <TableCell className="cell-body">{row.marchandise}</TableCell>
                        <TableCell className="cell-body">{row.montant}</TableCell>
                        <TableCell className="cell-body">{row.dateEmission}</TableCell>
                        <TableCell className="cell-body">
                            <button className='telecharger' >
                                 <RiDownloadCloud2Line className="download-icon" />
                            </button>
                        </TableCell>
                        </TableRow>
                    ))}
                    </TableBody>
                </Table>
            </TableContainer>

            {/*<Dialog open={open} onClose={handleClose}>
                <DialogTitle>Confirmer le téléchargement</DialogTitle>
                <DialogContent>
                    <p>Voulez-vous vraiment télécharger cette facture ?</p>
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClose} color="primary">
                        Annuler
                    </Button>
                    <Button onClick={handleConfirmDownload} color="primary">
                        Confirmer
                    </Button>
                </DialogActions>
            </Dialog>*/}
        </>
    )
}

export default TableFactureC;
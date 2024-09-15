"use client";
import { Box, Stack, Typography, Button, Modal, TextField } from "@mui/material";
import { firestore } from "@/firebase";
import { collection, doc, query, getDocs, setDoc, deleteDoc} from "firebase/firestore";
import { useEffect, useState } from "react";

// Modal styling
const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'white',
  border: '2px solid #000',
  boxShadow: 24,
  p: 4,
  display: 'flex',
  flexDirection: 'column',
  gap: 3,
};

export default function Home() {
  const [pantry, setPantry] = useState([]);
  const [open, setOpen] = useState(false);
  const [itemName, setItemName] = useState(''); // Fix: Only one declaration of itemName

  // Open and close modal
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const updatePantry = async () => {
    const snapshot = query(collection(firestore, 'pantry'));
    const docs = await getDocs(snapshot);
    const pantryList = [];
    docs.forEach((doc) => {
      pantryList.push(doc.id);
    });
    setPantry(pantryList);
  };

  // Fetch pantry items on load
  useEffect(() => {
    updatePantry();
  }, []);

  // Add item to pantry
  const addItem = async (item) => {
   const docRef = doc(collection(firestore,'pantry'), item)
    await setDoc(docRef, {})
    await updatePantry()
  };

 const removeItem = async (item) => {
const docRef = doc(collection(firestore, 'pantry'), item)
 await deleteDoc(docRef)
 await updatePantry()
 }


  return (
    <Box
      width="100vw"
      height="100vh"
      display={'flex'}
      justifyContent={'center'}
      flexDirection={'column'}
      alignItems={'center'}
      gap={2}
    >
      {/* Modal for adding items */}
      <Modal 
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <Typography id="modal-modal-title" variant="h6" component="h2">
            Add Item
          </Typography>
          <Stack width="100%" direction={'row'} spacing={2}>
            <TextField
              id="outlined-basic"
              label="Item"
              variant="outlined"
              fullWidth
              value={itemName}
              onChange={(e) => setItemName(e.target.value)}
            />
            <Button
              variant="outlined"
              onClick={() => {
                addItem(itemName); // Fix: Passes itemName to addItem
                setItemName(''); 
                handleClose();
              }}
            >
              Add 
            </Button>
          </Stack>
        </Box>
      </Modal>

      {/* Button to open modal */}
      <Button variant="contained" onClick={handleOpen}>
        Add 
      </Button>

      {/* Pantry Items Display */}
      <Box border={'1px solid #333'}>
        <Box width="800px" height="100px" bgcolor={'#add8e6'}>
          <Typography variant={'h2'} color={'#333'} textAlign={'center'}>
            Pantry Items
          </Typography>
        </Box>
        <Stack width="800px" height="300px" spacing={2} overflow={'auto'}>
          {pantry.map((i, index) => (
           
            <Box
              key={index}
              width="100%"
              minHeight="150px"
              display={'flex'}
              justifyContent={'space-between'}
              
              alignItems={'center'}
              bgcolor={'#f0f0f0'}
              paddingX= {2}
            >
              <Typography variant={'h3'} color={'#333'} textAlign={'center'}>
                
              
              {
              // Capitalize first letter of item
                i.charAt(0).toUpperCase() + i.slice(1)
                }
              </Typography>
           
            <Button variant="contained" onClick={() => removeItem(i)}>Remove</Button>
            </Box>
          ))}
        </Stack>
      </Box>
    </Box>
  );
}

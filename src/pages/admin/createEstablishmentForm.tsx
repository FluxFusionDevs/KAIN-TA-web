import { Button, FormControl, FormHelperText, InputLabel, TextField } from "@mui/material";
import { useRef, useState } from "react";
import {
  emptyEstablishmentForm,
  EstablishmentForm as FormData,
} from "../../models/establishmentModel";
import { GoogleMap, useLoadScript, Marker } from "@react-google-maps/api";
import Modal from "../../components/Modal";

import "./establishmentForm.css";
import { Check, Image, MapSharp } from "@mui/icons-material";
import { createEstablishment } from "../../handlers/APIController";
import Select, { SelectChangeEvent } from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import { UserModel } from "../../models/userModel";
import { useNavigate } from "react-router-dom";

function EstablishmentForm() {
  const navigate = useNavigate();
  const [form, setForm] = useState<FormData>(emptyEstablishmentForm);
  const [error, setError] = useState<string>("");
  const [locationSelect, setLocationSelect] = useState<boolean>(false);
  const { isLoaded } = useLoadScript({
    googleMapsApiKey: import.meta.env.VITE_GOOGLE_MAPS_API_KEY,
  });
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [completeModal, setCompleteModal] = useState<boolean>(false);

  const documentInput = useRef<HTMLInputElement | null>(null);
  const establishmentInput = useRef<HTMLInputElement | null>(null);

  const barangays = [
    {
        "_id": "673586467cb954a38fddf59b",
        "name": "Santa Rosa",
        "__v": 0
    },
    {
        "_id": "673586467cb954a38fddf59d",
        "name": "Santo Niño",
        "__v": 0
    },
    {
        "_id": "673586467cb954a38fddf597",
        "name": "San Andres (Poblacion)",
        "__v": 0,
        "image": "/uploads/barangayImages/673586467cb954a38fddf597.jpg"
    },
    {
        "_id": "673586467cb954a38fddf598",
        "name": "San Isidro",
        "__v": 0,
        "image": "/uploads/barangayImages/673586467cb954a38fddf598.jpg"
    },
    {
        "_id": "673586467cb954a38fddf599",
        "name": "San Juan",
        "__v": 0,
        "image": "/uploads/barangayImages/673586467cb954a38fddf599.jpg"
    },
    {
        "_id": "673586467cb954a38fddf59a",
        "name": "San Roque",
        "__v": 0,
        "image": "/uploads/barangayImages/673586467cb954a38fddf59a.jpg"
    },
    {
        "_id": "673586467cb954a38fddf59c",
        "name": "Santo Domingo",
        "__v": 0
    }
]

  const handleComplete = async () => {
    setIsLoading(true);
    setError("")
    console.log(form);
    
    if (form.jsonData.name === "") {
      setIsLoading(false);
      setError("Business Name field is required");
      return;
    }

    if (form.jsonData.contact_number === "") {
      setIsLoading(false);
      setError("Contact Number field is required");
      return;
    }

    if (form.jsonData.email === "") {
      setIsLoading(false);
      setError("Business Email field is required");
      return;
    }

    if (form.jsonData.quisines.length < 1) {
      setIsLoading(false);
      setError("Quisines field is required");
      return;
    }

    if (form.jsonData.operating_hours === "") {
      setIsLoading(false);
      setError("Operating Hours field is required");
      return;
    }

    if (form.documentName === "") {
      setIsLoading(false);
      setError("Document Type field is required");
      return;
    }

    if (form.documentImage === undefined) {
      setIsLoading(false);
      setError("Document Photo field is required");
      return;
    }

    if (form.establishmentImage === undefined) {
      setIsLoading(false);
      setError("Document Photo field is required");
      return;
    }

    if (form.jsonData.location.coordinates.length < 2) {
      setIsLoading(false);
      setError("Location field is required");
      return;
    }

    if (form.jsonData.barangay === "") {
      setIsLoading(false);
      setError("Barangay field is required");
      return;
    }

    const complete_form = {...form};
    const user: UserModel = JSON.parse(sessionStorage.getItem('user') as string);
    complete_form.jsonData.owner = user._id;

    try {
       await createEstablishment(complete_form);
    } catch (error) {
      console.log(error);
      setError("An Error Has Occured: ");
    }

    setIsLoading(false);
    setCompleteModal(true);
  }

  console.log(form.jsonData.location.coordinates.length);

  const mapComponent = () => {

    if (!isLoaded) return <div>Loading...</div>;

    return (
      <GoogleMap 
        onClick={event => {
          const latLng = event.latLng;
          if (latLng) {
            const lat = latLng.lat();
            const lng = latLng.lng();
            const cur_data: FormData = {...form};
            cur_data.jsonData.location = {
              type: "Point",
              coordinates: [
                lng, lat
              ]
            }

            setForm(cur_data);
          }
        }}
        mapContainerStyle={{
        width: 600,
        height: 300,
      }} 
      center={form.jsonData.location.coordinates.length < 2 ? 
        {
          lat: 14.587490287067382,
          lng: 121.11284059177764
        } : 
        {
          lat: form.jsonData.location.coordinates[1],
          lng: form.jsonData.location.coordinates[0],
        }
      } 
      zoom={15}
      options={{
        disableDefaultUI: true,
      }}>
      {form.jsonData.location.coordinates.length > 1 && (
        <Marker 
        position={{
          lat: form.jsonData.location.coordinates[1],
          lng: form.jsonData.location.coordinates[0]
        }} />
      )}
    </GoogleMap>
    );
  }

  return (
    <div className="from-wrapper">
      {locationSelect && (<Modal 
        header="Choose A Location" 
        onSubmit={() => {
          // Location setting is done on click already so close
          setLocationSelect(false);
        }} 
        onCancel={() => {
          // Clear chosen location
          const cur_data: FormData = {...form};
            cur_data.jsonData.location = {
              type: "Point",
              coordinates: []
            }

            setForm(cur_data);
        }} 
        content={mapComponent()} 
        contentStyle={{display: 'block', padding: 25}}
        />)}

        {completeModal && (<Modal 
          header="Form Submitted!" 
          content={<div style={{width: "90%", margin: 'auto', padding: 0}}>
            Please wait until the admins approve of your request to create an establishment. You can submit another if you get rejected
          </div>} 
          onSubmit={() => {
            navigate('/');
          }}

          onCancel={() => {
            navigate('/');
          }}
          />)}

      <input
        title="EstablishmentImage"
        type="file" 
        ref={establishmentInput} 
        id="file" 
        style={{display: 'none'}} 
        accept="image/*" 
        onChange={event => {
          const file = event.target.files?.[0];
          if (file) {
            const cur_data: FormData = {...form};
            cur_data.establishmentImage = file;
            setForm(cur_data);
          }
        }}/>

      <input 
        title="DocumentImage"
        type="file" 
        ref={documentInput} 
        id="file" 
        style={{display: 'none'}} 
        accept="image/*" 
        onChange={event => {
          const file = event.target.files?.[0];
          if (file) {
            const cur_data: FormData = {...form};
            cur_data.documentImage = file;
            setForm(cur_data);
          }
        }}/>

      

      <div className="section">
        <div className="header">
          ESTABLISHMENT FORM
        </div>
      </div>

      <div className="section">
        <TextField 
          onChange={event => {
            const cur_data: FormData = {...form};
            cur_data.jsonData.name = event.target.value;
            setForm(cur_data);
          }}
          label="Business Name" variant="standard" />
      </div>
      <div className="section">
        <TextField 
          onChange={event => {
            const cur_data: FormData = {...form};
            cur_data.jsonData.contact_number = event.target.value;
            setForm(cur_data);
          }}
          label="Contact Number" variant="standard" />
      </div>
      <div className="section">
        <TextField 
          onChange={event => {
            const cur_data: FormData = {...form};
            cur_data.jsonData.email = event.target.value;
            setForm(cur_data);
          }}
          label="Business Email" variant="standard" />
      </div>
      <div className="section">
        <TextField 
          onChange={event => {
            const cur_data: FormData = {...form};
            cur_data.jsonData.quisines = event.target.value.split(',');
            setForm(cur_data);
          }}
          label="Quisines" placeholder="comma separated (Ex: Filipino,Asian)" variant="standard" />
      </div>
      <div className="section">
        <TextField 
          onChange={event => {
            const cur_data: FormData = {...form};
            cur_data.jsonData.operating_hours = event.target.value;
            setForm(cur_data);
          }}
          label="Operating Hours" placeholder="Ex: Monday-Sunday: 10:00 AM - 10:00 PM" variant="standard" />
      </div>
      <div className="section">
        <TextField 
          onChange={event => {
            const cur_data: FormData = {...form};
            cur_data.documentName = event.target.value;
            setForm(cur_data);
          }}
          label="Document Type" placeholder="Ex: BIR" variant="standard" />
      </div>
      <div className="section">
        <Button
          onClick={() => {
            if (documentInput.current) {
              documentInput.current.click();
            }
          }}
          sx={{
            width: "100%",
          }}
          className="button"
          variant="contained"
          startIcon={<Image />}
        >
          Document Photo
        </Button>
      </div>
      <div className="section">
        <Button
          onClick={() => {
            if (establishmentInput.current) {
              establishmentInput.current.click();
            }
          }}
          sx={{
            width: "100%",
          }}
          className="button"
          variant="contained"
          startIcon={<Image />}
        >
          Establishment Photo
        </Button>
      </div>
      <div className="section" style={{flexDirection: "row"}}>
        <Button
          onClick={() => {
            setLocationSelect(true);
          }}
          sx={{
            width: "100%",
          }}
          className="button"
          variant="contained"
          startIcon={<MapSharp />}
        >
          Establishment Location
        </Button>
      </div>
      <div className="section">
      <FormControl fullWidth>
      <InputLabel id="demo-simple-select-label" style={{ color: 'black' }}>
        Barangay
      </InputLabel>
      <Select
        labelId="demo-simple-select-label"
        id="demo-simple-select"
        label="Barangay"
        onChange={(event: SelectChangeEvent) => {
          const cur_data: FormData = { ...form };
          cur_data.jsonData.barangay = event.target.value;
          setForm(cur_data);
        }}
      >
        {barangays.map((item, index) => (
          <MenuItem key={index} value={item._id}>
            {item.name}
          </MenuItem>
        ))}
      </Select>
    </FormControl>
      </div>
      {error !== "" ? (
        <div className="section">
          <FormHelperText style={{ color: "#ff4444", margin: 'auto' }}>{error}</FormHelperText>
        </div>
      ) : null}

      <div className="section" style={{marginTop: 40}}>
        <Button
          disabled={isLoading}
          onClick={() => {
            handleComplete();
          }}
          sx={{
            backgroundColor: "#198754"
          }}
          className="submit-btn"
          variant="contained"
          startIcon={<Check />}
        >
          Complete
        </Button>
      </div>
    </div>
  );
}

export default EstablishmentForm;

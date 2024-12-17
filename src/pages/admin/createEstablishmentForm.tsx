import {
  Button,
  FormControl,
  FormHelperText,
  InputLabel,
  TextField,
} from '@mui/material';
import { useEffect, useRef, useState } from 'react';
import {
  emptyEstablishmentForm,
  EstablishmentForm as FormData,
  OperatingHours,
} from '../../models/establishmentModel';
import { GoogleMap, useLoadScript, Marker } from '@react-google-maps/api';
import Modal from '../../components/Modal';

import './establishmentForm.css';
import './createEstablishmentForm.css';
import { Check, Image, MapSharp, OtherHouses } from '@mui/icons-material';
import { createEstablishment } from '../../handlers/APIController';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import { UserModel } from '../../models/userModel';
import { useNavigate } from 'react-router-dom';

import Checkbox from '@mui/material/Checkbox';
import FormControlLabel from '@mui/material/FormControlLabel';
import { TimePicker } from '@mui/x-date-pickers/TimePicker';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DemoContainer } from '@mui/x-date-pickers/internals/demo';
import { Dayjs } from 'dayjs';

function EstablishmentForm() {
  const navigate = useNavigate();
  const [form, setForm] = useState<FormData>(emptyEstablishmentForm);
  const [error, setError] = useState<string>('');
  const [locationSelect, setLocationSelect] = useState<boolean>(false);
  const { isLoaded } = useLoadScript({
    googleMapsApiKey: import.meta.env.VITE_GOOGLE_MAPS_API_KEY,
  });
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [completeModal, setCompleteModal] = useState<boolean>(false);

  const documentInput = useRef<HTMLInputElement | null>(null);
  const establishmentInput = useRef<HTMLInputElement | null>(null);

  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [selectedImage, setSelectedImage] = useState<string>('');
  const [modalType, setModalType] = useState<string>('');
  const [operatingHours, setOperatingHours] = useState<OperatingHours[]>([]);

  const handleImageClick = (imageUrl: string, type: string) => {
    setSelectedImage(imageUrl);
    setModalType(type);
    setIsModalOpen(true);
  };

  const barangays = [
    {
      _id: '673586467cb954a38fddf59b',
      name: 'Santa Rosa',
      __v: 0,
    },
    {
      _id: '673586467cb954a38fddf59d',
      name: 'Santo Niño',
      __v: 0,
    },
    {
      _id: '673586467cb954a38fddf597',
      name: 'San Andres (Poblacion)',
      __v: 0,
      image: '/uploads/barangayImages/673586467cb954a38fddf597.jpg',
    },
    {
      _id: '673586467cb954a38fddf598',
      name: 'San Isidro',
      __v: 0,
      image: '/uploads/barangayImages/673586467cb954a38fddf598.jpg',
    },
    {
      _id: '673586467cb954a38fddf599',
      name: 'San Juan',
      __v: 0,
      image: '/uploads/barangayImages/673586467cb954a38fddf599.jpg',
    },
    {
      _id: '673586467cb954a38fddf59a',
      name: 'San Roque',
      __v: 0,
      image: '/uploads/barangayImages/673586467cb954a38fddf59a.jpg',
    },
    {
      _id: '673586467cb954a38fddf59c',
      name: 'Santo Domingo',
      __v: 0,
    },
  ];

  const documentTypes: string[] = [
    'BIR',
    'Business Permit',
    'SEC Registration',
  ];

  const handleComplete = async () => {
    setIsLoading(true);
    setError('');
    console.log(form);

    for (let i = 0; i < operatingHours.length; i++) {
      const item = operatingHours[i];
      if (item.open === '') {
        setIsLoading(false);
        setError(`'Open' Field for ${item.day} is Required`);
        return;
      }

      if (item.close === '') {
        setIsLoading(false);
        setError(`'Close' Field for ${item.day} is Required`);
        return;
      }
    }

    if (form.jsonData.name === '') {
      setIsLoading(false);
      setError('Business Name field is required');
      return;
    }

    if (form.jsonData.contact_number === '') {
      setIsLoading(false);
      setError('Contact Number field is required');
      return;
    }

    if (form.jsonData.email === '') {
      setIsLoading(false);
      setError('Business Email field is required');
      return;
    }

    if (form.jsonData.address === '') {
      setIsLoading(false);
      setError('Address field is required');
      return;
    }

    if (form.jsonData.quisines.length < 1) {
      setIsLoading(false);
      setError('Cuisines field is required');
      return;
    }

    if (form.jsonData.operating_hours === '') {
      setIsLoading(false);
      setError('Operating Hours field is required');
      return;
    }

    if (form.documentName === '') {
      setIsLoading(false);
      setError('Document Type field is required');
      return;
    }

    if (form.documentImage === undefined) {
      setIsLoading(false);
      setError('Document Photo field is required');
      return;
    }

    if (!form.establishmentImage || form.establishmentImage.length < 1) {
      setIsLoading(false);
      setError('Document Photo field is required');
      return;
    }

    if (form.jsonData.location.coordinates.length < 2) {
      setIsLoading(false);
      setError('Location field is required');
      return;
    }

    if (form.jsonData.barangay === '') {
      setIsLoading(false);
      setError('Barangay field is required');
      return;
    }

    const complete_form = { ...form };
    const user: UserModel = JSON.parse(
      sessionStorage.getItem('user') as string
    );
    complete_form.jsonData.owner = user._id;

    try {
      await createEstablishment(complete_form);
    } catch (error) {
      console.log(error);
      setError('An Error Has Occured: ');
    }

    setIsLoading(false);
    setCompleteModal(true);
    setForm(emptyEstablishmentForm);
  };

  console.log(form.jsonData.location.coordinates.length);

  const mapComponent = () => {
    if (!isLoaded) return <div>Loading...</div>;

    return (
      <GoogleMap
        onClick={(event) => {
          const latLng = event.latLng;
          if (latLng) {
            const lat = latLng.lat();
            const lng = latLng.lng();
            const cur_data: FormData = { ...form };
            cur_data.jsonData.location = {
              type: 'Point',
              coordinates: [lng, lat],
            };

            setForm(cur_data);
          }
        }}
        mapContainerStyle={{
          width: 600,
          height: 300,
        }}
        center={
          form.jsonData.location.coordinates.length < 2
            ? {
                lat: 14.587490287067382,
                lng: 121.11284059177764,
              }
            : {
                lat: form.jsonData.location.coordinates[1],
                lng: form.jsonData.location.coordinates[0],
              }
        }
        zoom={15}
        options={{
          disableDefaultUI: true,
        }}
      >
        {form.jsonData.location.coordinates.length > 1 && (
          <Marker
            position={{
              lat: form.jsonData.location.coordinates[1],
              lng: form.jsonData.location.coordinates[0],
            }}
          />
        )}
      </GoogleMap>
    );
  };

  const handleTimeChange = (
    time: string | undefined,
    day: string,
    open: boolean
  ) => {
    if (!time) return;

    const day_obj: OperatingHours | undefined = operatingHours.find(
      (op) => op.day === day
    );
    if (!day_obj) return;

    // Remove old and replace
    const copy = operatingHours.filter((op) => op.day !== day);

    if (open) {
      copy.push({
        ...day_obj,
        open: time,
      });
    } else {
      copy.push({
        ...day_obj,
        close: time,
      });
    }

    setOperatingHours(copy);
    console.log(operatingHours);
  };

  useEffect(() => {
    setForm({
      ...form,
      jsonData: {
        ...form.jsonData,
        operating_hours: operatingHours
          .map((entry) => `${entry.day}, ${entry.open} - ${entry.close}`)
          .join(';'),
      },
    });
  }, [operatingHours]);

  return (
    <div className="from-wrapper">
      {isModalOpen && (
        <Modal
          disableButtons
          header={
            modalType === 'profile' ? 'Profile Image' : 'Proof of Payment'
          }
          contentStyle={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
          }}
          content={
            <img src={selectedImage} alt="Preview" style={{ width: '50%' }} />
          }
          onCancel={() => setIsModalOpen(false)}
        />
      )}

      {locationSelect && (
        <Modal
          header="Choose A Location"
          onSubmit={() => {
            // Location setting is done on click already so close
            setLocationSelect(false);
          }}
          onCancel={() => {
            // Clear chosen location
            const cur_data: FormData = { ...form };
            cur_data.jsonData.location = {
              type: 'Point',
              coordinates: [],
            };

            setForm(cur_data);
            //close modal
            setLocationSelect(false);
          }}
          content={mapComponent()}
          contentStyle={{ display: 'block', padding: 25 }}
        />
      )}

      {completeModal && (
        <Modal
          header="Form Submitted!"
          content={
            <div style={{ width: '90%', margin: 'auto', padding: 0 }}>
              Please wait until the admins approve of your request to create an
              establishment. You can submit another if you get rejected
            </div>
          }
          onSubmit={() => {
            navigate('/');
          }}
          onCancel={() => {
            navigate('/');
          }}
        />
      )}

      <input
        title="EstablishmentImage"
        type="file"
        ref={establishmentInput}
        id="file"
        style={{ display: 'none' }}
        accept="image/*"
        multiple
        onChange={(event) => {
          const files = event.target.files;
          if (files && files.length > 0) {
            const cur_data = { ...form };
            cur_data.establishmentImage = files;
            setForm(cur_data);
          }
        }}
      />

      <input
        title="DocumentImage"
        type="file"
        ref={documentInput}
        id="file"
        style={{ display: 'none' }}
        accept="image/*"
        onChange={(event) => {
          const file = event.target.files?.[0];
          if (file) {
            const cur_data: FormData = { ...form };
            cur_data.documentImage = file;
            setForm(cur_data);
          }
        }}
      />

      <div className="section">
        <div className="header">ESTABLISHMENT FORM</div>
      </div>

      <div className="section">
        <TextField
          onChange={(event) => {
            const cur_data: FormData = { ...form };
            cur_data.jsonData.name = event.target.value;
            setForm(cur_data);
          }}
          label="Business Name"
          variant="standard"
        />
      </div>
      <div className="section">
        <TextField
          onChange={(event) => {
            const cur_data: FormData = { ...form };
            cur_data.jsonData.contact_number = event.target.value;
            setForm(cur_data);
          }}
          label="Contact Number"
          variant="standard"
        />
      </div>
      <div className="section">
        <TextField
          onChange={(event) => {
            const cur_data: FormData = { ...form };
            cur_data.jsonData.email = event.target.value;
            setForm(cur_data);
          }}
          label="Business Email"
          variant="standard"
        />
      </div>
      <div className="section">
        <TextField
          onChange={(event) => {
            const cur_data: FormData = { ...form };
            cur_data.jsonData.address = event.target.value;
            setForm(cur_data);
          }}
          label="Address"
          variant="standard"
        />
      </div>
      <div className="section">
        <TextField
          onChange={(event) => {
            const cur_data: FormData = { ...form };
            cur_data.jsonData.quisines = event.target.value.split(',');
            setForm(cur_data);
          }}
          label="Cuisines"
          placeholder="comma separated (Ex: Filipino,Asian)"
          variant="standard"
        />
      </div>
      <div className="section">
        <LocalizationProvider dateAdapter={AdapterDayjs}>
          <div className="column">
            <div className="row">
              <FormControlLabel
                style={{ flex: 1 }}
                label="Monday"
                control={
                  <Checkbox
                    onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
                      let copy = [...operatingHours];
                      if (event.target.checked) {
                        // Add
                        copy.push({
                          day: 'Monday',
                          open: '',
                          close: '',
                        });
                      } else {
                        // Remove
                        copy = copy.filter((op) => op.day !== 'Monday');
                      }

                      setOperatingHours(copy);
                    }}
                  />
                }
              />
              {operatingHours.find((op) => op.day === 'Monday') && (
                <div style={{ display: 'flex' }}>
                  <DemoContainer components={['TimePicker']}>
                    <TimePicker
                      onChange={(value) =>
                        handleTimeChange(
                          value?.format('hh:mm A'),
                          'Monday',
                          true
                        )
                      }
                      label="Open"
                    />
                  </DemoContainer>

                  <div className="space"></div>

                  <DemoContainer components={['TimePicker']}>
                    <TimePicker
                      onChange={(value) =>
                        handleTimeChange(
                          value?.format('hh:mm A'),
                          'Monday',
                          false
                        )
                      }
                      label="Close"
                    />
                  </DemoContainer>
                </div>
              )}
            </div>

            <div className="row">
              <FormControlLabel
                style={{ flex: 1 }}
                label="Tuesday"
                control={
                  <Checkbox
                    onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
                      let copy = [...operatingHours];
                      if (event.target.checked) {
                        // Add
                        copy.push({
                          day: 'Tuesday',
                          open: '',
                          close: '',
                        });
                      } else {
                        // Remove
                        copy = copy.filter((op) => op.day !== 'Tuesday');
                      }

                      setOperatingHours(copy);
                    }}
                  />
                }
              />
              {operatingHours.find((op) => op.day === 'Tuesday') && (
                <div style={{ display: 'flex' }}>
                  <DemoContainer components={['TimePicker']}>
                    <TimePicker
                      onChange={(value) =>
                        handleTimeChange(
                          value?.format('hh:mm A'),
                          'Tuesday',
                          true
                        )
                      }
                      label="Open"
                    />
                  </DemoContainer>

                  <div className="space"></div>

                  <DemoContainer components={['TimePicker']}>
                    <TimePicker
                      onChange={(value) =>
                        handleTimeChange(
                          value?.format('hh:mm A'),
                          'Tuesday',
                          false
                        )
                      }
                      label="Close"
                    />
                  </DemoContainer>
                </div>
              )}
            </div>

            <div className="row">
              <FormControlLabel
                style={{ flex: 1 }}
                label="Wednesday"
                control={
                  <Checkbox
                    onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
                      let copy = [...operatingHours];
                      if (event.target.checked) {
                        // Add
                        copy.push({
                          day: 'Wednesday',
                          open: '',
                          close: '',
                        });
                      } else {
                        // Remove
                        copy = copy.filter((op) => op.day !== 'Wednesday');
                      }

                      setOperatingHours(copy);
                    }}
                  />
                }
              />
              {operatingHours.find((op) => op.day === 'Wednesday') && (
                <div style={{ display: 'flex' }}>
                  <DemoContainer components={['TimePicker']}>
                    <TimePicker
                      onChange={(value) =>
                        handleTimeChange(
                          value?.format('hh:mm A'),
                          'Wednesday',
                          true
                        )
                      }
                      label="Open"
                    />
                  </DemoContainer>

                  <div className="space"></div>

                  <DemoContainer components={['TimePicker']}>
                    <TimePicker
                      onChange={(value) =>
                        handleTimeChange(
                          value?.format('hh:mm A'),
                          'Wednesday',
                          false
                        )
                      }
                      label="Close"
                    />
                  </DemoContainer>
                </div>
              )}
            </div>

            <div className="row">
              <FormControlLabel
                style={{ flex: 1 }}
                label="Thursday"
                control={
                  <Checkbox
                    onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
                      let copy = [...operatingHours];
                      if (event.target.checked) {
                        // Add
                        copy.push({
                          day: 'Thursday',
                          open: '',
                          close: '',
                        });
                      } else {
                        // Remove
                        copy = copy.filter((op) => op.day !== 'Thursday');
                      }

                      setOperatingHours(copy);
                    }}
                  />
                }
              />
              {operatingHours.find((op) => op.day === 'Thursday') && (
                <div style={{ display: 'flex' }}>
                  <DemoContainer components={['TimePicker']}>
                    <TimePicker
                      onChange={(value) =>
                        handleTimeChange(
                          value?.format('hh:mm A'),
                          'Thursday',
                          true
                        )
                      }
                      label="Open"
                    />
                  </DemoContainer>

                  <div className="space"></div>

                  <DemoContainer components={['TimePicker']}>
                    <TimePicker
                      onChange={(value) =>
                        handleTimeChange(
                          value?.format('hh:mm A'),
                          'Thursday',
                          false
                        )
                      }
                      label="Close"
                    />
                  </DemoContainer>
                </div>
              )}
            </div>

            <div className="row">
              <FormControlLabel
                style={{ flex: 1 }}
                label="Friday"
                control={
                  <Checkbox
                    onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
                      let copy = [...operatingHours];
                      if (event.target.checked) {
                        // Add
                        copy.push({
                          day: 'Friday',
                          open: '',
                          close: '',
                        });
                      } else {
                        // Remove
                        copy = copy.filter((op) => op.day !== 'Friday');
                      }

                      setOperatingHours(copy);
                    }}
                  />
                }
              />
              {operatingHours.find((op) => op.day === 'Friday') && (
                <div style={{ display: 'flex' }}>
                  <DemoContainer components={['TimePicker']}>
                    <TimePicker
                      onChange={(value) =>
                        handleTimeChange(
                          value?.format('hh:mm A'),
                          'Friday',
                          true
                        )
                      }
                      label="Open"
                    />
                  </DemoContainer>

                  <div className="space"></div>

                  <DemoContainer components={['TimePicker']}>
                    <TimePicker
                      onChange={(value) =>
                        handleTimeChange(
                          value?.format('hh:mm A'),
                          'Friday',
                          false
                        )
                      }
                      label="Close"
                    />
                  </DemoContainer>
                </div>
              )}
            </div>

            <div className="row">
              <FormControlLabel
                style={{ flex: 1 }}
                label="Saturday"
                control={
                  <Checkbox
                    onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
                      let copy = [...operatingHours];
                      if (event.target.checked) {
                        // Add
                        copy.push({
                          day: 'Saturday',
                          open: '',
                          close: '',
                        });
                      } else {
                        // Remove
                        copy = copy.filter((op) => op.day !== 'Saturday');
                      }

                      setOperatingHours(copy);
                    }}
                  />
                }
              />
              {operatingHours.find((op) => op.day === 'Saturday') && (
                <div style={{ display: 'flex' }}>
                  <DemoContainer components={['TimePicker']}>
                    <TimePicker
                      onChange={(value) =>
                        handleTimeChange(
                          value?.format('hh:mm A'),
                          'Saturday',
                          true
                        )
                      }
                      label="Open"
                    />
                  </DemoContainer>

                  <div className="space"></div>

                  <DemoContainer components={['TimePicker']}>
                    <TimePicker
                      onChange={(value) =>
                        handleTimeChange(
                          value?.format('hh:mm A'),
                          'Saturday',
                          false
                        )
                      }
                      label="Close"
                    />
                  </DemoContainer>
                </div>
              )}
            </div>

            <div className="row">
              <FormControlLabel
                style={{ flex: 1 }}
                label="Sunday"
                control={
                  <Checkbox
                    onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
                      let copy = [...operatingHours];
                      if (event.target.checked) {
                        // Add
                        copy.push({
                          day: 'Sunday',
                          open: '',
                          close: '',
                        });
                      } else {
                        // Remove
                        copy = copy.filter((op) => op.day !== 'Sunday');
                      }

                      setOperatingHours(copy);
                    }}
                  />
                }
              />
              {operatingHours.find((op) => op.day === 'Sunday') && (
                <div style={{ display: 'flex' }}>
                  <DemoContainer components={['TimePicker']}>
                    <TimePicker
                      onChange={(value) =>
                        handleTimeChange(
                          value?.format('hh:mm A'),
                          'Sunday',
                          true
                        )
                      }
                      label="Open"
                    />
                  </DemoContainer>

                  <div className="space"></div>

                  <DemoContainer components={['TimePicker']}>
                    <TimePicker
                      onChange={(value) =>
                        handleTimeChange(
                          value?.format('hh:mm A'),
                          'Sunday',
                          false
                        )
                      }
                      label="Close"
                    />
                  </DemoContainer>
                </div>
              )}
            </div>
          </div>
        </LocalizationProvider>
      </div>
      <div className="section">
        <FormControl fullWidth>
          <InputLabel id="demo-simple-select-label" style={{ color: 'black' }}>
            Document Type
          </InputLabel>
          <Select
            labelId="demo-simple-select-label"
            id="demo-simple-select"
            label="Document Type"
            onChange={(event: SelectChangeEvent) => {
              const cur_data: FormData = { ...form };
              cur_data.documentName = event.target.value;
              setForm(cur_data);
            }}
          >
            {documentTypes.map((item, index) => (
              <MenuItem key={index} value={item}>
                {item}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
      </div>
      <div className="section">
        <Button
          onClick={() => {
            if (documentInput.current) {
              documentInput.current.click();
            }
          }}
          sx={{
            width: '100%',
          }}
          className="button"
          variant="contained"
          startIcon={<Image />}
        >
          Document Photo
        </Button>
      </div>
      <div className="section">
        {Array.from(form.establishmentImage || []).map(
          (item: File, index: number) => (
            <a
              key={index}
              style={{ marginRight: 8 }}
              href="#"
              onClick={(e: React.MouseEvent<HTMLAnchorElement>) => {
                e.preventDefault();
                handleImageClick(URL.createObjectURL(item), 'profile');
              }}
              role="button"
              aria-label={`View image ${index + 1}`}
            >
              Image {index + 1}
            </a>
          )
        )}
      </div>
      <div className="section">
        <Button
          onClick={() => {
            if (establishmentInput.current) {
              establishmentInput.current.click();
            }
          }}
          sx={{
            width: '100%',
          }}
          className="button"
          variant="contained"
          startIcon={<Image />}
        >
          Establishment Photo
        </Button>
      </div>
      <div className="section" style={{ flexDirection: 'row' }}>
        <Button
          onClick={() => {
            setLocationSelect(true);
          }}
          sx={{
            width: '100%',
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
      {error !== '' ? (
        <div className="section">
          <FormHelperText style={{ color: '#ff4444', margin: 'auto' }}>
            {error}
          </FormHelperText>
        </div>
      ) : null}

      <div className="section" style={{ marginTop: 40 }}>
        <Button
          disabled={isLoading}
          onClick={() => {
            handleComplete();
          }}
          sx={{
            backgroundColor: '#198754',
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

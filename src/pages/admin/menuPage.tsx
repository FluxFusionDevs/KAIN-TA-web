import { useEffect, useRef, useState } from 'react';
import { Button, FormHelperText, TextField } from '@mui/material';
import { Delete, Edit, Image } from '@mui/icons-material';

import Modal from '../../components/Modal';

import './menuPage.css';
import { Food } from '../../models/foodModel';
import { EstablishmentModel } from '../../models/establishmentModel';
import {
  addFood,
  deleteFood,
  getEstablishment,
  updateFood,
} from '../../handlers/APIController';
import { UserModel } from '../../models/userModel';
import SuperTable, { CellType, SuperCell } from '../../components/SuperTable';
import AddTable from '../../components/AddTable';

enum DashboardState {
  Idle,
  IsAdding,
  IsEditting,
  IsDeleting,
  IsSaving,
}

function DashboardPage() {
  const [state, setState] = useState<DashboardState>(DashboardState.Idle);
  const [establishment, setEstablishment] = useState<EstablishmentModel>();
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [tableData, setTableData] = useState<SuperCell[][]>();

  const inputEdit = useRef<HTMLInputElement | null>(null);

  const [newFoods, setNewFoods] = useState<Food[]>([]);

  const [editFood, setEditFood] = useState<Food>({
    _id: '',
    name: '',
    tags: [],
    image: '',
    description: '',
    price: 0,
  });

  async function handleEdit() {
    setState(DashboardState.IsSaving);
    if (establishment !== null && establishment !== undefined) {
      try {
        console.log('Edit Food Value: ', editFood);
        const new_esta = await updateFood(editFood, establishment._id);
        setEstablishment(new_esta);
      } catch (err) {
        console.error('Error updating food: ', err);
      }
    }
  }

  async function handleAdd() {
    setState(DashboardState.IsAdding);
    setNewFoods([
      ...newFoods,
      {
        _id: '',
        name: '',
        tags: [],
        image: '',
        description: '',
        price: 0,
      },
    ]);
  }

  async function handleDelete(id: string) {
    if (establishment === undefined) return;

    setIsLoading(true);
    const new_estab = await deleteFood(id, establishment._id);

    setEstablishment(new_estab);
    setIsLoading(false);
  }

  const edit_inputs = [
    <div style={styles.section}>
      <TextField
        value={editFood?.name}
        onChange={(event) => {
          const cur_food: Food = { ...editFood };
          cur_food.name = event.target.value;
          setEditFood(cur_food);
        }}
        style={styles.text_input}
        id="text_input"
        label="Name"
        variant="standard"
      />
      {editFood.name === '' ? (
        <FormHelperText style={{ color: '#ff4444' }}>
          This Field is Required
        </FormHelperText>
      ) : null}
    </div>,
    <div style={styles.section}>
      <TextField
        value={editFood?.description}
        onChange={(event) => {
          const cur_food: Food = { ...editFood };
          cur_food.description = event.target.value;
          setEditFood(cur_food);
        }}
        style={styles.text_input}
        id="text_input"
        label="Description"
        variant="standard"
      />
      {editFood.description === '' ? (
        <FormHelperText style={{ color: '#ff4444' }}>
          This Field is Required
        </FormHelperText>
      ) : null}
    </div>,
    <div style={styles.section}>
      <TextField
        value={editFood?.tags.join(',')}
        onChange={(event) => {
          const cur_food: Food = { ...editFood };
          cur_food.tags = event.target.value.split(',');
          setEditFood(cur_food);
        }}
        style={styles.text_input}
        id="text_input"
        label="Tags"
        variant="standard"
      />
      {editFood.tags.length < 1 ? (
        <FormHelperText style={{ color: '#ff4444' }}>
          This Field is Required
        </FormHelperText>
      ) : null}
    </div>,
    <div style={styles.section}>
      <TextField
        sx={{
          '& input::-webkit-outer-spin-button, & input::-webkit-inner-spin-button':
            {
              display: 'none',
            },
          '& input[type=number]': {
            MozAppearance: 'textfield',
          },
        }}
        type="number"
        value={editFood?.price.toString()}
        onChange={(event) => {
          const cur_food: Food = { ...editFood };
          cur_food.price = parseFloat(event.target.value);
          setEditFood(cur_food);
        }}
        style={styles.text_input}
        id="text_input"
        label="Price"
        variant="standard"
      />
    </div>,
    <div style={styles.section}>
      <Button
        onClick={() => {
          if (inputEdit.current) {
            inputEdit.current.click();
          }
        }}
        sx={{
          width: '100%',
        }}
        className="button"
        variant="contained"
        startIcon={<Image />}
      >
        Upload Image
      </Button>
    </div>,
  ];

  const handleBulkUpload = async () => {
    setState(DashboardState.IsSaving);

    for (let index = 0; index < newFoods.length; index++) {
      const item = newFoods[index];

      if (!establishment) return;

      const data = await addFood(item, establishment._id);
      setEstablishment(data);
    }

    setNewFoods([]);
    setState(DashboardState.Idle);
  };

  useEffect(() => {
    // Set table data
    const headers: SuperCell[] = [
      { type: 'ID', value: '_id' },
      { type: 'HEADER', value: 'Name' },
      { type: 'HEADER', value: 'Description' },
      { type: 'HEADER', value: 'Tags' },
      { type: 'HEADER', value: 'Image' },
      { type: 'HEADER', value: 'Price' },
      { type: 'HEADER', value: 'Actions' },
    ];

    if (establishment !== undefined) {
      const data: SuperCell[][] = [
        headers, // Add the headers as the first row
        ...establishment.menu_items.map((item) => [
          { type: 'ID' as CellType, value: item._id },
          { type: 'VALUE' as CellType, value: item.name },
          { type: 'VALUE' as CellType, value: item.description },
          { type: 'VALUE' as CellType, value: item.tags.join(', ') },
          { type: 'IMAGE' as CellType, value: item.image as string },
          { type: 'VALUE' as CellType, value: item.price.toString() },
        ]),
      ];

      setTableData(data);
    }
  }, [establishment]);

  useEffect(() => {
    const fetchEstablishment = async () => {
      const user = sessionStorage.getItem('user');
      if (user === undefined || user === null)
        return console.warn('User Tokens not Initialized');

      const user_parsed: UserModel = JSON.parse(user) as UserModel;

      if (user_parsed === null || user_parsed === undefined) return;

      try {
        const user_parsed: UserModel = JSON.parse(user) as UserModel;

        if (!user_parsed || !user_parsed.owned_establishment) {
          console.warn('Owned establishment is not available');
          return;
        }

        const estab: string | EstablishmentModel =
          user_parsed.owned_establishment;
        const converted: EstablishmentModel =
          typeof estab === 'string'
            ? await getEstablishment(user_parsed.owned_establishment as string)
            : (user_parsed.owned_establishment as EstablishmentModel);

        setEstablishment(converted);
      } catch (error) {
        console.error('Error parsing user:', error);
      }
    };

    fetchEstablishment();
  }, []);

  return (
    <div className="verification-wrapper">
      <input
        type="file"
        ref={inputEdit}
        id="file"
        style={{ display: 'none' }}
        accept="image/*"
        onChange={(event) => {
          const file = event.target.files?.[0];
          if (file) {
            const cur_food: Food = { ...editFood, image: file };
            console.log('Edit Input: ', file);
            setEditFood(cur_food);
          }
        }}
      />

      {/* EDIT MODAL */}
      {state === DashboardState.IsEditting ? (
        <Modal
          header="EDIT FOOD"
          content={edit_inputs}
          onSubmit={() => handleEdit()}
          onCancel={() => setState(DashboardState.Idle)}
        />
      ) : null}

      <div className="top-header">
        <Button
          style={{
            background: '#2673DD',
            color: 'white',
            width: 200,
            borderRadius: 25,
            marginTop: 20,
            marginBottom: 10,
          }}
          onClick={() => handleAdd()}
        >
          add
        </Button>
      </div>

      {state === DashboardState.IsAdding ? (
        <AddTable
          onRemove={(index) => {
            const removed = newFoods;
            removed.splice(index, 1);
            setNewFoods([...removed]);
          }}
          onChange={(index, newFood) => {
            newFoods[index] = newFood;
            setNewFoods([...newFoods]);
          }}
          onSubmit={() => handleBulkUpload()}
          onCancel={() => {
            setNewFoods([]);
            setState(DashboardState.Idle);
          }}
          foods={newFoods}
        />
      ) : null}

      <SuperTable
        buttons={(id) => [
          <Button
            sx={{
              backgroundColor: '#198754',
              marginBottom: 1,
            }}
            disabled={isLoading}
            onClick={async () => {
              if (establishment === undefined) return;
              const food: Food | undefined = establishment.menu_items.find(
                (food) => food._id === id
              );

              if (food === undefined) return;
              setEditFood(food);
              setState(DashboardState.IsEditting);
            }}
            className="button"
            variant="contained"
            startIcon={<Edit />}
          >
            Edit
          </Button>,
          <Button
            sx={{
              backgroundColor: '#dc3545',
            }}
            disabled={isLoading}
            onClick={() => handleDelete(id)}
            className="button"
            variant="contained"
            startIcon={<Delete />}
          >
            Delete
          </Button>,
        ]}
        data={tableData ?? []}
      />
    </div>
  );
}

const styles = {
  table: {
    maxHeight: '100%',
    overflowY: 'auto',
  },
  selected_button: {
    borderBottomWidth: 2,
    borderBottomColor: 'black',
  },
  section: {
    marginTop: 5,
  },
  button: {
    borderRadius: 25,
    width: 150,
  },
  text_input: {
    width: '100%',
  },
  header: {
    fontWeight: 'bold',
    fontSize: 36,
  },
  sub_header: {},
  sidebar: {
    backgroundColor: '#2673DD',
    width: 260,
    color: 'white',
  },
  selected_sidebar_button: {
    backgroundColor: 'rgba(0, 0, 0, 0.2)',
  },
  sidebar_button: {
    width: '100%',
    color: 'white',
    borderRadius: 20,
  },
  tab_button: {
    width: '100%',
    color: 'black',
  },
};

export default DashboardPage;

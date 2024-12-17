import React, { useRef, useState } from 'react';
import './AddTable.css';
import Modal from './Modal';
import {
  Button,
  CircularProgress,
  FormHelperText,
  TextField,
} from '@mui/material';
import { Check, Close, Image } from '@mui/icons-material';
import { Food } from '../models/foodModel';

interface AddTableProps {
  foods: Food[];
  onRemove: (food_index: number) => void;
  onChange: (food_index: number, food: Food) => void;
  onSubmit: () => void;
  onCancel: () => void;
}

const AddTable: React.FC<AddTableProps> = ({
  foods,
  onRemove,
  onChange,
  onSubmit,
  onCancel,
}) => {
  console.log('REload');
  const inputFile = useRef<HTMLInputElement | null>(null);

  let selectedFood: number = 0;

  const handleRowClick = (index: number) => {
    selectedFood = index;
  };

  const validate = (): boolean => {
    for (let index = 0; index < foods.length; index++) {
      const item = foods[index];
      if (item.name === '') {
        console.log('Invalid Name');
        return false;
      }

      if (item.description === '') {
        console.log('Invalid Description');
        return false;
      }

      if (item.tags.length < 1) {
        console.log('Invalid Tags');
        return false;
      }

      if (item.image === undefined || item.image === '') {
        console.log('Invalid Image');
        return false;
      }
    }

    return true;
  };

  const handleFoodsSubmit = () => {
    if (validate()) {
      onSubmit();
    }
  };

  return (
    <div className="add-table">
      <input
        type="file"
        ref={inputFile}
        id="file"
        style={{ display: 'none' }}
        accept="image/*"
        onChange={(event) => {
          const file = event.target.files?.[0];
          if (file) {
            foods[selectedFood].image = file;
            onChange(selectedFood, foods[selectedFood]);

            console.log(foods[selectedFood]);
          }

          // Clear the input value
          event.target.value = '';
        }}
      />

      {foods.map((food, index) => {
        return (
          <div
            key={index}
            className="row"
            onClick={() => handleRowClick(index)}
          >
            <div className="col">
              <TextField
                style={{ width: '100%' }}
                placeholder="Name"
                variant="standard"
                value={foods[index].name}
                onChange={(event) => {
                  food.name = event.target.value;
                  onChange(index, food);
                }}
              />
              {food.name === '' ? (
                <FormHelperText style={{ color: '#ff4444' }}>
                  This Field is Required
                </FormHelperText>
              ) : null}{' '}
            </div>
            <div className="col">
              <TextField
                style={{ width: '100%' }}
                placeholder="Description"
                variant="standard"
                onChange={(event) => {
                  food.description = event.target.value;
                  onChange(index, food);
                }}
              />
              {food.description === '' ? (
                <FormHelperText style={{ color: '#ff4444' }}>
                  This Field is Required
                </FormHelperText>
              ) : null}{' '}
            </div>
            <div className="col">
              <TextField
                style={{ width: '100%' }}
                placeholder="Tags"
                variant="standard"
                onChange={(event) => {
                  food.tags = event.target.value.split(',');
                  onChange(index, food);
                }}
              />
              {food.tags.length < 1 ? (
                <FormHelperText style={{ color: '#ff4444' }}>
                  This Field is Required
                </FormHelperText>
              ) : null}{' '}
            </div>
            <div className="col">
              <TextField
                style={{ width: '100%' }}
                type="number"
                placeholder="Price"
                variant="standard"
                onChange={(event) => {
                  food.price = Number(event.target.value);
                  onChange(index, food);
                }}
              />
              {food.price < 1 ? (
                <FormHelperText style={{ color: '#ff4444' }}>
                  This Field is Required
                </FormHelperText>
              ) : null}{' '}
            </div>
            <div className="col">
              <Button
                sx={{
                  width: '100%',
                  marginTop: 1,
                }}
                className="button"
                variant="contained"
                startIcon={<Image />}
                onClick={() => {
                  if (inputFile.current) {
                    inputFile.current.click();
                  }
                }}
              >
                Upload Image
              </Button>
              {!food.image ? (
                <FormHelperText style={{ color: '#ff4444' }}>
                  This Field is Required
                </FormHelperText>
              ) : null}{' '}
            </div>
            <div style={{ flex: 0 }} className="col">
              <Button
                sx={{
                  marginTop: 1,
                  marginRight: 2,
                  backgroundColor: '#dc3545',
                }}
                className="button"
                variant="contained"
                startIcon={<Close />}
                onClick={() => onRemove(index)}
              >
                REMOVE
              </Button>
            </div>
          </div>
        );
      })}

      <div className="control">
        <Button
          sx={{
            marginTop: 1,
            marginRight: 2,
            backgroundColor: '#dc3545',
          }}
          className="button"
          variant="contained"
          startIcon={<Close />}
          onClick={() => {
            onCancel();
          }}
        >
          CANCEL
        </Button>

        <Button
          sx={{
            marginTop: 1,
            backgroundColor: '#198754',
          }}
          className="button"
          variant="contained"
          startIcon={<Check />}
          onClick={() => {
            handleFoodsSubmit();
          }}
        >
          DONE
        </Button>
      </div>
    </div>
  );
};

export default AddTable;

import React, {useState} from 'react';
import Box from '@mui/material/Box';
import Rating from '@mui/material/Rating';
import Typography from '@mui/material/Typography';
import "./MyRating.css"

export default function MyRating({starHandler}) {
  const [value, setValue] = useState(0);

  return (
    <div className='ratings'>
      <Typography component="legend">Rate this response</Typography>
      <Rating
        name="simple-controlled"
        value={value}
        onChange={(event, newValue) => {
          setValue(newValue);
          starHandler(newValue)
        }}
      />
    </div>
  );
}
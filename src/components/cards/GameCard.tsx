import { Button } from '@mui/material';
import React from 'react';

function GameCard() {
  return (
    <div className="p-3  duration-75 hover:cursor-pointer dark:bg-black bg-white rounded-lg shadow_1">
      <div>
        <img
          src="https://play-lh.googleusercontent.com/Odw8BGugaJLdbaSbCeZWbTE3Qz1wTiQ0Tsn9nzpoQdnkzWb-gaI58zzTmYDvGpdYKg"
          alt=""
          className=" rounded-lg"
        />
      </div>
      <div className="mt-3">
        <p className="text-xl font-medium text-center text-txt-primary">Free fire</p>
        <p className="text-primary font-medium text-center">Start's From $2</p>
        <div className="text-center mt-3">
          <Button variant="outlined" color="secondary">
            Topup Now
          </Button>
        </div>
      </div>
    </div>
  );
}

export default GameCard;

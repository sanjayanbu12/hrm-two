import React, { useState } from 'react';
import MainCard from 'ui-component/cards/MainCard';
import { Button, Avatar, Stack, Typography } from '@mui/material';
import User1 from 'assets/images/users/user-round.svg';
import FeedbackCard from './FeedbackCard';
import PopupCard from './PopupCard';
import Item from 'antd/es/list/Item';

const Feedback = () => {
  const [isPopupOpen, setPopupOpen] = useState(false);

  const openPopup = () => {
    setPopupOpen(true);
  };

  const closePopup = () => {
    setPopupOpen(false);
  };

  return (
    <MainCard title="Feedbacks" sx={{ height: '99%' }}>
      <Stack direction="row" spacing={2} sx={{ listStyleType: 'none', display: 'flex', alignItems: 'center' }}>
        <Item>
          <Avatar
            sx={{
              width: '60px',
              height: '60px'
            }}
            src={User1}
          ></Avatar>
        </Item>

        <Item alignItems={'center'} sx={{}}>
          <Typography
            variant="h4"
            body1="span"
            sx={{
              fontWeight: 800,
              fontSize: 'medium'
            }}
          >
            Johne Doe
          </Typography>
          <Typography
            variant="h4"
            body1="span"
            sx={{
              fontWeight: 300,
              fontSize: 'small',
              color: '#697586',
              marginTop: '5px'
            }}
          >
            {' '}
            Project Admin
          </Typography>
        </Item>
        <Item>
          <Button variant="contained" color="secondary" onClick={openPopup}>
            Give Feedback
          </Button>
          {isPopupOpen && <PopupCard onClose={closePopup} />}
        </Item>
        <Item></Item>
      </Stack>

      <Stack direction="row" useFlexGap flexWrap="wrap" spacing={2} sx={{ listStyleType: 'none' }}>
        <Item>
          <Typography sx={{ fontSize: '18px', marginTop: '10px' }}>
            <b>Feedbacks Given to you</b>
          </Typography>
        </Item>
      </Stack>

      <Stack
        direction="row"
        useFlexGap
        overflow={'auto'}
        spacing={2}
        display="flex"
        sx={{
          listStyleType: 'none',
          scrollbarWidth: 'thin',
          scrollbarColor: 'transparent transparent', // Transparent colors by default

          '&::-webkit-scrollbar': {
            height: '5px'
          },

          '&::-webkit-scrollbar-track': {
            backgroundColor: 'transparent' // Transparent background
          },

          '&::-webkit-scrollbar-thumb': {
            backgroundColor: 'transparent', // Transparent thumb
            borderRadius: '6px',
            transition: 'background-color 0.3s' // Smooth transition
          },

          '&:hover::-webkit-scrollbar-thumb': {
            backgroundColor: '#888' // Change background color on hover
          },

          '&::-webkit-scrollbar-thumb:hover': {
            backgroundColor: '#555'
          }
        }}
      >
        <FeedbackCard />
      </Stack>
    </MainCard>
  );
};

export default Feedback;

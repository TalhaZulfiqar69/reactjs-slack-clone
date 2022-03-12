import React, { useState } from 'react';
import styled from 'styled-components';
import Button from '@mui/material/Button';
import { db, auth } from '../configs/firebaseConfiguration';
import firebase from 'firebase/compat/app';
import { useAuthState } from 'react-firebase-hooks/auth';

const ChatInput = ({ channelName, channelId, chatRef }) => {
  const [user] = useAuthState(auth);
  const [inputValue, setInputValue] = useState('');

  const sendMessage = (e) => {
    e.preventDefault();

    if (!channelId) {
      return false;
    }

    db.collection('rooms').doc(channelId).collection('messages').add({
      message: inputValue,
      timestamp: firebase.firestore.FieldValue.serverTimestamp(),
      user: user?.displayName,
      userImage: user?.photoURL,
    });

    chatRef?.current?.scrollIntoView({
      behavior: 'smooth',
    });
    setInputValue('');
  };

  return (
    <ChatInputContainer>
      <form>
        <input
          placeholder={`Message #${channelName}`}
          onChange={(e) => setInputValue(e.target.value)}
          value={inputValue}
        />
        <Button hidden type='submit' onClick={sendMessage}>
          SEND
        </Button>
      </form>
    </ChatInputContainer>
  );
};

export default ChatInput;

const ChatInputContainer = styled.div`
  border-radius: 20px;

  > form {
    position: relative;
    display: flex;
    justify-content: center;
  }

  > form > input {
    position: fixed;
    bottom: 30px;
    width: 60%;
    border: 1px solid gray;
    border-radius: 3px;
    padding: 20px;
    outline: none;
  }

  > form > button {
    display: none !important;
  }
`;

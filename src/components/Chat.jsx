import React, { useEffect, useRef } from 'react';
import { useSelector } from 'react-redux';
import { selectRoomId } from '../features/appSlice';
import styled from 'styled-components';
import StarBorderOutlinedIcon from '@mui/icons-material/StarBorderOutlined';
import InfoOutlinedIcon from '@mui/icons-material/InfoOutlined';
import ChatInput from './ChatInput';
import Header from '../commons/Header';
import Sidebar from '../commons/Sidebar';
import { useCollection, useDocument } from 'react-firebase-hooks/firestore';
import { db } from '../configs/firebaseConfiguration';
import Message from './Message';

const Chat = () => {
  const chatRef = useRef();
  const roomId = useSelector(selectRoomId);

  const [roomDetails] = useDocument(
    roomId && db.collection('rooms').doc(roomId)
  );

  const [roomMessages, loading] = useCollection(
    roomId &&
      db
        .collection('rooms')
        .doc(roomId)
        .collection('messages')
        .orderBy('timestamp', 'asc')
  );

  useEffect(() => {
    chatRef?.current?.scrollIntoView({
      behavior: 'smooth',
    });
  }, [roomId, loading]);
  return (
    <>
      <Header />
      <Sidebar />
      <ChatContainer>
        {roomDetails && roomMessages && (
          <>
            <ChatHeader>
              <HeaderLeft>
                <h4>
                  <strong># {roomDetails?.data().name}</strong>
                </h4>
                <StarBorderOutlinedIcon />
              </HeaderLeft>
              <HeaderRight>
                <p>
                  <InfoOutlinedIcon /> Details
                </p>
              </HeaderRight>
            </ChatHeader>

            <ChatMessages>
              {roomMessages?.docs.map((doc) => {
                const { message, timestamp, user, userImage } = doc.data();

                return (
                  <Message
                    key={doc.id}
                    message={message}
                    timestamp={timestamp}
                    user={user}
                    userImage={userImage}
                  />
                );
              })}
              <ChatBottom ref={chatRef} />
            </ChatMessages>

            <ChatInput
              chatRef={chatRef}
              channelName={roomDetails?.data().name}
              channelId={roomId}
            />
          </>
        )}
      </ChatContainer>
    </>
  );
};

export default Chat;

const ChatContainer = styled.div`
  flex: 0.7;
  flex-grow: 1;
  overflow-x: scroll;
  margin-top: 60px;
`;

const ChatHeader = styled.div`
  display: flex;
  justify-content: space-between;
  padding: 20px;
  border-bottom: 1px solid lightgray;
`;

const HeaderLeft = styled.div`
  display: flex;
  align-items: center;

  > h4 {
    display: flex;
    text-transform: lowercase;
    margin-right: 10px;
  }

  > h4 .MuiSvgIcon-root {
    margin-left: 18px;
    font-size: 18px;
  }
`;

const HeaderRight = styled.div`
  > p {
    display: flex;
    align-items: center;
    font-size: 14px;
  }
  > p .MuiSvgIcon-root {
    margin-left: 5px !important;
    font-size: 16px;
  }
`;

const ChatMessages = styled.div``;

const ChatBottom = styled.div``;

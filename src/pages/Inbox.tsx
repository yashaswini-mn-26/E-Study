import React, { useState, useEffect, useRef } from 'react';
import { 
  Search, Phone, Video, Paperclip, Smile, Mic, ArrowLeft, Send 
} from 'lucide-react';
import { useSelector } from 'react-redux';
import { io } from 'socket.io-client'; 
import EmojiPicker from 'emoji-picker-react'; // <-- NEW IMPORT
import Navbar from '../components/Navbar';
import MenuBar from '../components/MenuBar'; 
import styles from '../styles/Inbox.module.css';
import { API } from '../config/api'; 

const socket = io('http://localhost:5000'); 

interface Contact {
  _id: string;
  name: string;
  email: string;
  role: string;
  avatar?: string;
}

interface Message {
  _id: string;
  sender: string;
  receiver: string;
  content: string;
  createdAt: string;
}

const Inbox: React.FC = () => {
  const { user, token } = useSelector((state: any) => state.auth);

  const [activeUser, setActiveUser] = useState<Contact | null>(null);
  const [showChatOnMobile, setShowChatOnMobile] = useState(false);
  
  const [contacts, setContacts] = useState<Contact[]>([]);
  const [messages, setMessages] = useState<Message[]>([]);
  const [newMessage, setNewMessage] = useState("");
  const [searchQuery, setSearchQuery] = useState("");

  // --- NEW STATES FOR BADGES, ONLINE STATUS, CALLS & EMOJIS ---
  const [onlineUsers, setOnlineUsers] = useState<string[]>([]);
  const [unreadCounts, setUnreadCounts] = useState<Record<string, number>>({});
  const [incomingCall, setIncomingCall] = useState<{ callerName: string, type: string } | null>(null);
  const [showEmojiPicker, setShowEmojiPicker] = useState(false); // <-- NEW STATE

  const chatBodyRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (user && user._id) {
      socket.emit("join_room", user._id);
    }
  }, [user]);

  useEffect(() => {
    const handleReceiveMessage = (incomingMessage: Message) => {
      if (activeUser && incomingMessage.sender === activeUser._id) {
        setMessages((prev) => [...prev, incomingMessage]);
      } else {
        setUnreadCounts((prev) => ({
          ...prev,
          [incomingMessage.sender]: (prev[incomingMessage.sender] || 0) + 1
        }));
      }
    };

    const handleUpdateOnline = (users: string[]) => {
      setOnlineUsers(users);
    };

    const handleIncomingCall = (data: { callerName: string, type: string }) => {
      setIncomingCall(data);
      setTimeout(() => setIncomingCall(null), 5000); 
    };

    socket.on("receive_message", handleReceiveMessage);
    socket.on("update_online_status", handleUpdateOnline);
    socket.on("incoming_call", handleIncomingCall);

    return () => {
      socket.off("receive_message", handleReceiveMessage);
      socket.off("update_online_status", handleUpdateOnline);
      socket.off("incoming_call", handleIncomingCall);
    };
  }, [activeUser]);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const res = await fetch(`${API.user}/`, { headers: { 'x-auth-token': token } });
        if (res.ok) {
          const data = await res.json();
          setContacts(data.filter((c: Contact) => c._id !== user?._id));
        }
      } catch (err) {
        console.error("Failed to fetch contacts", err);
      }
    };
    if (token) fetchUsers();
  }, [token, user]);

  useEffect(() => {
    const fetchConversation = async () => {
      if (!activeUser) return;
      try {
        const res = await fetch(`${API.message}/conversation/${activeUser._id}`, {
          headers: { 'x-auth-token': token }
        });
        if (res.ok) {
          const data = await res.json();
          setMessages(data);
        }
      } catch (err) {
        console.error("Failed to fetch messages", err);
      }
    };

    fetchConversation();
  }, [activeUser, token]);

  const handleSendMessage = async () => {
    if (!newMessage.trim() || !activeUser) return;
    try {
      const res = await fetch(`${API.message}/`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', 'x-auth-token': token },
        body: JSON.stringify({ receiverEmail: activeUser.email, subject: "Chat", content: newMessage })
      });
      if (res.ok) {
        const sentMessage = await res.json();
        setMessages([...messages, sentMessage]);
        setNewMessage(""); 
        setShowEmojiPicker(false); // <-- Close emoji picker on send
        socket.emit("send_message", sentMessage);
      }
    } catch (err) {
      console.error("Failed to send message", err);
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') handleSendMessage();
  };

  const initiateCall = (type: 'Video' | 'Audio') => {
    if (!activeUser) return;
    alert(`Calling ${activeUser.name}... (Waiting for answer)`);
    socket.emit("call_user", { receiverId: activeUser._id, callerName: user.name, type });
  };

  // --- NEW: HANDLE EMOJI CLICK ---
  const handleEmojiClick = (emojiData: any) => {
    setNewMessage((prev) => prev + emojiData.emoji);
  };

  useEffect(() => {
    if (chatBodyRef.current) {
      chatBodyRef.current.scrollTop = chatBodyRef.current.scrollHeight;
    }
  }, [messages]);

  const filteredContacts = contacts.filter(c => c.name.toLowerCase().includes(searchQuery.toLowerCase()));

  return (
    <div className={styles.wrapper}>
      <Navbar />
      <div className={styles.container}>
        <MenuBar activePage="Inbox" />

        <section className={`${styles.messagesList} ${showChatOnMobile ? styles.hideOnMobile : ''}`}>
          <h1 className={styles.pageTitle}>Inbox</h1>
          
          <div className={styles.searchBox}>
            <Search size={18} className={styles.searchIcon} />
            <input type="text" placeholder="Search contacts..." value={searchQuery} onChange={(e) => setSearchQuery(e.target.value)} />
          </div>

          <div className={styles.listSection}>
            {filteredContacts.map((contact) => (
              <div 
                key={contact._id} 
                className={`${styles.contactItem} ${activeUser?._id === contact._id ? styles.activeContact : ''}`}
                onClick={() => { 
                  setActiveUser(contact); 
                  setShowChatOnMobile(true); 
                  setUnreadCounts(prev => ({ ...prev, [contact._id]: 0 }));
                }}
              >
                <div className={styles.avatarWrapper}>
                  <img src={contact.avatar || "/yashaswini.png"} alt="Avatar" className={styles.contactAvatar} />
                  {onlineUsers.includes(contact._id) && <div className={styles.onlineDot}></div>}
                </div>

                <div className={styles.contactInfo}>
                  <div className={styles.contactHeader}>
                    <p className={styles.contactName}>{contact.name}</p>
                    {unreadCounts[contact._id] > 0 && (
                      <span className={styles.unreadBadge}>{unreadCounts[contact._id]}</span>
                    )}
                  </div>
                  <span className={styles.contactTime}>{contact.role}</span>
                </div>
              </div>
            ))}
          </div>
        </section>

        <section className={`${styles.chatWindow} ${!showChatOnMobile ? styles.hideOnMobile : ''}`}>
          {activeUser ? (
            <>
              {incomingCall && (
                <div style={{ background: '#25D366', color: 'white', padding: '10px', textAlign: 'center', fontWeight: 'bold' }}>
                  📞 Incoming {incomingCall.type} Call from {incomingCall.callerName}...
                </div>
              )}

              <header className={styles.chatHeader}>
                <div className={styles.activeUser}>
                  <button className={styles.mobileBackBtn} onClick={() => setShowChatOnMobile(false)}>
                    <ArrowLeft size={24} />
                  </button>
                  <div className={styles.avatarWrapper}>
                    <img src={activeUser.avatar || "/yashaswini.png"} alt={activeUser.name} className={styles.headerAvatar} />
                    {onlineUsers.includes(activeUser._id) && <div className={styles.onlineDot}></div>}
                  </div>
                  <div>
                    <h4>{activeUser.name}</h4>
                    <p>{onlineUsers.includes(activeUser._id) ? 'Online' : 'Offline'}</p>
                  </div>
                </div>
                <div className={styles.headerIcons}>
                  <button className={styles.actionBtn} onClick={() => initiateCall('Audio')}><Phone size={22} fill="currentColor" /></button>
                  <button className={styles.actionBtn} onClick={() => initiateCall('Video')}><Video size={24} fill="currentColor" /></button>
                </div>
              </header>

              <div className={styles.chatBody} ref={chatBodyRef} style={{ overflowY: 'auto', flex: 1 }}>
                {messages.length === 0 ? (
                  <p style={{ textAlign: "center", color: "gray", marginTop: "20px" }}>No messages yet. Say hi!</p>
                ) : (
                  messages.map((msg) => (
                    <div key={msg._id} className={msg.sender === user?._id ? styles.msgOut : styles.msgIn}>
                      <div className={msg.sender === user?._id ? styles.bubbleOut : styles.bubbleIn}>{msg.content}</div>
                      <span className={styles.msgTime} style={{ fontSize: "10px", color: "gray", alignSelf: msg.sender === user?._id ? "flex-end" : "flex-start", marginTop: "4px" }}>
                        {new Date(msg.createdAt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                      </span>
                    </div>
                  ))
                )}
              </div>

              {/* Added position: 'relative' to footer to anchor the absolute emoji picker */}
              <footer className={styles.chatFooter} style={{ position: 'relative' }}>
                
                {/* NEW: THE EMOJI PICKER UI */}
                {showEmojiPicker && (
                  <div style={{ position: 'absolute', bottom: '80px', right: '40px', zIndex: 1000 }}>
                    <EmojiPicker onEmojiClick={handleEmojiClick} />
                  </div>
                )}

                <div className={styles.inputContainer}>
                  <Paperclip className={styles.footerIcon} size={20} />
                  <input type="text" placeholder="Type your message here...." value={newMessage} onChange={(e) => setNewMessage(e.target.value)} onKeyPress={handleKeyPress} />
                  <div className={styles.inputExtras}>
                    {/* NEW: WIRED UP THE SMILE ICON */}
                    <Smile 
                      size={20} 
                      className={styles.clickableIcon} 
                      onClick={() => setShowEmojiPicker((prev) => !prev)} 
                    />
                    {newMessage ? <Send size={20} color="#7f9651" style={{ cursor: 'pointer' }} onClick={handleSendMessage} /> : <Mic size={20} />}
                  </div>
                </div>
              </footer>
            </>
          ) : (
            <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100%', color: 'gray' }}>
              Select a contact to start messaging
            </div>
          )}
        </section>
      </div>
    </div>
  );
};

export default Inbox;
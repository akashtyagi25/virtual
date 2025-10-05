import React, { useState, useEffect, useRef } from 'react';
import { onAuthStateChanged } from 'firebase/auth';
import { auth } from './firebase';
import './App.css';
import micIcon from './assets/mic.svg';
import voiceGif from './assets/voice.gif';
import logo from './assets/logo.jpg';
import AuthModal from './components/AuthModal';
import UserProfile from './components/UserProfile';

function App() {
  const [listening, setListening] = useState(false);
  const [transcript, setTranscript] = useState('Click here to talk to me');
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [authModalOpen, setAuthModalOpen] = useState(false);
  const [authMode, setAuthMode] = useState('login');
  const recognitionRef = useRef(null);

  useEffect(() => {
    // Initialize speech recognition
    const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
    if (SpeechRecognition) {
      // Main recognition for commands
      recognitionRef.current = new SpeechRecognition();
      recognitionRef.current.continuous = false;
      recognitionRef.current.interimResults = false;
      recognitionRef.current.onresult = (event) => {
        const currentIndex = event.resultIndex;
        const transcript = event.results[currentIndex][0].transcript;
        setTranscript(transcript);
        takeCommand(transcript.toLowerCase());
      };

      recognitionRef.current.onend = () => {
        setListening(false);
      };
    }
    
    // Setup Firebase Auth listener
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setUser(user);
      setLoading(false);
      if (user) {
        setAuthModalOpen(false);
        // Wish the user when they log in
        setTimeout(() => {
          wishMe(user);
        }, 1000);
      } else {
        // Wish guest user when component mounts and no user is logged in
        setTimeout(() => {
          wishMe();
        }, 1000);
      }
    });
    
    return () => {
      unsubscribe();
      if (recognitionRef.current) {
        recognitionRef.current.abort();
      }
      // Cancel any ongoing speech when component unmounts
      window.speechSynthesis.cancel();
    };
  }, []);

  const speak = (text) => {
    // Cancel any ongoing speech
    window.speechSynthesis.cancel();
    
    const textSpeak = new SpeechSynthesisUtterance(text);
    textSpeak.rate = 1;
    textSpeak.pitch = 1;
    textSpeak.volume = 1;
    
    window.speechSynthesis.speak(textSpeak);
  };

  const wishMe = (currentUser = user) => {
    const day = new Date();
    const hours = day.getHours();
    let greeting;
    
    if (hours >= 0 && hours < 12) {
      greeting = "Good Morning";
    } else if (hours >= 12 && hours < 16) {
      greeting = "Good afternoon";
    } else {
      greeting = "Good Evening";
    }
    
    if (currentUser) {
      const name = currentUser.displayName || currentUser.email?.split('@')[0] || 'User';
      speak(`${greeting} ${name}! Welcome back to Shifra Virtual Assistant.`);
    } else {
      speak(`${greeting}! Welcome to Shifra Virtual Assistant.`);
    }
  };

  const startListening = () => {
    setListening(true);
    recognitionRef.current.start();
  };

  const takeCommand = (message) => {
    setListening(false);
    
    // YouTube video/song playing commands
    if (message.includes("play") && !message.includes("play song")) {
      // Extract the song/video name after "play"
      let searchQuery = "";
      
      if (message.includes("play ")) {
        searchQuery = message.split("play ")[1];
      }
      
      if (searchQuery.trim()) {
        speak(`Searching for ${searchQuery} on YouTube. Please click on the video you want to watch.`);
        // Open YouTube search results in a new tab
        const youtubeUrl = `https://www.youtube.com/results?search_query=${encodeURIComponent(searchQuery)}`;
        window.open(youtubeUrl, "_blank");
        return;
      }
    }
    
    // Alternative commands for YouTube
    if (message.includes("youtube") && (message.includes("search") || message.includes("find"))) {
      let searchQuery = message.replace("youtube", "").replace("search", "").replace("find", "").replace("for", "").trim();
      if (searchQuery) {
        speak(`Searching YouTube for ${searchQuery}`);
        window.open(`https://www.youtube.com/results?search_query=${encodeURIComponent(searchQuery)}`, "_blank");
        return;
      }
    }
    
    // Specific music commands
    if (message.includes("play music") || message.includes("play some music")) {
      speak("Opening YouTube Music for you. You can browse and play any song you like!");
      window.open("https://music.youtube.com/", "_blank");
      return;
    }
    
    // Enhanced play command with better user guidance
    if (message.includes("play latest") || message.includes("play new")) {
      let searchQuery = message.replace("play latest", "").replace("play new", "").trim();
      if (searchQuery) {
        speak(`Opening latest ${searchQuery} videos on YouTube. Click on any video to start playing!`);
        window.open(`https://www.youtube.com/results?search_query=${encodeURIComponent(`latest ${searchQuery}`)}&sp=CAI%253D`, "_blank");
        return;
      }
    }
    
    // Video commands
    if (message.includes("play video") && message.includes("of")) {
      let videoQuery = message.split("of ")[1];
      if (videoQuery) {
        speak(`Opening ${videoQuery} videos on YouTube. Select any video to start watching!`);
        window.open(`https://www.youtube.com/results?search_query=${encodeURIComponent(videoQuery)}`, "_blank");
        return;
      }
    }
    
    // Quick play feature - opens first search result page directly
    if (message.includes("quick play") || message.includes("instantly play")) {
      let searchTerm = message.replace("quick play", "").replace("instantly play", "").trim();
      if (searchTerm) {
        speak(`Quick playing ${searchTerm}. Opening top result on YouTube!`);
        // This opens the search results and user can click first video
        window.open(`https://www.youtube.com/results?search_query=${encodeURIComponent(searchTerm)}`, "_blank");
        
        // Additional tip
        setTimeout(() => {
          speak("Click on the first video result to start playing immediately!");
        }, 2000);
        return;
      }
    }
    
    // Existing commands
    if (message.includes("hello") || message.includes("hey")) {
      if (user) {
        const name = user.displayName || user.email?.split('@')[0] || 'User';
        speak(`Hello ${name}, what can I help you with?`);
      } else {
        speak("Hello! What can I help you with? You can also sign up for a personalized experience.");
      }
    }
    else if (message.includes("who are you")) {
      speak("I am Shifra, your virtual assistant, created by Ayush Sir. I can help you with various tasks, play music, and much more!");
    } 
    else if (message.includes("open youtube")) {
      speak("opening youtube...");
      window.open("https://youtube.com/", "_blank");
    }
    else if (message.includes("open google")) {
      speak("opening google...");
      window.open("https://google.com/", "_blank");
    }
    else if (message.includes("open facebook")) {
      speak("opening facebook...");
      window.open("https://facebook.com/", "_blank");
    }
    else if (message.includes("open instagram")) {
      speak("opening instagram...");
      window.open("https://instagram.com/", "_blank");
    }
    else if (message.includes("open calculator")) {
      speak("opening calculator..");
      window.open("calculator://");
    }
    else if (message.includes("open whatsapp")) {
      speak("opening whatsapp..");
      window.open("whatsapp://");
    }
    else if (message.includes("time")) {
      let time = new Date().toLocaleString(undefined, { hour: "numeric", minute: "numeric" });
      speak(time);
    }
    else if (message.includes("date")) {
      let date = new Date().toLocaleString(undefined, { day: "numeric", month: "short" });
      speak(date);
    }
    else if (message.includes("dark mode") || message.includes("night mode")) {
      speak("I'm already in dark mode, which looks great!");
    }
    else if (message.includes("light mode") || message.includes("day mode")) {
      speak("Sorry, I only support dark mode for the best experience.");
    }
    else if (message.includes("toggle theme") || message.includes("switch theme")) {
      speak("I'm designed to stay in dark mode for optimal user experience.");
    }
    else {
      let finalText = "this is what i found on internet regarding" + message.replace("shipra", "") || message.replace("shifra", "");
      speak(finalText);
      window.open(`https://www.google.com/search?q=${message.replace("shipra", "")}`, "_blank");
    }
  };

  const handleShowAuth = (mode) => {
    setAuthMode(mode);
    setAuthModalOpen(true);
  };

  const handleCloseAuth = () => {
    setAuthModalOpen(false);
  };

  // Show loading screen while checking authentication
  if (loading) {
    return (
      <div className="app dark-theme">
        <div className="loading-screen">
          <img src={logo} alt="logo" className="logo" />
          <h1>Loading <span className="name">Shifra</span>...</h1>
          <div className="loading-spinner"></div>
        </div>
      </div>
    );
  }

  // If user is not logged in, show login page
  if (!user) {
    return (
      <div className="app dark-theme">
        <div className="auth-welcome">
          <img src={logo} alt="logo" className="logo" />
          <h1>Welcome to <span className="name">Shifra</span></h1>
          <p className="welcome-text">Your Personal Virtual Assistant</p>
          <p className="auth-required">Please sign in to continue</p>
          
          <div className="auth-buttons-center">
            <button 
              className="auth-trigger-btn primary" 
              onClick={() => handleShowAuth('login')}
            >
              Sign In
            </button>
            <button 
              className="auth-trigger-btn secondary" 
              onClick={() => handleShowAuth('signup')}
            >
              Create Account
            </button>
          </div>
        </div>
        
        <AuthModal 
          isOpen={authModalOpen}
          onClose={handleCloseAuth}
          initialMode={authMode}
        />
      </div>
    );
  }

  // If user is logged in, show the main app
  return (
    <div className="app dark-theme">
      <UserProfile user={user} onShowAuth={handleShowAuth} />
      
      <img src={logo} alt="logo" className="logo" />
      <h1>I'm <span className="name">Shifra</span>, Your <span className="va">Virtual Assistant</span></h1>
      
      {listening ? (
        <img src={voiceGif} alt="voice" className="voice" />
      ) : (
        <button className="btn" onClick={startListening}>
          <img src={micIcon} alt="mic" />
          <span className="content">{transcript}</span>
        </button>
      )}
    </div>
  );
}

export default App;


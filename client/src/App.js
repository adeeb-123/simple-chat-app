import './App.css';
import ChatContainer from './components/ChatContainer';

function App() {
  return (
    <div style={{ backgroundColor: "#ece5dd", height: "100vh", padding: 10 }}>
      <h2>Simple Chat App</h2>
      <ChatContainer />
    </div>
  );
}

export default App;

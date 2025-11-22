// import React, { useState, useEffect } from "react";
// import { FaComments, FaTimes, FaMicrophone, FaPaperPlane } from "react-icons/fa";

// const Chatbot = () => {
//     const [isOpen, setIsOpen] = useState(false);
//     const [message, setMessage] = useState("");
//     const [chat, setChat] = useState([]);
//     const [recognition, setRecognition] = useState(null);
//     const [language, setLanguage] = useState("en-US");

//     useEffect(() => {
//         if ("webkitSpeechRecognition" in window) {
//             const recog = new window.webkitSpeechRecognition();
//             recog.continuous = false;
//             recog.interimResults = false;
//             recog.lang = language;

//             recog.onresult = (event) => {
//                 setMessage(event.results[0][0].transcript);
//             };

//             recog.onerror = (event) => {
//                 console.error("Speech recognition error:", event.error);
//             };

//             setRecognition(recog);
//         }
//     }, [language]);

//     const sendMessage = async (e) => {
//         e.preventDefault();
//         if (!message.trim()) return;

//         const userMessage = { sender: "user", text: message };
//         setChat([...chat, userMessage]);

//         try {
//             const response = await fetch("http://localhost:8080/get", {
//                 method: "POST",
//                 headers: { "Content-Type": "application/x-www-form-urlencoded" },
//                 body: new URLSearchParams({ msg: message }).toString(),
//             });

//             const botResponse = await response.text();
//             setChat([...chat, userMessage, { sender: "bot", text: botResponse }]);
//         } catch (error) {
//             console.error("Error:", error);
//         }

//         setMessage("");
//     };

//     const startVoiceRecognition = () => {
//         if (recognition) {
//             recognition.lang = language;
//             recognition.start();
//         }
//     };

//     return (
//         <div>
//             {/* Floating Chat Button */}
//             <button
//                 className="fixed bottom-7 right-7 bg-blue-500 text-white p-5 rounded-full shadow-lg hover:scale-110 transition"
//                 onClick={() => setIsOpen(!isOpen)}
//             >
//                 <FaComments size={30} />
//             </button>

//             {/* Chat Box */}
//             <div
//         className={`fixed bottom-20 right-20 w-120 bg-gray-900 text-white rounded-lg shadow-lg transition-transform ${
//           isOpen ? "scale-100" : "scale-0"
//         } z-50`} // Added z-index here
//       >
//                 {/* Chat Header */}
//                 <div className="bg-blue-500 p-4 flex items-center justify-between">
//                     <div className="flex items-center">
//                         <img
//                             src="https://res.cloudinary.com/dikn6soje/image/upload/v1739712908/dgrkqyrs6wcwnncfc1ih.jpg"
//                             alt="Bot"
//                             className="w-10 h-10 rounded-full mr-2"
//                         />
//                         <div>
//                             <h2 className="font-bold">ChaturBot</h2>
//                             <p className="text-sm">Ask me anything!</p>
//                         </div>
//                     </div>
//                     <button onClick={() => setIsOpen(false)} className="text-white">
//                         <FaTimes size={20} />
//                     </button>
//                 </div>

//                 {/* Chat Body */}
//                 <div className="p-4 h-96 overflow-y-auto bg-gray-800">
//                     {chat.map((msg, index) => (
//                         <div key={index} className={`flex ${msg.sender === "user" ? "justify-end" : "justify-start"} mb-4`}>
//                             {msg.sender !== "user" && (
//                                 <img
//                                     src="https://cdn-icons-png.flaticon.com/512/387/387569.png"
//                                     alt="Bot"
//                                     className="w-8 h-8 rounded-full mr-2"
//                                 />
//                             )}
//                             <div className={`p-2 rounded-lg ${msg.sender === "user" ? "bg-green-500" : "bg-blue-500"} max-w-xs`}>
//                                 {msg.text}
//                             </div>
//                         </div>
//                     ))}
//                 </div>

//                 {/* Chat Footer */}
//                 <form onSubmit={sendMessage} className="flex p-4 bg-gray-700">
//                     <input
//                         type="text"
//                         value={message}
//                         onChange={(e) => setMessage(e.target.value)}
//                         placeholder="Type a message..."
//                         className="flex-grow p-2 rounded-l-lg text-black"
//                         required
//                     />
                    
//                     {/* Language Selector */}
//                     <select
//                         className="bg-gray-600 text-white p-2 rounded"
//                         value={language}
//                         onChange={(e) => setLanguage(e.target.value)}
//                     >
//                         <option value="en-US">English (US)</option>
//                         <option value="te-IN">Telugu</option>
//                         <option value="hi-IN">Hindi</option>
//                         <option value="ta-IN">Tamil</option>
//                         <option value="kn-IN">Kannada</option>
//                         <option value="es-ES">Spanish</option>
//                         <option value="fr-FR">French</option>
//                         <option value="de-DE">German</option>
//                         <option value="zh-CN">Chinese</option>
//                     </select>

//                     {/* Voice Button */}
//                     <button type="button" onClick={startVoiceRecognition} className="bg-gray-500 p-2 text-white">
//                         <FaMicrophone size={20} />
//                     </button>

//                     {/* Send Button */}
//                     <button type="submit" className="bg-blue-500 p-2 rounded-r-lg text-white hover:bg-blue-600">
//                         <FaPaperPlane size={20} />
//                     </button>
//                 </form>
//             </div>
//         </div>
//     );
// };

// export default Chatbot;






import React, { useState, useEffect } from "react";
import { FaComments, FaTimes, FaMicrophone, FaPaperPlane } from "react-icons/fa";

const Chatbot = () => {
    const [isOpen, setIsOpen] = useState(false);
    const [message, setMessage] = useState("");
    const [chat, setChat] = useState([]);
    const [recognition, setRecognition] = useState(null);
    const [language, setLanguage] = useState("en-US");

    useEffect(() => {
        if ("webkitSpeechRecognition" in window) {
            const recog = new window.webkitSpeechRecognition();
            recog.continuous = false;
            recog.interimResults = false;
            recog.lang = language;

            recog.onresult = (event) => {
                setMessage(event.results[0][0].transcript);
            };

            recog.onerror = (event) => {
                console.error("Speech recognition error:", event.error);
            };

            setRecognition(recog);
        }
    }, [language]);

    const getCurrentTimestamp = () => {
        const now = new Date();
        return now.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', second: '2-digit' });
    };
    

    const translateToEnglish = async (text) => {
        try {
            const response = await fetch("http://localhost:8080/translate", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ text }),
            });
            const data = await response.json();
            return data.translatedText;
        } catch (error) {
            console.error("Translation error:", error);
            return text;
        }
    };

    const sendMessage = async (e) => {
        e.preventDefault();
        if (!message.trim()) return;

        const userMessage = {
            sender: "user",
            text: message,
            time: getCurrentTimestamp()
        };
        setChat((prevChat) => [...prevChat, userMessage]);

        const typingMessage = {
            sender: "bot",
            text: "Typing...",
            time: getCurrentTimestamp()
        };
        setChat((prevChat) => [...prevChat, typingMessage]);

        try {
            const translatedMessage = await translateToEnglish(message);

            const response = await fetch("http://localhost:8080/get", {
                method: "POST",
                headers: { "Content-Type": "application/x-www-form-urlencoded" },
                body: new URLSearchParams({ msg: translatedMessage }).toString(),
            });

            const botResponse = await response.text();

            setChat((prevChat) => {
                const updatedChat = prevChat.filter((msg) => msg.text !== "Typing...");
                return [...updatedChat, { sender: "bot", text: botResponse, time: getCurrentTimestamp() }];
            });
        } catch (error) {
            console.error("Error:", error);
        }

        setMessage("");
    };

    const startVoiceRecognition = () => {
        if (recognition) {
            recognition.lang = language;
            recognition.start();
        }
    };

    return (
        <div>
            <button
                className="fixed bottom-7 right-7 bg-blue-500 text-white p-5 rounded-full shadow-lg hover:scale-110 transition"
                onClick={() => setIsOpen(!isOpen)}
            >
                <FaComments size={30} />
            </button>

            <div
                className={`fixed bottom-20 right-20 w-120 bg-gray-900 text-white rounded-lg shadow-lg transition-transform ${isOpen ? "scale-100" : "scale-0"} z-50`}
            >
                <div className="bg-blue-500 p-4 flex items-center justify-between">
                    <div className="flex items-center">
                        <img
                            src="https://res.cloudinary.com/dikn6soje/image/upload/v1739712908/dgrkqyrs6wcwnncfc1ih.jpg"
                            alt="Bot"
                            className="w-10 h-10 rounded-full mr-2"
                        />
                        <div>
                            <h2 className="font-bold">ChaturBot</h2>
                            <p className="text-sm">Ask me anything!</p>
                        </div>
                    </div>
                    <button onClick={() => setIsOpen(false)} className="text-white">
                        <FaTimes size={20} />
                    </button>
                </div>

                <div className="p-4 h-96 overflow-y-auto bg-gray-800">
                    {chat.map((msg, index) => (
                        <div
                            key={index}
                            className={`flex ${msg.sender === "user" ? "justify-end" : "justify-start"} mb-4`}
                        >
                            {msg.sender !== "user" && (
                                <img
                                    src="https://res.cloudinary.com/dikn6soje/image/upload/v1739712908/dgrkqyrs6wcwnncfc1ih.jpg"
                                    alt="Bot"
                                    className="w-8 h-8 rounded-full mr-2"
                                />
                            )}
                            <div className="flex flex-col items-end">
                                <div
                                    className={`p-2 rounded-lg ${msg.sender === "user" ? "bg-green-500" : "bg-blue-500"} max-w-xs`}
                                >
                                    {msg.text}
                                </div>
                                <span className="text-xs text-gray-400 mt-1">
                                    {msg.time}
                                </span>
                            </div>
                        </div>
                    ))}
                </div>

                <form onSubmit={sendMessage} className="flex p-4 bg-gray-700">
                    <input
                        type="text"
                        value={message}
                        onChange={(e) => setMessage(e.target.value)}
                        placeholder="Type a message..."
                        className="flex-grow p-2 rounded-l-lg text-black"
                        required
                    />

                    <select
                        className="bg-gray-600 text-white p-2 rounded"
                        value={language}
                        onChange={(e) => setLanguage(e.target.value)}
                    >
                        <option value="en-US">English (US)</option>
                        <option value="te-IN">Telugu</option>
                        <option value="hi-IN">Hindi</option>
                        <option value="ta-IN">Tamil</option>
                        <option value="kn-IN">Kannada</option>
                        <option value="es-ES">Spanish</option>
                        <option value="fr-FR">French</option>
                        <option value="de-DE">German</option>
                        <option value="zh-CN">Chinese</option>
                    </select>

                    <button type="button" onClick={startVoiceRecognition} className="bg-gray-500 p-2 text-white">
                        <FaMicrophone size={20} />
                    </button>

                    <button type="submit" className="bg-blue-500 p-2 rounded-r-lg text-white hover:bg-blue-600">
                        <FaPaperPlane size={20} />
                    </button>
                </form>
            </div>
        </div>
    );
};

export default Chatbot;


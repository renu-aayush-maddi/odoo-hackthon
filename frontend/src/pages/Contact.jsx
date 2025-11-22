import React from 'react';
import { Mail, Phone, MapPin } from 'lucide-react'; // Importing lucide-react icons
import { toast } from 'react-hot-toast'; // Importing react-hot-toast

const Contact = () => {
  const onSubmit = async (event) => {
    event.preventDefault();
    const formData = new FormData(event.target);

    formData.append("access_key", "e5a82009-25cd-4e4f-96cb-50df703d0933");

    const object = Object.fromEntries(formData);
    const json = JSON.stringify(object);

    const res = await fetch("https://api.web3forms.com/submit", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json"
      },
      body: json
    }).then((res) => res.json());

    if (res.success) {
      event.target.reset(); // Clear the form fields immediately
      setTimeout(() => {
        toast.success("Message sent successfully!"); // Show success toast message
      }, 100); // Delay for 100 milliseconds (0.1 seconds)
    }
  };

  return (
    <div className="bg-gray-100 min-h-screen py-10">
      <div className="text-center">
        <h1 className="text-4xl font-bold text-emerald-600 mb-4">Get in Touch</h1>
      </div>
      <div className="flex justify-center items-center py-10">
        <div className="max-w-5xl w-full flex flex-col lg:flex-row gap-8 px-4">
          <div className="flex-1 bg-white shadow-lg rounded-lg p-8">
            <h2 className="text-3xl font-semibold text-emerald-600 mb-4">Let's Talk</h2>
            <p className="text-lg mb-6">I'm currently working on ML and MERN Projects. Feel free to get in touch with me!</p>
            <div className="space-y-4">
              <div className="flex items-center gap-4">
                <Mail className="w-6 h-6 text-emerald-500" />
                <p className="text-lg text-black">renuaayushm@gmail.com</p>
              </div>
              <div className="flex items-center gap-4">
                <Phone className="w-6 h-6 text-emerald-500" />
                <p className="text-lg text-black">+91 9396763455</p>
              </div>
              <div className="flex items-center gap-4">
                <MapPin className="w-6 h-6 text-emerald-500" />
                <p className="text-lg text-black">Guntur, India</p>
              </div>
            </div>
          </div>

          <form onSubmit={onSubmit} className="flex-1 bg-white shadow-lg rounded-lg p-8">
            <h2 className="text-3xl font-semibold text-emerald-600 mb-4">Contact Form</h2>
            <label htmlFor="name" className="block text-lg font-medium mb-2">Name</label>
            <input
              type="text"
              name="name"
              placeholder="Enter your name"
              required
              className="w-full p-3 mb-4 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-400 text-black"
            />
            <label htmlFor="email" className="block text-lg font-medium mb-2">E-mail</label>
            <input
              type="email"
              name="email"
              placeholder="Enter your email"
              required
              className="w-full p-3 mb-4 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-400 text-black"
            />
            <label htmlFor="message" className="block text-lg font-medium mb-2">Message</label>
            <textarea
              name="message"
              rows="8"
              placeholder="Enter your message"
              required
              className="w-full p-3 mb-4 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-400 text-black"
            />
            <button type="submit" className="w-full py-3 bg-emerald-600 text-white rounded-lg hover:bg-emerald-700 transition duration-300">Submit Now</button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Contact;

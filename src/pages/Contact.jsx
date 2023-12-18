import { useRef } from "react";
import { useState } from "react";
import emailJs from "@emailjs/browser";

const Contact = () => {
  const formRef = useRef(null);

  const [form, setForm] = useState({ name: "", email: "", message: "" });
  const [isLoading, setIsLoading] = useState(false);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsLoading(true);

    emailJs
      .send(
        import.meta.env.VITE_APP_EMAILJS_SERVICE_ID,
        import.meta.env.VITE_APP_EMAILJS_TEMPLATE_ID,
        {
          from_name: form.name,
          to_name: "Ivan",
          from_email: form.email,
          to_email: "delfatti.ivan@gmail.com",
          message: form.message,
        },
        import.meta.env.VITE_APP_EMAILJS_PUBLIC_KEY
      )
      .then(() => {
        setIsLoading(false);
        // TODO: Show success message
        // TODO: Hide an alert

        setForm({ name: "", email: "", message: "" });
      })
      .catch((error) => {
        setIsLoading(false);
        console.log("🔎 [error] =>", error);
        // TODO: Show error message
      });
  };

  const handleFocus = () => {};
  const handleBlur = () => {};

  return (
    <section className="relative flex lg:flex-row flex-col max-container">
      <div className="flex-1 main-w-[50%] flex flex-col">
        <h1 className="head-text">Get in touch</h1>

        <form
          ref={formRef}
          className="w-full flex flex-col gap-7 mt-14"
          onSubmit={handleSubmit}
        >
          <label htmlFor="name" className="text-black-500 font-semibold">
            Name
            <input
              id="name"
              type="text"
              name="name"
              className="input"
              placeholder="John"
              required
              value={form.name}
              onChange={handleChange}
              onFocus={handleFocus}
              onBlur={handleBlur}
            />
          </label>

          <label htmlFor="" className="text-black-500 font-semibold">
            Email
            <input
              type="text"
              name="email"
              className="input"
              placeholder="John@gmail.com"
              required
              value={form.email}
              onChange={handleChange}
              onFocus={handleFocus}
              onBlur={handleBlur}
            />
          </label>

          <label htmlFor="" className="text-black-500 font-semibold">
            Your message
            <textarea
              type="text"
              name="message"
              className="textarea"
              placeholder="Let me now hot i can help you!"
              required
              value={form.message}
              onChange={handleChange}
              onFocus={handleFocus}
              onBlur={handleBlur}
            />
          </label>

          <button
            type="submit"
            className="btn"
            onFocus={handleFocus}
            onBlur={handleBlur}
            disabled={isLoading}
          >
            {isLoading ? "Sending..." : "Send message"}
          </button>
        </form>
      </div>
    </section>
  );
};

export default Contact;

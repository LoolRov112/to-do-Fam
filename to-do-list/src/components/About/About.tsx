import React from "react";
import AccordionCard from "./AccordionCard";

const About = () => {
  return (
    <div className="max-w-4xl mx-auto h-full p-6 space-y-4 md:grid md:grid-cols-2 md:gap-6 md:space-y-0 bg-[#F4F7F5]">
      <div>
        <div className="flex items-center space-x-3 mb-2">
          <img
            className="h-10 w-10 object-cover"
            src="../imgs/aboutImgs/who.png"
            alt=""
          />
        </div>
        <AccordionCard title="Who We Are">
          <p className="text-[#5B85AA]">
            We are a passionate family-focused team dedicated to helping you
            organize your daily tasks with ease and collaboration.
          </p>
        </AccordionCard>
      </div>

      <div>
        <div className="flex items-center space-x-3 mb-2">
          <img
            className="h-10 w-10 object-cover"
            src="../imgs/aboutImgs/offers.png"
            alt=""
          />
        </div>
        <AccordionCard title="What We Offer">
          <p className="text-[#5B85AA]">
            Our app provides intuitive task management, shared calendars, and
            easy communication tools to keep your family connected and
            productive.
          </p>
        </AccordionCard>
      </div>

      <div>
        <div className="flex items-center space-x-3 mb-2">
          <img
            className="h-10 w-10 object-cover"
            src="../imgs/aboutImgs/serve.png"
            alt=""
          />
        </div>
        <AccordionCard title="Who We Serve">
          <p className="text-[#5B85AA]">
            We serve families and close-knit groups who want to streamline their
            daily lives, ensuring everyone stays on the same page effortlessly.
          </p>
        </AccordionCard>
      </div>

      <div>
        <div className="flex items-center space-x-3 mb-2">
          <img
            className="h-10 w-10 object-cover"
            src="../imgs/aboutImgs/toDo.png"
            alt=""
          />
        </div>
        <AccordionCard title="How to Use">
          <p className="text-[#5B85AA]">
            Register or log in to your family account. Once inside, create and
            assign tasks, set deadlines, and track progress easily from your
            dashboard.
          </p>
        </AccordionCard>
      </div>
    </div>
  );
};

export default About;

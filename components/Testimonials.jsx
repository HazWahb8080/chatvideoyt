/* eslint-disable @next/next/no-img-element */
import React from "react";

function Testimonials() {
  return (
    <div
      id="Testimonials"
      className="py-20 px-8 w-full min-h-screen bg-[#F8FAFC]
    items-center justify-start flex flex-col"
    >
      <h2 className="text-black font-medium text-5xl text-center">
        Loved by businesses worldwide.
      </h2>
      <p className="text-lg w-2/3 text-center mt-6">
        Our software is so simple that people can’t help but fall in love with
        it. Simplicity is easy when you just skip tons of mission-critical
        features.
      </p>
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 mt-20">
        {testimonailItems.map((item) => (
          <div
            key={item.id}
            className="bg-white rounded-xl border border-black/10 py-10 h-fit
             px-4 items-start justify-between flex flex-col shadow-black/10 shadow-lg"
          >
            <h3 className="text-lg">{item.content}</h3>
            <span className="flex items-center justify-between w-full mt-6">
              <span>
                <p>{item.author.name}</p>
                <p>{item.author.title}</p>
              </span>
              <img
                src={item.author.image}
                alt={item.author.name}
                className="w-32 object-center rounded-full"
              />
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Testimonials;

const testimonailItems = [
  {
    id: 0,
    content: `chatVideo is so easy to use I can’t help but wonder if it’s really doing the things the government expects me to do.`,
    author: {
      name: "Sheryl Berge",
      title: "CEO at Lynch LLC",
    },
  },
  {
    id: 1,
    content: `The best part about TaxPal is every time I pay my employees, my bank balance doesn’t go down like it used to. Looking forward to spending this extra cash when I figure out why my card is being declined.`,
    author: {
      name: "Leland Kiehn",
      title: "Founder of Kiehn and Sons",
    },
  },
  {
    id: 2,
    content: `I used to have to remit tax to the EU and with TaxPal I somehow don’t have to do that anymore. Nervous to travel there now though.`,
    author: {
      name: "Peter Renolds",
      title: "Founder of West Inc",
    },
  },
  {
    id: 4,
    content: `I used to have to remit tax to the EU and with TaxPal I somehow don’t have to do that anymore. Nervous to travel there now though.`,
    author: {
      name: "Peter Renolds",
      title: "Founder of West Inc",
    },
  },
  {
    id: 5,
    content: `chatVideo is so easy to use I can’t help but wonder if it’s really doing the things the government expects me to do.`,
    author: {
      name: "Sheryl Berge",
      title: "CEO at Lynch LLC",
    },
  },
  {
    id: 6,
    content: `The best part about TaxPal is every time I pay my employees, my bank balance doesn’t go down like it used to. Looking forward to spending this extra cash when I figure out why my card is being declined.`,
    author: {
      name: "Leland Kiehn",
      title: "Founder of Kiehn and Sons",
    },
  },
];

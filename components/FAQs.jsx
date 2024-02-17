import React from "react";

function FAQs() {
  return (
    <div className="min-h-screen w-full items-start justify-start flex flex-col pt-24 pb-12 px-8">
      <h2 className="text-4xl text-black font-medium">
        Frequently asked questions
      </h2>
      <p className="text-lg w-1/2 pt-6">
        If you can’t find what you’re looking for, email our support team and if
        you’re lucky someone will get back to you.
      </p>
      <div className="w-full grid grid-cols-3 gap-8 mt-10">
        {Qs.map((question) => (
          <div key={question.id} className="space-y-3 h-fit">
            <h3 className="text-lg font-medium">{question.q}</h3>
            <p className="text-sm">{question.a}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

export default FAQs;

const Qs = [
  {
    id: 0,
    q: "Does TaxPal handle VAT?",
    a: "Well no, but if you move your company offshore you can probably ignore it.",
  },
  {
    id: 1,
    q: "TaxPal sounds horrible but why do I still feel compelled to purchase?",
    a: "This is the power of excellent visual design. You just can’t resist it, no matter how poorly it actually functions.",
  },
  {
    id: 2,
    q: "Does TaxPal handle VAT?",
    a: "Well no, but if you move your company offshore you can probably ignore it.",
  },
  {
    id: 3,
    q: "Does TaxPal handle VAT?",
    a: "Well no, but if you move your company offshore you can probably ignore it.",
  },
  {
    id: 4,
    q: "I found other companies called TaxPal, are you sure you can use this name?",
    a: "Honestly not sure at all. We haven’t actually incorporated or anything, we just thought it sounded cool and made this website.",
  },
  {
    id: 5,
    q: "Does TaxPal handle VAT?",
    a: "Well no, but if you move your company offshore you can probably ignore it.",
  },
  {
    id: 6,
    q: "Does TaxPal handle VAT?",
    a: "Well no, but if you move your company offshore you can probably ignore it.",
  },
  {
    id: 7,
    q: "Does TaxPal handle VAT?",
    a: "Well no, but if you move your company offshore you can probably ignore it.",
  },
];

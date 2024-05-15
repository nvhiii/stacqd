import React from "react";
import "../index.css";

export default function Home() {
  return (
    <div className="px-4 py-12 max-w-2xl mx-auto">
      <h1 className="text-3xl font-bold mb-4">STACQD</h1>
      <p className="text-3xl mb-5 mt-3">Find Hidden Opportunities.</p>
      <p>
        Want to get ahead of your competition? Let's get you stacqd! (stacked)
      </p>
      <div className="logos">
        <div className="logos-slide">
          <img src="../imgs/google.svg"></img>
          <img src="../imgs/meta.svg"></img>
          <img src="../imgs/apple.svg"></img>
          <img src="../imgs/openai.svg"></img>
          <img src="../imgs/mcdonalds.svg"></img>
          <img src="../imgs/amazon.svg"></img>
          <img src="../imgs/jane_street.svg"></img>
          <img src="../imgs/microsoft.svg"></img>
          <img src="../imgs/netflix.svg"></img>
          <img src="../imgs/citadel.svg"></img>
        </div>
      </div>
    </div>
  );
}

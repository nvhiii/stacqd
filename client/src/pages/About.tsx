import React from "react";
import Home from "./Home.tsx";

export default function About() {
  return (
    <div className="max-w-2xl mx-auto">
      <h1 className="text-center text-3xl pt-5 pb-5">Our Mission</h1>
      <p className="pb-5">
        We know how it feels to be an underprivileged student when it comes to
        hunting for and finding jobs.
      </p>
      <p className="pb-5">
        That's why our founder brainstormed for a bit and thought about what
        other job searching applicants often lack
      </p>
      <p className="pb-5">
        He collected information on all major job platforms, and he noted what
        he liked and disliked about each.
      </p>
      <p className="pb-5">
        Then, he took some time to plan it all out and hit the ground running.
      </p>
      <p className="pb-5">Thus, STACQD was born!</p>
    </div>
  );
}

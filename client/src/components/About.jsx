import React from "react";
import Navbar from "./Navbar";
export default function About() {
  return (
    <>
      <Navbar />
      <h1
        style={{
          color: "white",
          minHeight: "100vh",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        About...
      </h1>
    </>
  );
}

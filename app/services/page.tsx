import React from "react";

const Services = () => {
  const serviceData = [
    {
      number: 1,
      title: "Community Service",
      description:
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam justo nunc, scelerisque vel odio at, efficitur tincidunt justo.",
    },
    {
      number: 2,
      title: "Leadership",
      description:
        "Duis autem vel eum iriure dolor in hendrerit in vulputate velit esse molestie consequat, vel illum dolore eu feugiat nulla facilisis.",
    },
    {
      number: 3,
      title: "Development",
      description:
        "Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.",
    },
    {
      number: 4,
      title: "Entertainment",
      description:
        "Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
    },
  ];

  return (
    
    <div style={{ marginBottom: "10%", width: "100%", height: "100vh", display: "flex", justifyContent: "center", alignItems: "center" }}>
      <br/>
      <br/>
      <div style={{ padding: "20px", maxWidth: "600px", textAlign: "center", background: "#f5f5f5" }}>
        <h4 style={{ color: "green", marginBottom: "3%", fontFamily: "cursive", fontSize: "2rem" }}>
          Explore Our Services
        </h4>

        {serviceData.map((service) => (
          <div key={service.number} style={{ marginTop: "3%" }}>
            <h5 style={{ marginBottom: "2%" }}>{service.title}</h5>
            <p>{service.description}</p>
          </div>
        ))}

        <center>
        <a href = "/contact-us">
        <button style={{ display: "block", marginTop: "16px", padding: "10px 20px", background: "#4CAF50", color: "white", border: "none", borderRadius: "5px", cursor: "pointer" }}>
          Interested, Work with Us!
        </button>
        </a>
        </center>
      </div>
    </div>
  );
};

export default Services;

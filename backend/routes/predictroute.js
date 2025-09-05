import express from "express";
import axios from "axios";
import { Router } from "express";

const predictroute = Router();

predictroute.post("/predict", async (req, res) => {
  try {
    const { State, City, Grade, Purity, Quantity} = req.body;

    
    const payload = {
      State,
      City,
      Grade,
      Purity: parseFloat(Purity),
      Quantity: parseFloat(Quantity), 
    };

    const response = await axios.post("http://127.0.0.1:5000/predict", payload, {
      headers: { "Content-Type": "application/json" },
    });

    res.json(response.data);
  } catch (error) {
    console.error("Error occurred:", error.response?.data || error.message);
    res.status(500).json({
      error: "An error occurred while making prediction.",
      details: error.response?.data || error.message,
    });
  }
});

export default predictroute;

import express from "express";
import axios from "axios"
import { Router } from "express";
const predictroute = Router();

predictroute.post("/predict", async (req, res) => {
    try {
        const response = await axios.post("http://localhost:5000/predict", req.body);
        res.json(response.data);
    } catch (error) {
        console.error("Error occurred :", error);
        res.status(500).json({ error: "An error occurred while making prediction." });
    }
});

export default predictroute;

import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import axios from 'axios';
import { scrapeTrainStatus } from './services/scraperService.js';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

// Root test route
app.get('/', (req, res) => {
    res.json({ message: 'Railway App Backend is live and working!' });
});

// Train Live Status Route (Primary API -> Fallback Scraper)
app.get('/api/train-status/:trainNo', async (req, res) => {
    const { trainNo } = req.params;

    try {
        // 1. TRY PRIMARY SOURCE (RapidAPI)
        const apiKey = process.env.RAPIDAPI_KEY;

        if (!apiKey) {
            throw new Error('No API key configured. Triggering Fallback Scraper.');
        }

        const apiResponse = await axios.get(`https://irctc-indian-railway-pnr-status.p.rapidapi.com/live-train/${trainNo}/status`, {
            headers: {
                'X-RapidAPI-Key': apiKey,
                'X-RapidAPI-Host': 'irctc-indian-railway-pnr-status.p.rapidapi.com'
            },
            timeout: 5000
        });

        return res.json({
            trainNumber: trainNo,
            trainName: apiResponse.data.train_name || `Train #${trainNo}`,
            status: apiResponse.data.status || 'Running',
            source: 'Primary API',
            lastUpdated: new Date().toLocaleTimeString()
        });

    } catch (primaryError) {
        console.warn(`[API Fallback Triggered] ${primaryError.message}`);

        try {
            // 2. FALLBACK TO SCRAPER
            const scrapedData = await scrapeTrainStatus(trainNo);
            return res.json(scrapedData);
        } catch (scraperError) {
            return res.status(500).json({
                error: 'Failed to retrieve status from both Primary API and Scraper Fallback.',
                details: scraperError.message
            });
        }
    }
});

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
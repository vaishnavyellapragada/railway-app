import axios from 'axios';
import * as cheerio from 'cheerio';

export const scrapeTrainStatus = async (trainNo) => {
    try {
        // Public URL pattern for train status
        const url = `https://www.railyatri.in/live-train-status/${trainNo}`;

        const response = await axios.get(url, {
            headers: {
                'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36'
            },
            timeout: 5000 // 5 seconds limit
        });

        const $ = cheerio.load(response.data);

        // Extract key details from HTML selectors
        const trainName = $('.train-name-header').text().trim() || `Train #${trainNo}`;
        const currentStatus = $('.current-status-info').text().trim() || 'Status fetched via Scraper fallback';

        return {
            success: true,
            source: 'Web Scraper (Fallback)',
            trainNumber: trainNo,
            trainName: trainName,
            status: currentStatus,
            lastUpdated: new Date().toLocaleTimeString()
        };
    } catch (error) {
        throw new Error('Scraper failed to parse station data: ' + error.message);
    }
};
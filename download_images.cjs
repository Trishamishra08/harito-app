const https = require('https');
const fs = require('fs');

function fetchImage(title, filename) {
    const url = `https://en.wikipedia.org/w/api.php?action=query&titles=${title}&prop=pageimages&format=json&pithumbsize=800`;
    https.get(url, { headers: { 'User-Agent': 'Mozilla/5.0 Tool' } }, (res) => {
        let body = '';
        res.on('data', chunk => body += chunk);
        res.on('end', () => {
            const data = JSON.parse(body);
            const pages = data.query.pages;
            const pageId = Object.keys(pages)[0];
            if (pages[pageId] && pages[pageId].thumbnail) {
                const imgUrl = pages[pageId].thumbnail.source;
                console.log(`Downloading ${filename} from ${imgUrl}`);
                
                https.get(imgUrl, { headers: { 'User-Agent': 'Mozilla/5.0 Tool' } }, (imgRes) => {
                    const file = fs.createWriteStream(filename);
                    imgRes.pipe(file);
                    file.on('finish', () => console.log(`Done with ${filename}`));
                });
            } else {
                console.log(`No image found for ${title}`);
            }
        });
    });
}

fetchImage('Tractor', 'public/category_equipment.jpg');
fetchImage('Seed', 'public/category_seeds.jpg');

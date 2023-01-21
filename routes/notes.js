
const router = require("express").Router();
const fs = require('fs');
const { v4: uuidv4 } = require('uuid');


// this is where routes go
router.get("/", (req, res) => {
  fs.readFile('./db/db.json', 'utf-8', (err, data) => {
    if (err){console.log(err)}
    else {res.json(JSON.parse(data))}
  })
});

router.post("/", (req, res) => {
    const {title, text} = req.body;
    const db = JSON.parse(fs.readFileSync('./db/db.json', (err) => { if (err) console.log(err)}));
    const item = {
        id: uuidv4(), 
        title,
        text
    }
    db.push(item);
    fs.writeFileSync('./db/db.json', JSON.stringify(db, null, 2));
    res.json(item);
});

router.delete('/:id', (req, res) => {
        const db = JSON.parse(fs.readFileSync('./db/db.json', (err) => { if (err) console.log(err)}));
         const newDb = db.filter((note) => {
            return note.id !== req.params.id;
        });
        fs.writeFileSync('./db/db.json', JSON.stringify(newDb, null, 2));
        res.json({message: `Deleted ${req.params.id}`});
    });

module.exports = router;

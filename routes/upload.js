const express = require('express');
const multer = require('multer');
const XLSX = require('xlsx');
const Company = require('../models/Company');
const router = express.Router();

const upload = multer({ dest: 'uploads/' });

router.post('/upload/:mode', upload.single('file'), async (req, res) => {
  const file = req.file;
  const mode = parseInt(req.params.mode);
  const workbook = XLSX.readFile(file.path);
  const sheet = workbook.Sheets[workbook.SheetNames[0]];
  const data = XLSX.utils.sheet_to_json(sheet);

  let inserted = 0, updated = 0, skipped = 0;

  for (const row of data) {
    const { email, name, industry, location, phone } = row;
    if (!email) {
      skipped++;
      continue;
    }

    const existing = await Company.findOne({ email });

    const newData = { name, industry, location, phone };

    if (mode === 1) {
      if (!existing) {
        await Company.create({ email, ...newData });
        inserted++;
      } else skipped++;
    }

    else if (mode === 2) {
      if (!existing) {
        await Company.create({ email, ...newData });
        inserted++;
      } else {
        let updatedFields = {};
        for (let key in newData) {
          if (!existing[key] && newData[key]) {
            updatedFields[key] = newData[key];
          }
        }
        if (Object.keys(updatedFields).length) {
          await Company.updateOne({ email }, { $set: updatedFields });
          updated++;
        } else skipped++;
      }
    }

    else if (mode === 3) {
      if (!existing) {
        await Company.create({ email, ...newData });
        inserted++;
      } else {
        await Company.updateOne({ email }, { $set: newData });
        updated++;
      }
    }

    else if (mode === 4) {
      if (existing) {
        let updatedFields = {};
        for (let key in newData) {
          if (!existing[key] && newData[key]) {
            updatedFields[key] = newData[key];
          }
        }
        if (Object.keys(updatedFields).length) {
          await Company.updateOne({ email }, { $set: updatedFields });
          updated++;
        } else skipped++;
      } else skipped++;
    }

    else if (mode === 5) {
      if (existing) {
        await Company.updateOne({ email }, { $set: newData });
        updated++;
      } else skipped++;
    }
  }

  res.json({ status: "success", inserted, updated, skipped });
});

module.exports = router;

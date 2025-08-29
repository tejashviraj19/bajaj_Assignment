// api/bfhl.js
const express = require('express');
const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());

const FULL_NAME = "john_doe";  
const DOB = "17091999";       
const EMAIL = "john@xyz.com";  
const ROLL_NUMBER = "ABCD123"; 

function alternateCapsReverse(str) {
    let reversed = str.split('').reverse();
    return reversed.map((ch, i) => i % 2 === 0 ? ch.toUpperCase() : ch.toLowerCase()).join('');
}

app.get('/bfhl', (req, res) => {
    res.status(200).json({message: 'GET request received', operation_code: 1 });
});

app.post('/bfhl', (req, res) => {
    try {
      const data = req.body.data || [];
      let evenNumbers = [];
      let oddNumbers = [];
      let alphabets = [];
      let specialChars = [];
      let sum = 0;
      let allAlphabets = '';

      data.forEach(item => {
          if (/^\d+$/.test(item)) {
              let num = parseInt(item, 10);
              sum += num;
              if (num % 2 === 0) evenNumbers.push(item);
              else oddNumbers.push(item);
          } else if (/^[a-zA-Z]+$/.test(item)) {
              alphabets.push(item.toUpperCase());
              allAlphabets += item;
          } else {
              specialChars.push(item);
          }
      });

      const concatString = alternateCapsReverse(allAlphabets);

      return res.status(200).json({
          is_success: true,
          user_id: `${FULL_NAME}_${DOB}`,
          email: EMAIL,
          roll_number: ROLL_NUMBER,
          odd_numbers: oddNumbers,
          even_numbers: evenNumbers,
          alphabets: alphabets,
          special_characters: specialChars,
          sum: sum.toString(),
          concat_string: concatString
      });

    } catch (error) {
      return res.status(500).json({ is_success: false, message: error.message });
    }
});

app.listen(PORT, () => {
    console.log(`Server running at http://localhost:${PORT}`);
});

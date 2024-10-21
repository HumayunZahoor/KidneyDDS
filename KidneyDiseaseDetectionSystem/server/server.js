import express from 'express';
import mysql from 'mysql';
import cors from 'cors';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';
import cookieParser from 'cookie-parser';
import multer from 'multer';

const salt = 10;

const app = express();
app.use(express.json());
app.use(cors({
  origin: ["http://localhost:3000"],
  methods: ["POST", "GET"],
  credentials: true
}));




// app.use(cookieParser());
app.use(cookieParser('jwt-secret-key', { sameSite: 'None', secure: true }));

app.use(express.static('public'));



const db = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: '',
  database: 'signup',
});

db.connect((err) => {
  if (err) {
    console.error('Database connection error:', err);
  } else {
    console.log('Connected to the database');
  }
});



const verifyUser = (req, res, next) => {
  const token = req.cookies.token;
  if (!token) {
    return res.status(401).json({ Error: 'You are not Authenticated' });
  } else {
    jwt.verify(token, "jwt-secret-key", (err, decoded) => {
      if (err) {
        return res.status(401).json({ Error: 'Token is not okay!' });
      } else {
        req.name = decoded.name;
        req.role = decoded.role;
        next();
      }
    });
  }
};

const verifyDoctor = (req, res, next) => {
  if (req.role === 'Admin') {
    next();
  } else {
    return res.status(403).json({ Error: 'You do not have permission to access this resource' });
  }
};

const verifyPatient = (req, res, next) => {
  if (req.role === 'User') {
    next();
  } else {
    return res.status(403).json({ Error: 'You do not have permission to access this resource' });
  }
};

app.get('/Doctor', verifyUser, verifyDoctor, (req, res) => {
  return res.json({ Status: 'Success', name: req.name });
});

app.get('/Patient', verifyUser, verifyPatient, (req, res) => {
  return res.json({ Status: 'Success', name: req.name });
});

app.get('/Exit', (req, res) => {
  res.clearCookie('token');
  res.send('Logout successful');
});

app.get('/Logout' , (req , res) => {
  res.clearCookie('token');
  return res.json({Status: "Success"});
})





const storage = multer.memoryStorage();
const upload = multer({ storage: storage });


app.post('/UploadXray', verifyUser, upload.single('xrayImage'), (req, res) => {
  console.log(req.file);
  const userId = req.name; 
  

  if (!req.file) {
    return res.status(400).json({ Error: 'No file uploaded' });
  }

  const sql = 'UPDATE login SET image = ? WHERE name = ?';
  const values = [req.file.buffer, userId];
  

  db.query(sql, values, (err, result) => {
    if (err) {
      console.error(err);
      return res.status(500).json({ Error: 'Error updating X-ray image in the database' });
    }

    return res.json({ Status: 'Success', Message: 'X-ray image uploaded successfully' });
  });
});





// Update the SQL query in the /getUserData route to get all users
app.get('/getUserData', verifyUser, (req, res) => {
  const sql = 'SELECT id, name, email, result, prescription FROM login';

  db.query(sql, (err, result) => {
    if (err) {
      console.error('Error executing MySQL query:', err);
      res.status(500).json({ Error: 'Error retrieving user data from the database' });
    } else {
      res.json(result);
    }
  });
});





// Add a route to fetch all users
app.get('/getAllUsers', verifyUser, verifyDoctor, (req, res) => {
  const sql = 'SELECT id, name FROM login';

  db.query(sql, (err, result) => {
    if (err) {
      console.error('Error executing MySQL query:', err);
      res.status(500).json({ Error: 'Error retrieving user data from the database' });
    } else {
      res.json(result);
    }
  });
});


// Add a route to fetch all users
app.get('/getAllUserFeedback', verifyUser, verifyDoctor, (req, res) => {
  const sql = 'SELECT name, email, feedback FROM login';

  db.query(sql, (err, result) => {
    if (err) {
      console.error('Error executing MySQL query:', err);
      res.status(500).json({ Error: 'Error retrieving user data from the database' });
    } else {
      res.json(result);
    }
  });
});





// Add a route to handle adding a prescription
app.post('/addPrescription', verifyUser, verifyDoctor, (req, res) => {
  const { userName, prescription } = req.body;

  if (!userName || !prescription) {
    return res.status(400).json({ Error: 'Missing required fields' });
  }

  const sql = 'UPDATE login SET prescription = ? WHERE name = ?';

  db.query(sql, [prescription, userName], (err, result) => {
    if (err) {
      console.error('Error executing MySQL query:', err);
      res.status(500).json({ Error: 'Error updating prescription in the database' });
    } else {
      if (result.affectedRows > 0) {
        res.json({ Status: 'Success', Message: 'Prescription added successfully' });
      } else {
        res.status(404).json({ Error: 'User not found or prescription not updated' });
      }
    }
  });
});






// Add a route to get the record of the currently logged-in user
app.get('/getMyRecord', verifyUser, (req, res) => {
  const userId = req.name;

  if (!userId) {
    return res.status(401).json({ Error: 'Unauthorized' });
  }

  const sql = 'SELECT id, name, email, prescription, result FROM login WHERE name = ?';

  db.query(sql, [userId], (err, result) => {
    if (err) {
      console.error('Error executing MySQL query:', err);
      res.status(500).json({ Error: 'Error retrieving user record from the database' });
    } else {
      if (result.length > 0) {
        const userRecord = result[0];
        res.json(userRecord);
      } else {
        res.status(404).json({ Error: 'User record not found' });
      }
    }
  });
});










app.post('/Signup', (req, res) => {
  const sql = 'INSERT INTO login (name, role, email, password) VALUES (?, ?, ?, ?)';
  bcrypt.hash(req.body.password.toString(), salt, (err, hash) => {
    if (err) return res.json({ Error: 'Error hashing password' });

    const values = [req.body.name, req.body.role, req.body.email, hash];

    db.query(sql, values, (err, result) => {
      if (err) return res.json({ Error: 'Inserting data error in server' });

      return res.json({ Status: 'Success' });
    });
  });
});

app.post('/Login' , (req , res) =>{
  const sql = 'SELECT * FROM Login where email = ?';
  db.query(sql , [req.body.email], (err , data) => {
    if(err) return res.json({Error: "Login error in server"});
    if(data.length > 0) {
      bcrypt.compare(req.body.password.toString(), data[0].password, (err , response) => {
        if(err) return res.json({Error: "Password compare error"});
        if(response){
          const name = data[0].name;
          const role = data[0].role;
          const token = jwt.sign({name , role }, "jwt-secret-key", {expiresIn: '1d'});
          res.cookie('token' , token);
          return res.json({ Status: 'Success' , role });
        }
        else{
          return res.json({ Error: "Password not matched" });
        }
      })
    }
    else {
      return res.json({Error: "Email not found"});
    }
  })
})





app.get('/api/getImage', verifyUser, (req, res) => {
  const userId = req.name; 

  if (!userId) {
    return res.status(401).json({ Error: 'Unauthorized' });
  }

  const sql = 'SELECT image FROM login WHERE name = ?';

  db.query(sql, [userId], (err, result) => {
    if (err) {
      console.error('Error executing MySQL query:', err);
      res.status(500).json({ Error: 'Error retrieving image from the database' });
    } else {
      if (result.length > 0) {
        const imageData = result[0].image.toString('base64');
        res.json(imageData);
      } else {
        res.status(404).json({ Error: 'Image not found for the user' });
      }
    }
  });
});



app.post('/submitFeedback', verifyUser, (req, res) => {
  const userId = req.name;
  const feedback = req.body.feedback;

  if (!feedback) {
    return res.status(400).json({ Error: 'Feedback is required' });
  }

  const sql = 'UPDATE login SET feedback = ? WHERE name = ?';

  db.query(sql, [feedback, userId], (err, result) => {
    if (err) {
      console.error('Error executing MySQL query:', err);
      return res.status(500).json({ Error: 'Error saving feedback in the database' });
    } else {
      if (result.affectedRows > 0) {
        return res.json({ Status: 'Success', Message: 'Feedback submitted successfully' });
      } else {
        return res.status(404).json({ Error: 'User not found' });
      }
    }
  });
});


app.post('/savePrediction', verifyUser, (req, res) => {
  const userId = req.name;
  const result = req.body.prediction;

  if (!result) {
    return res.status(400).json({ Error: 'Prediction is required' });
  }

  const sql = 'UPDATE login SET result = ? WHERE name = ?';

  db.query(sql, [result, userId], (err, result) => {
    if (err) {
      console.error('Error executing MySQL query:', err);
      return res.status(500).json({ Error: 'Error saving Prediction in the database' });
    } else {
      if (result.affectedRows > 0) {
        return res.json({ Status: 'Success', Message: 'Prediction submitted successfully' });
      } else {
        return res.status(404).json({ Error: 'User not found' });
      }
    }
  });
});






app.listen(8081, () => {
  console.log('Running on port 8081...');
});

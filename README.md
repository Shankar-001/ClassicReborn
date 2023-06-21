CSS Libraries 
antd - building the component
tailwind css - CSS for normal styling

in terminal
for antd installation
```
npm i antd
```

for tailwind installation

```
npm install -D tailwindcss
npx tailwindcss init

```

In tailwind.config.js
```js
/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: '#91caff',
      },
    },
  },
  plugins: [],
  corePlugins: {
    preflight: false,
  },
}

```

in index.css
```css
@tailwind base;
@tailwind components;
@tailwind utilities;
```
install module as required : redux, react-router-dom, react-redux, @reactJs/toolkit

in index.html

add cdn for icon
```html
<link href="https://cdn.jsdelivr.net/npm/remixicon@3.2.0/fonts/remixicon.css" rel="stylesheet">
```

import external google font in index.css


```css
@import url('https://fonts.googleapis.com/css2?family=Poppins:wght@100;200;300;400;500;600;700;800;900&display=swap');
```
```css
* {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
    font-family: 'Poppins', sans-serif !important;
}
```
When you apply !important to a CSS property, it tells the browser to prioritize that specific rule over any other rule that might be applied to the same  element.




create .env
```
PORT = 5000

NODE_MODE = development

MONGO_URL = {connect this from mongodb connect}

```
In Sserver folder

Config/dbconfig.js

```js
import mongoose from 'mongoose';

const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URL);
    console.log('Mongo DB connected successfully');
  } catch (error) {
    console.log(`Mongo Db connection failed ${error}`);
  }
};

export default connectDB;

```

server.js

```js
import express from 'express';
import dotenv from 'dotenv';
import connectDB from './Config/dbConfig.js';


dotenv.config();

connectDB();
const app = express();
app.use(express.json())

const port = process.env.PORT || 5000;

app.listen(port, () => console.log(`Listening on port ${port}`));


```
for frontend

- Axios
- react-router-dom
- redux react-redux @reduxJs/toolkit
- moment (for time and date)

Backend intall these

- express
- mongoose
- jsonwebtoken
- bcryptJs
- cloudinary

nodemon and dotenv install it too

Models/userModels.js

create schema for databse

```js

import mongoose from 'mongoose';
const { Schema } = mongoose;
const userSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      // trim: true,
    },
    password: {
      type: String,
      required: true,
    },
    role: {
      type: String,
      default: 'user',
    },
    status: {
      type: String,
      default: 'Active',
    },
  },
  {
    timestamps: true,
  }
);

const User = mongoose.model('users', userSchema);
export default User;

```

for API endpoints handling with the users

Routes/usersRoute.js

```js
import { Router } from 'express';
import User from '../Models/userModel.js';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';

const router = Router();

// new user registration

router.post('/register', async (req, res) => {
  try {
    const user = await User.findOne({ email: req.body.email });
    // check if user already exists or not
    if (user) {
      //   return res.send({
      //     success: false,
      //     message: 'User already exists',
      //   });
      throw new Error('User already exists');
    }

    // hash password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(req.body.password, salt);
    req.body.password = hashedPassword;

    // create new user
    const newUser = new User(req.body);
    await newUser.save();
    res.send({
      success: true,
      message: 'User Created Successfully',
    });
  } catch (error) {
    res.send({
      success: false,
      message: error.message,
    });
  }
});

// User Login

router.post('/login', async (req, res) => {
  try {
    const user = await User.findOne({ email: req.body.email });
    // check if user already exists or not
    if (!user) {
      throw new Error('User does not exists! Register first');
    }

    // check password
    const validPaswword = await bcrypt.compare(
      req.body.password, // Plain Password
      user.password // Encrypted Password or Hashed Password
    );

    if (!validPaswword) {
      throw new Error('Password does not match');
    }

    // create token and assign it

    const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, {expiresIn: "1d"});

    // Response
    res.send({
      success: true,
      message: 'User Logged in Successfully',
      token: token,
    });
  } catch (error) {
    res.send({
      success: false,
      message: error.message,
    });
  }
});

export default router;

```
# Update server.js Now

```js
import express from 'express';
import dotenv from 'dotenv';
import connectDB from './Config/dbConfig.js';
import usersRoute from './Routes/usersRoute.js';

dotenv.config();

connectDB();

const app = express();
app.use(express.json());

app.use('/api/users', usersRoute);

const port = process.env.PORT || 5000;

app.listen(port, () => console.log(`Listening on port ${port}`));

```

Now we are working on authentication api's integration of login and registration with client


# in Client package.json

add
```
  "proxy": "http://localhost:5000"
```
at the end of file because proxy is the backend endpoint and 5000 is the port on which i am working right now

from client/Pages/Registration/Register.js

function Register() {
  const handleFinish = (values) => {
    console.log('Success:', values);
  };
i have to send this 'values' to the mongodb through node.js because client directly can not communicate with the database so i am sending it to the nodeJs & nodeJs will send it to the mongodb..
creating all apis integration in a separate folder



Now in apicalls create axiosInstance.js and users.js in client src

in users.js
```js

import { axiosInstance } from './axiosInstance';

// register user

export const RegisterUser = async (payload) => {
  try {
    const response = await axiosInstance.post('/api/users/register', payload);
    return response.data;
  } catch (error) {
    return error.message;
  }
};

// login

export const LoginUser = async (payload) => {
  try {
    const response = await axiosInstance.post('/api/users/login', payload);
    return response.data;
  } catch (error) {
    return error.message;
  }
};

```

- in client /src/Pages/Login/Login.js
update this

```js
const handleFinish = async (values) => {
    try {
      const response = await LoginUser(values);
      if (response.success) {
        message.success(response.message);
        console.log(response);
        localStorage.setItem('token', response.token);
      } else {
        throw new Error(response.message);
      }
    } catch (error) {
      message.error(error.message);
    }
  };
```
- in client /src/Pages/Registration/Register.js
update this

```js
const handleFinish = async (values) => {
    try {
      const response = await RegisterUser(values);
      if(response.success) {
        message.success(response.message)
      }
      else {
        throw new Error(response.message)
      }
    } catch (error) {
      message.error(error.message)
    }
  };
```
# Now in Authorization Process

in Server/Routes/usersRoute.js include these code

```js
import authMiddleware from '../middlewares/authMiddleware.js';


// get current user && Protected Api

//from here i am going to use middleware means logic which will execute before executing the endpont logic
// whenever this get-current-user endpoint is called  i am going to execute logic in middleware

router.get('/get-current-user', authMiddleware, async (req, res) => {
  try {
    const user = await User.findById(req.body.userId);
    res.send({
      success: true,
      message: 'User Fetched Successfully',
      data: user,
    });
  } catch (error) {
    res.send({
      success: false,
      message: error.message,
    });
  }
});
```
for authMiddleware create a folder middlewares
- in Server/middlewares/authMiddleware.js

```jw
import jwt from 'jsonwebtoken';

export default async (req, res, next) => {
  try {
    const token = req.header('authorization').split(' ')[1]; // splitting a string it becomes an array
    const decryptedToken = jwt.verify(token, process.env.JWT_SECRET); // to decrypt use jwt.verify..
    req.body.userId = decryptedToken.userId;
    next();
  } catch (error) {
    res.send({
      success: false,
      message: error.message,
    });
  }
};

// jwt.verify(token, process.env.JWT_SECRET);   the first parameter as the token and second parameter as the secret key and it must match with encrypted secret key
// decryptedToken an objected with the property userID

```
- in client /src/Pages/Login/Login.js

```js
import { Button, Form, Input, message } from 'antd';
import React, { useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Divider from '../../Components/Divider';
import { LoginUser } from '../../apicalls/users';

const validation = [
  {
    required: true,
    message: 'Fill out this field',
  },
];

function Login() {
  const navigate = useNavigate();
  const handleFinish = async (values) => {
    try {
      const response = await LoginUser(values);
      if (response.success) {
        message.success(response.message);
        localStorage.setItem('token', response.token);
        navigate('/');
      } else {
        throw new Error(response.message);
      }
    } catch (error) {
      message.error(error.message);
    }
  };

  useEffect(() => {
    if (localStorage.getItem('token')) {
      navigate('/');
    }
  }, []);

  return (
    <div className="h-screen bg-primary flex justify-center items-center ">
      <div className=" bg-white p-5 rounded w-[550px]">
        {/* border border-solid border-gray-800 */}
        <h1 className=" text-gray-700">Login</h1>
        <Divider />
        <Form layout="vertical" onFinish={handleFinish}>
          <Form.Item label="Email" name="email" rules={validation}>
            <Input placeholder="Email" />
          </Form.Item>
          <Form.Item label="Password" name="password" rules={validation}>
            <Input type="password" placeholder="Password" />
          </Form.Item>
          <Button type="primary" htmlType="submit" block className="mt-2">
            Login
          </Button>
          <div className="mt-5 text-center">
            <span className="text-gray-500">
              Don't have an account?{' '}
              <Link to="/register" className=" text-primary">
                Register
              </Link>
            </span>
          </div>
        </Form>
      </div>
    </div>
  );
}
export default Login;

```


Create a ProtectedPage.js file in Components

```js
import { useEffect, useState } from 'react';
import { message } from 'antd';
import { GetCurrentUser } from '../apicalls/users';
import { useNavigate } from 'react-router-dom';

function ProtectedPage({ children }) {
  const [user, setUser] = useState(null);
  const navigate = useNavigate();

  const validateToken = async () => {
    try {
      const response = await GetCurrentUser();
      if (response.success) {
        setUser(response.data);
      } else {
        navigate('/login');
        message.error(response.message);
      }
    } catch (error) {
      navigate('/login');
      message.error(error.message);
    }
  };

  useEffect(() => {
    if (localStorage.getItem('token')) {
      validateToken();
    } else {
      message.error('Session Expired Please Login Again');
      navigate('/login');
    }
  }, []);
  return (
    <div>
      {user && (
        <div>
          {user.name}
          {children}
        </div>
      )}
    </div>
  );
}
export default ProtectedPage;
```

- in client/App.js
wrap the element in PreotectPage 
```js
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Home from './Pages/Home/Home';
import Login from './Pages/Login/Login';
import Register from './Pages/Registration/Register';
import ProtectedPage from './Components/ProtectedPage';

function App() {
  return (
    <div>
      <BrowserRouter>
        <Routes>
          <Route
            path="/"
            element={
              <ProtectedPage>
                <Home />
              </ProtectedPage>
            }
          />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
```


- in client /src/Pages/Registration/Register.js
```js
import { Button, Form, Input, message } from 'antd';
import React, { useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Divider from '../../Components/Divider';
import { RegisterUser } from '../../apicalls/users';

const validation = [
  {
    required: true,
    message: 'Fill out this field',
  },
];

function Register() {
  const navigate = useNavigate();
  const handleFinish = async (values) => {
    try {
      const response = await RegisterUser(values);
      if (response.success) {
        message.success(response.message);
      } else {
        throw new Error(response.message);
      }
    } catch (error) {
      message.error(error.message);
    }
  };

  useEffect(() => {
    if (localStorage.getItem('token')) {
      navigate('/');
    }
  }, []);

  return (
    <div className="h-screen bg-primary flex justify-center items-center ">
      <div className=" bg-white p-5 rounded w-[550px]">
        {' '}
        {/* border border-solid border-gray-800 */}
        <h1 className=" text-gray-700">Register</h1>
        <Divider />
        <Form layout="vertical" onFinish={handleFinish}>
          <Form.Item label="Name" name="name" rules={validation}>
            <Input placeholder="Name" />
          </Form.Item>
          <Form.Item label="Email" name="email" rules={validation}>
            <Input placeholder="Email" />
          </Form.Item>
          <Form.Item label="Password" name="password" rules={validation}>
            <Input type="password" placeholder="Password" />
          </Form.Item>
          <Button type="primary" htmlType="submit" block className="mt-2">
            Register
          </Button>
          <div className="mt-5 text-center">
            <span className="text-gray-500">
              Already have an account?{' '}
              <Link to="/login" className=" text-primary">
                Login
              </Link>
            </span>
          </div>
        </Form>
      </div>
    </div>
  );
}
export default Register;

```












split A get/post 











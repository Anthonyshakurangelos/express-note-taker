const express = require('express');
const path = require('path');
const fs = require("fs");
const PORT = process.env.PORT || 3001;
const app = express();
const { clog } =require('./middleware/clog');
const api = require('./routes/apiroutes');
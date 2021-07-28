const express = require('express');
const router = express.Router();
const { Service, Resource } = require('../models/db/schemaDef');

// Routes
router.get('/', async (req, res, next) => {
  const result = await Service.find();
  res.status(200).render('index', { cards: result });
});

router.get('/service', async (req, res) => {
  const result = await Resource.find();
  res.status(200).render('service', { resources: result });
});

router.get('/about', (req, res, next) => {
  res.status(200).render('about');
});

router.get('/contact', (req, res, next) => {
  res.status(200).render('contact');
});

router.get('/service/*', (req, res, next) => {
  res.status(404).render('error');
});

router.get('/about/*', (req, res, next) => {
  res.status(404).render('error');
});

router.get('/contact/*', (req, res, next) => {
  res.status(404).render('error');
});

router.get('*', (req, res, next) => {
  res.status(404).render('error');
});

module.exports = router;

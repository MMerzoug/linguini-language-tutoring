const router = require('express').Router();
const homeRoutes = require('./homeRoutes');
const apiRoutes = require('./api');
const dayjs = require('dayjs');
dayjs().format();

router.use('/', homeRoutes);
router.use('/api', apiRoutes);

module.exports = router;

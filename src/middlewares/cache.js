const redisClient = require('../../redisClient');

const cacheNotes = async (req, res, next) => {
  try {
    const key = `notes:${req.userId}`;
    const data = await redisClient.get(key);
    if (data) {
      console.log('Serving from Redis cache');
      return res.status(200).json(JSON.parse(data));
    }
    next();
  } catch (err) {
    console.error('Redis error:', err);
    next();
  }
};

module.exports = { cacheNotes };

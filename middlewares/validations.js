const contentType = async (req, res, next) => {
  if (req.headers['content-type'] !== 'application/json') {
    res.status(400).json(
      'Invalid content type. The content type should be application/json',
    );
    return;
  }
  next();
};

module.exports = contentType;
export const getApiStatus = (req, res) => {
  res.status(200).json({
    status: 'API is working correctly',
    timestamp: new Date().toISOString()
  });
};

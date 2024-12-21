const logger = require("../config/logger");

const requestLogs = (req,res,next) =>{
      const data = {
        "Header" : req.headers, 
        "Body":req.body
      };
        logger.info(data);
        next();
}

const responseLogs = (req, res, next) => {
    const originalSend = res.send;
    const storedResponses = [];
  
    res.send = function (data) {
      storedResponses.push({
        timestamp: new Date(),
        status: res.statusCode,
        message: data
      });
  
      // Call the original res.send function with the data
      originalSend.call(res, data);
    };
  
    // Register an event handler for when the response is finished
    res.on('finish', () => {
      // Log the stored responses after the response is sent
      logger.info(storedResponses);
    });
  
    next();
  };
  

module.exports = {
    requestLogs,
    responseLogs
}
module.exports = (req, res, next) => {
    console.log("🛠 Checking Headers...");
    console.log(req.headers); 

    const requiredHeaders = ['authorization', 'content-type'];

    const missingHeaders = requiredHeaders.filter(header => !req.headers[header]);

    if (missingHeaders.length > 0) {
        console.log({
            message: "Missing required headers",
            missingHeaders: missingHeaders
        });
    }

    next(); 
};
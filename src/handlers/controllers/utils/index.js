const errorResponse = (message,statusCode,res) => {
	return res.status(statusCode).json({
		error: true,
		message: message
	});
}

module.exports = {
	errorResponse
}

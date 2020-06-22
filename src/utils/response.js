exports.success = function (req, res, data, message, status) {
   res.status(status || 200).send({
      success: true,
      data: data || null,
      message: message || "OK",
   });
};

exports.error = function (req, res, data, message, status) {
   res.status(status || 500).send({
      success: false,
      data: data || null,
      message: message || "Internal Server Error",
   });
};

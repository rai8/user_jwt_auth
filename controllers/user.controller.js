module.exports = {
  healthCheck
};
/**
 * @swagger
 * /api/healthCheck:
 *  get:
 *    tags:
 *       - "HealthCheck"
 *    summary: Checks if the service is reachable
 *    produces:
 *      - application/json
 *    responses:
 *        200:
 *           description: Healthy Service
 *        503:
 *           description: Unhealthy Service
 */
async function healthCheck(req, res) {
  try {
    res.send({
      uptime: process.uptime(),
      message: "OK",
      timestamp: Date.now()
    });
  } catch (error) {
    res.status(503).send();
  }
}

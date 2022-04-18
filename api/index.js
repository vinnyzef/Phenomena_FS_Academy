// Build an apiRouter using express Router
const express = require("express");
const { getOpenReports, createReport, closeReport } = require("../db");
const apiRouter = express.Router();

// Import the database adapter functions from the db

/**
 * Set up a GET request for /reports
 *
 * - it should use an async function
 * - it should await a call to getOpenReports
 * - on success, it should send back an object like { reports: theReports }
 * - on caught error, call next(error)
 */
apiRouter.get("/reports", async (req, res, next) => {
  try {
    const result = await getOpenReports();
    res.send("reports:", result);
  } catch (error) {
    next(error);
  }
});

/**
 * Set up a POST request for /reports
 *
 * - it should use an async function
 * - it should await a call to createReport, passing in the fields from req.body
 * - on success, it should send back the object returned by createReport
 * - on caught error, call next(error)
 */
apiRouter.post("/reports", async (req, res, next) => {
  try {
    const result = await createReport(req.body);
    res.send(result);
  } catch (error) {
    next(error);
  }
});

/**
 * Set up a DELETE request for /reports/:reportId
 *
 * - it should use an async function
 * - it should await a call to closeReport, passing in the reportId from req.params
 *   and the password from req.body
 * - on success, it should send back the object returned by closeReport
 * - on caught error, call next(error)
 */
apiRouter.delete("/reports/:reportId", async (req, res, next) => {
  try {
    const { reportId } = req.params;
    const { password } = req.body;
    const result = await closeReport(reportId, password);
    res.send(result);
  } catch (error) {
    next(error);
  }
});

/**
 * Set up a POST request for /reports/:reportId/comments
 *
 * - it should use an async function
 * - it should await a call to createReportComment, passing in the reportId and
 *   the fields from req.body
 * - on success, it should send back the object returned by createReportComment
 * - on caught error, call next(error)
 */
apiRouter.post("/reports/:reportId/comments", async (req, res, next) => {
  const { reportId } = req.body;
  try {
    const result = await createReportComment(reportId);
    res.send(result);
  } catch (error) {
    next(error);
  }
});
// Export the apiRouter
module.exports = apiRouter;

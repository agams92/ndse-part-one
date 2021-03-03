const { BookApiRouter, BookRenderRouter } = require('./book');
const { UserApiRouter } = require('./user');
const MainRenderRouter = require('./main/router.render');

module.exports = { BookApiRouter, BookRenderRouter, UserApiRouter, MainRenderRouter };

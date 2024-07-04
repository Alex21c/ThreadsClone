import e from "express";
import SearchController from "../Controllers/SearchController.mjs";
import passport from "../Passport/passport-config.mjs";

const SearchRouter = e.Router();

SearchRouter.get('/get-all-users-or-threads-matching-search-query/:query', passport.authenticate('jwt', {session: false}), SearchController.getAllUsersOrThreadsMatchingSearchQuery);


export default SearchRouter;
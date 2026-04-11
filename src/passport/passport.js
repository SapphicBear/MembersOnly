import  passport  from "passport";
import  localStrategy from "passport-local";
import bcrypt from "bcryptjs";
import * as db from "./../../db/queries.js";

passport.use(
    new localStrategy(async (username, password, done) => {
        try {
            const { rows } = await db.getSelectedUser(username);
            const user = rows[0];
            if (!user) {
                return done(null, false, { message: "Incorrect username" });
            }
            const match = await bcrypt.compare(password, user.password);
            if (!match) {
                return done(null, false, { message: "Incorrect password"});
            }
            return done(null, user);
        } catch (err) {
            return done(err);
        }
    })
);
passport.serializeUser((user, done) => {
    done(null, user.id);
});
passport.deserializeUser(async (id, done) => {
    try { 
        const rows = await db.getUserId(id);
        const user = rows[0];
        done(null, user);
    } catch (err) {
        done(err);
    }
});
export { passport };
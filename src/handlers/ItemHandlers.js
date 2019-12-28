export default class ItemHandlers {
    constructor(db) {
        this.getItem = async (req, res, next) => {
            let item;
            try {
                item = await db.Items.getItemFromId(req.params.id);
                if (!item) {
                    res.status(404).json({ message: "Item not found!" });
                    return;
                }
            } catch (error) {
                next(error);
                return;
            }
            res.locals.item = item;
            next();
        };

        this.newItem = async (req, res, next) => {
            let newItem;
            try {
                newItem = await db.Items.createNewItem(
                    req.body.item,
                    req.auth.id
                );
            } catch (error) {
                next(error);
                return;
            }
            res.locals.newItem = newItem;
            next();
        };

        this.buckItem = async (req, res, next) => {
            try {
                await db.Items.insertIntoArray(
                    req.auth.id,
                    "usersWhoBucketed",
                    req.params.id
                );

                await db.Users.setObject(
                    req.auth.id,
                    req.params.id,
                    req.query.timestamp,
                    "myBucketedItems"
                );
            } catch (error) {
                next(error);
                return;
            }
            next();
        };

        this.unbuckItem = async (req, res, next) => {
            try {
                await db.Items.removeFromArray(
                    req.auth.id,
                    "usersWhoBucketed",
                    req.params.id
                );
                await db.Users.removeObject(
                    req.auth.id,
                    req.params.id,
                    "myBucketedItems"
                );
            } catch (error) {
                next(error);
                return;
            }
            next();
        };

        this.getCoords = async (req, res, next) => {
            let allItems;
            try {
                allItems = await db.Items.getAll();
                res.locals.data = allItems.map(i => i.coordinates);
                next();
            } catch (error) {
                next(error);
            }
        };
    }
}

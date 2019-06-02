import * as Items from "../db/itemFunctions";
import * as Users from "../db/userFunctions";

export const getItem = async (req, res, next) => {
    let item;
    try {
        item = await Items.getItemFromId(req.params.id);
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

export const newItem = async (req, res, next) => {
    let newItem;
    try {
        newItem = await Items.createNewItem(req.body.item, req.auth.id);
    } catch (error) {
        next(error);
        return;
    }
    res.locals.newItem = newItem;
    next();
};

export const buckItem = async (req, res, next) => {
    try {
        await Items.insertIntoArray(
            req.params.id,
            "usersWhoBucketed",
            req.auth.id
        );
        await Users.insertIntoArray(
            req.auth.id,
            "myBucketedItems",
            req.params.id
        );
    } catch (error) {
        next(error);
        return;
    }
};

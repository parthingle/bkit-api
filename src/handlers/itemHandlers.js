import * as Items from "../db/itemFunctions";

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

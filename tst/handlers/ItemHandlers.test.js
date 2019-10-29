import sinon from "sinon";
import assert from "assert";

import ItemHandlers from "../../src/handlers/ItemHandlers";
import db from "../../src/db";

describe("ItemHandlers", () => {
    let itemHandlers;
    let next;

    beforeEach(() => {
        itemHandlers = new ItemHandlers(db);
        next = sinon.spy();
    });

    describe("getItem()", () => {
        it("populates res.locals.item on success", async () => {
            const itemStub = sinon.stub(db.Items, "getItemFromId");
            itemStub.resolves("test-response");

            const req = {
                params: {
                    id: "test-id"
                }
            };
            const res = { locals: {} };

            // Actual test
            await itemHandlers.getItem(req, res, next);

            assert(next.calledOnce);
            assert(!next.args[0][0]);
            assert.strictEqual(itemStub.args[0][0], req.params.id);
            assert.strictEqual(res.locals.item, "test-response");
        });

        it("responds with a 404 if no item exists", async () => {
            sinon.stub(db.Items, "getItemFromId").resolves(null);

            const req = {
                params: {
                    id: "test-id"
                }
            };
            const res = {
                status: () => {
                    return { json: () => {} };
                }
            };

            const statusSpy = sinon.spy(res, "status");

            await itemHandlers.getItem(req, res, next);

            assert(statusSpy.calledOnce);
            assert(statusSpy.calledWith(404));
            assert(next.notCalled);
        });

        it("calls next() once with the error on exception", async () => {
            sinon.stub(db.Items, "getItemFromId").throws();

            const req = {};
            const res = {};

            await itemHandlers.getItem(req, res, next);

            assert(next.calledOnce);
            assert(next.args[0][0]);
        });
    });

    describe("newItem()", () => {
        it("populates res.locals.newItem on success", async () => {
            const createStub = sinon
                .stub(db.Items, "createNewItem")
                .resolves("test-response");

            const req = {
                body: {
                    item: "item-id"
                },
                auth: {
                    id: "fake-id"
                }
            };
            const res = {
                locals: {
                    newItem: {}
                }
            };

            await itemHandlers.newItem(req, res, next);

            assert(next.calledOnce);
            assert(!next.args[0][0]);
            assert(createStub.args[0], [req.body.item, req.auth.id]);
            assert.strictEqual(res.locals.newItem, "test-response");
        });

        it("calls next() once with the error on exception", async () => {
            sinon.stub(db.Items, "createNewItem").throws();

            const req = {};
            const res = {};

            await itemHandlers.newItem(req, res, next);

            assert(next.calledOnce);
            assert(next.args[0][0]);
        });
    });

    describe("buckItem()", () => {
        it("does nothing on success", async () => {
            const insertStub = sinon.stub(db.Items, "insertIntoArray");
            const updateStub = sinon.stub(db.Users, "updateObject");

            const req = {
                auth: {
                    id: "fake-id"
                },
                params: {
                    id: "test-id"
                }
            };
            const res = {};

            await itemHandlers.buckItem(req, res, next);

            assert(next.calledOnce);
            assert(!next.args[0][0]);
            assert(insertStub.args[0], [
                req.auth.id,
                "usersWhoBucketed",
                req.params.id
            ]);
            assert(updateStub.args[0], [
                req.auth.id,
                req.params.id,
                "myBucketedItems"
            ]);
            assert(insertStub.calledOnce);
            assert(updateStub.calledOnce);
        });

        it("calls next() once with the error on exception", async () => {
            sinon.stub(db.Items, "insertIntoArray").throws();
            sinon.stub(db.Users, "updateObject").throws();

            const req = {};
            const res = {};

            await itemHandlers.buckItem(req, res, next);

            assert(next.calledOnce);
            assert(next.args[0][0]);
        });
    });

    afterEach(() => {
        // Restore the default sandbox here
        sinon.restore();
    });
});

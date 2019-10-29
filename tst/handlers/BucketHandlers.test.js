import sinon from "sinon";
import assert from "assert";

import BucketHandlers from "../../src/handlers/BucketHandlers";
import db from "../../src/db";

describe("BucketHandlers", () => {
    let bucketHandlers;
    let next;

    beforeEach(() => {
        bucketHandlers = new BucketHandlers(db);
        next = sinon.spy();
    });

    describe("getBucket()", () => {
        it("populates res.locals.bucket on success", async () => {
            const getStub = sinon
                .stub(db.Buckets, "getBucketFromId")
                .resolves("test-response");

            const req = {
                params: {
                    id: "test-id"
                }
            };
            const res = { locals: {} };

            await bucketHandlers.getBucket(req, res, next);

            assert(next.calledOnce);
            assert(!next.args[0][0]);
            assert.strictEqual(getStub.args[0][0], req.params.id);
            assert.strictEqual(res.locals.bucket, "test-response");
        });

        it("responds with a 404 if no bucket exists", async () => {
            const getStub = sinon
                .stub(db.Buckets, "getBucketFromId")
                .resolves(null);

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

            await bucketHandlers.getBucket(req, res, next);

            assert.strictEqual(getStub.args[0][0], req.params.id);
            assert(statusSpy.calledWith(404));
            assert(next.notCalled);
        });

        it("calls next() once with the error on exception", async () => {
            const getStub = sinon.stub(db.Buckets, "getBucketFromId").throws();

            const req = {
                params: {
                    id: "test-id"
                }
            };
            const res = {
                locals: {
                    bucket: {
                        items: "test-item"
                    }
                }
            };

            await bucketHandlers.getBucket(req, res, next);

            assert(next.calledOnce);
            assert(next.args[0][0]);
            assert(getStub.args[0][0], req.params.id);
            assert(getStub.threw);
        });
    });

    describe("resolveItems()", () => {
        it("populates res.locals.bucket.items on success", async () => {
            const resolveStub = sinon
                .stub(db.Items, "resolveItems")
                .resolves("test-response");

            const req = {};
            const res = {
                locals: {
                    bucket: {
                        items: "test-item"
                    }
                }
            };

            await bucketHandlers.resolveItems(req, res, next);

            assert(next.calledOnce);
            assert(!next.args[0][0]);
            assert(resolveStub.args[0][0], res.locals.bucket.items);
            assert.strictEqual(res.locals.bucket.items, "test-response");
        });

        it("calls next() once with the error on exception", async () => {
            sinon.stub(db.Items, "resolveItems").throws();

            const req = {};
            const res = {};

            await bucketHandlers.resolveItems(req, res, next);

            assert(next.calledOnce);
            assert(next.args[0][0]);
        });
    });

    afterEach(() => {
        // Restore the default sandbox here
        sinon.restore();
    });
});

import sinon from "sinon";
import assert from "assert";

import UserHandlers from "../../src/handlers/UserHandlers";
import db from "../../src/db";

describe("UserHandlers", () => {
    let userHandlers;
    let next;

    beforeEach(() => {
        userHandlers = UserHandlers;
        next = sinon.spy();
    });

    describe("getMyProfile()", () => {
        it("populates res.locals.user on success", async () => {
            const getStub = sinon.stub(db.Users, "getProfileFromId");
            getStub.resolves("test-response");

            const req = {
                auth: {
                    id: "test-id"
                }
            };
            const res = { locals: {} };

            // Actual test
            await userHandlers.getMyProfile(req, res, next);

            assert(!next.args[0][0]);
            assert.strictEqual(getStub.args[0][0], req.auth.id);
            assert.strictEqual(res.locals.user, "test-response");
        });

        it("responds with a 404 if no user exists and returns", async () => {
            sinon.stub(db.Users, "getProfileFromId").resolves(null);

            const req = {
                auth: {
                    id: "test-id"
                }
            };
            const res = {
                status: () => {
                    return { json: () => {} };
                }
            };

            const statusSpy = sinon.spy(res, "status");

            await userHandlers.getMyProfile(req, res, next);

            assert(statusSpy.calledOnce);
            assert(statusSpy.calledWith(404));
        });

        it("calls next() once with the error on exception", async () => {
            sinon.stub(db.Users, "getProfileFromId").throws();

            const req = {};
            const res = {};

            await userHandlers.getMyProfile(req, res, next);

            assert(next.calledOnce);
            assert(next.args[0][0]);
        });
    });

    describe("getPublicProfile()", () => {
        it("populates res.locals.user on success", async () => {
            const getStub = sinon.stub(db.Users, "getPublicProfileFromId");
            getStub.resolves("test-response");

            const req = {
                params: {
                    id: "test-id"
                }
            };
            const res = { locals: {} };

            // Actual test
            await userHandlers.getPublicProfile(req, res, next);

            assert(next.calledOnce);
            assert(!next.args[0][0]);
            assert.strictEqual(getStub.args[0][0], req.params.id);
            assert.strictEqual(res.locals.user, "test-response");
        });

        it("responds with a 404 if no user exists and returns", async () => {
            sinon.stub(db.Users, "getPublicProfileFromId").resolves(null);

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

            await userHandlers.getPublicProfile(req, res, next);

            assert(statusSpy.calledOnce);
            assert(statusSpy.calledWith(404));
            assert(next.notCalled);
        });

        it("calls next() once with the error on exception", async () => {
            sinon.stub(db.Users, "getPublicProfileFromId").throws();

            const req = {};
            const res = {};

            await userHandlers.getPublicProfile(req, res, next);

            assert(next.calledOnce);
            assert(next.args[0][0]);
        });
    });

    describe("resolveUserBuckets()", () => {
        it("updates res.locals.users.myBuckets on success", async () => {
            const resolveStub = sinon
                .stub(db.Buckets, "resolveBuckets")
                .resolves("test-response");

            const req = {};
            const res = {
                locals: {
                    user: {
                        myBuckets: "test-bucket"
                    }
                }
            };

            await userHandlers.resolveUserBuckets(req, res, next);

            assert(next.calledOnce);
            assert(!next.args[0][0]);
            assert(resolveStub.args[0][0], "test-bucket");
            assert.strictEqual(res.locals.user.myBuckets, "test-response");
        });

        it("calls next() once with the error on exception", async () => {
            sinon.stub(db.Buckets, "resolveBuckets").throws();

            const req = {};
            const res = {};

            await userHandlers.resolveUserBuckets(req, res, next);

            assert(next.calledOnce);
            assert(next.args[0][0]);
        });
    });

    describe("resolveUserItems()", () => {
        it("updates res.locals.users.myBucketItems on success", async () => {
            const resolveStub = sinon
                .stub(db.Items, "resolveItems")
                .resolves("test-response");

            const req = {};
            const res = {
                locals: {
                    user: {
                        myBucketItems: "test-bucket-item"
                    }
                }
            };

            await userHandlers.resolveUserItems(req, res, next);

            assert(next.calledOnce);
            assert(!next.args[0][0]);
            assert(resolveStub.args[0][0], "test-bucket-item");
            assert.strictEqual(res.locals.user.myBucketItems, "test-response");
        });

        it("calls next() once with the error on exception", async () => {
            sinon.stub(db.Items, "resolveItems").throws();

            const req = {};
            const res = {};

            await userHandlers.resolveUserItems(req, res, next);

            assert(next.calledOnce);
            assert(next.args[0][0]);
        });
    });

    describe("newUser()", () => {
        it("updates res.locals.newUser on success", async () => {
            const createStub = sinon
                .stub(db.Users, "createNewUser")
                .resolves("test-response");

            const req = {
                body: {
                    user: "test-user"
                }
            };
            const res = {
                locals: {}
            };

            await userHandlers.newUser(req, res, next);

            assert(next.calledOnce);
            assert(!next.args[0][0]);
            assert(createStub.args[0][0], "test-user");
            assert(createStub.calledOnce);
            assert.strictEqual(res.locals.newUser, "test-response");
        });

        it("calls next() once with the error on exception", async () => {
            sinon.stub(db.Users, "createNewUser").throws();

            const req = {};
            const res = {};

            await userHandlers.newUser(req, res, next);

            assert(next.calledOnce);
            assert(next.args[0][0]);
        });
    });

    describe("getHomePage()", () => {
        it("updates res.locals.home on success", async () => {
            const profileStub = sinon
                .stub(db.Users, "getProfileFromId")
                .resolves({
                    myBucketedItems: {
                        itemId: 1234
                    }
                });
            const itemStub = sinon.stub(db.Items, "getAll").resolves([
                {
                    itemId: 1234
                }
            ]);

            const req = {
                auth: {
                    id: "test-id"
                }
            };
            const res = {
                locals: {}
            };

            await userHandlers.getHomePage(req, res, next);

            assert(next.calledOnce);
            assert(!next.args[0][0]);
            assert(profileStub.args[0][0], "test-profile");
            assert(itemStub.calledOnce);
            assert(res.locals.home);
        });

        it("calls next() once with the error on exception", async () => {
            sinon.stub(db.Users, "createNewUser").throws();

            const req = {};
            const res = {};

            await userHandlers.getHomePage(req, res, next);

            assert(next.calledOnce);
            assert(next.args[0][0]);
        });
    });

    afterEach(() => {
        // Restore the default sandbox here
        sinon.restore();
    });
});

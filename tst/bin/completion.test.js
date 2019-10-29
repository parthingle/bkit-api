import assert from "assert";

import * as Bin from "../../src/bin/completion";

const allItems = [{ itemId: 1 }, { itemId: 2 }, { itemId: 3 }, { itemId: 4 }];

describe("completion", () => {
    describe("prepHome()", () => {
        it("returns 2 completed items", async () => {
            // Item 2 was completed at time 10, 3 was completed at 3
            const user = {
                myBucketedItems: { 2: 10, 3: 3 }
            };

            const output = await Bin.prepHome(user, allItems);

            assert.strictEqual(output.completionPercentage, 0.5);
            assert.deepStrictEqual(output.items, [
                {
                    itemId: 1,
                    done: 0
                },
                {
                    itemId: 2,
                    done: 10
                },
                {
                    itemId: 3,
                    done: 3
                },
                {
                    itemId: 4,
                    done: 0
                }
            ]);
        });

        it("returns no completed items", async () => {
            // Item 2 was bucketed at time 10
            const user = {
                myBucketedItems: {}
            };

            const output = await Bin.prepHome(user, allItems);

            assert.strictEqual(output.completionPercentage, 0);
            assert.deepStrictEqual(output.items, [
                {
                    itemId: 1,
                    done: 0
                },
                {
                    itemId: 2,
                    done: 0
                },
                {
                    itemId: 3,
                    done: 0
                },
                {
                    itemId: 4,
                    done: 0
                }
            ]);
        });

        it("return all completed items", async () => {
            // Item 2 was bucketed at time 10
            const user = {
                myBucketedItems: { 1: 4, 2: 7, 3: 5, 4: 8 }
            };

            const output = await Bin.prepHome(user, allItems);
            assert.strictEqual(output.completionPercentage, 1);
            assert.deepStrictEqual(output.items, [
                {
                    itemId: 1,
                    done: 4
                },
                {
                    itemId: 2,
                    done: 7
                },
                {
                    itemId: 3,
                    done: 5
                },
                {
                    itemId: 4,
                    done: 8
                }
            ]);
        });
    });
});

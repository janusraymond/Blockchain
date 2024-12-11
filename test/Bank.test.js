const {
    time,
    loadFixture,
} = require("@nomicfoundation/hardhat-toolbox/network-helpers");
const { anyValue } = require("@nomicfoundation/hardhat-chai-matchers/withArgs");
const { expect } = require("chai");

describe("Bank", function () {
    const ONE_DAY_IN_SECS = 1 * 24 * 60 * 60;

    async function deployFixture() {
        const [owner] = await ethers.getSigners();
        const Bank = await ethers.getContractFactory("Bank");
        const bank = await Bank.deploy();

        return { bank, owner };
    }

    describe("Deployment", function () {
        it("Should set the right owner", async function () {
            const { bank, owner } = await loadFixture(deployFixture);
            expect(await bank.owner()).to.equal(owner.address);
        });

        it("should deposit", async function () {
            const { bank, owner } = await loadFixture(deployFixture);
            await bank.deposit(100);

            const afterOneDay = (await time.latest()) + ONE_DAY_IN_SECS;
            await time.increaseTo(afterOneDay);

            const result = await bank.getInterest(owner.address)
            console.log(result)
        });

        it("should compute for total amount", async function () {
            const { bank, owner } = await loadFixture(deployFixture);
            await bank.deposit(100);

            const afterOneDay = (await time.latest()) + ONE_DAY_IN_SECS;
            await time.increaseTo(afterOneDay);

            const result = await bank.getTotalAmount(owner.address)
            console.log(result)
        });
    });
});
// imports and applies the jest extensions
import "tsarch/dist/jest";

// imports the files entrypoint
import { filesOfProject } from "tsarch";

describe("architecture", () => {
  // architecture tests can take a while to finish
  jest.setTimeout(60000);

  it("workflow should not depend on the presentation", async () => {
    const rule = filesOfProject()
      .inFolder("workflow")
      .shouldNot()
      .dependOnFiles()
      .inFolder("presentation");

    await expect(rule).toPassAsync();
  });

  it("persistence should not depend on the presentation", async () => {
    const rule = filesOfProject()
      .inFolder("persistence")
      .shouldNot()
      .dependOnFiles()
      .inFolder("presentation");

    await expect(rule).toPassAsync();
  });

  it("persistence should not depend on the workflow", async () => {
    const rule = filesOfProject()
      .inFolder("persistence")
      .shouldNot()
      .dependOnFiles()
      .inFolder("workflow");

    await expect(rule).toPassAsync();
  });

  it("presentation should be cycle free", async () => {
    const rule = filesOfProject()
      .inFolder("presentation")
      .should()
      .beFreeOfCycles();

    await expect(rule).toPassAsync();
  });

  it("workflow should be cycle free", async () => {
    const rule = filesOfProject()
      .inFolder("workflow")
      .should()
      .beFreeOfCycles();

    await expect(rule).toPassAsync();
  });

  it("persistence should be cycle free", async () => {
    const rule = filesOfProject()
      .inFolder("persistence")
      .should()
      .beFreeOfCycles();

    await expect(rule).toPassAsync();
  });

  it("transaction domain should not depend on auth domain", async () => {
    const rule = filesOfProject()
      .inFolder("transaction")
      .shouldNot()
      .dependOnFiles()
      .inFolder("auth")
      .matchingPattern("^(?!.*\/api\/).*$"); // ignore paths that include /api/

    await expect(rule).toPassAsync();
  });

  it("auth domain should not depend on transaction domain", async () => {
    const rule = filesOfProject()
      .inFolder("auth")
      .shouldNot()
      .dependOnFiles()
      .inFolder("transaction")
      .matchingPattern("^(?!.*\/api\/).*$"); // ignore paths that include /api/

    await expect(rule).toPassAsync();
  });
});

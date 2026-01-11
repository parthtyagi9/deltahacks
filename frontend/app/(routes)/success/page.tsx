import fs from "fs/promises";
import path from "path";
import SuccessClient from "./SuccessClient";

export default async function SuccessPage() {
  let fileContent = "";

  try {
    // Specify the path to your local file (e.g., a template or previous build)
    // process.cwd() points to your project root
    const filePath =
      "/projects/Hackathons/Delta/deltahacks/frontend/app/(routes)/success/templates/base_analytics.tsx";

    console.log(filePath);

    // Reading the file using fs
    fileContent = await fs.readFile(filePath, "utf8");
  } catch (error) {
    console.error("FS_READ_ERROR:", error);
    fileContent =
      "// [ERROR]: Could not load local source file from server disk.";
  }

  return <SuccessClient initialCode={fileContent} />;
}

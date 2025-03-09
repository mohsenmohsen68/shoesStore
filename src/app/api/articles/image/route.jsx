import {writeFile} from "fs/promises";
import path from "path";

export async function POST(req) {
  const formData = await req.formData();

  const img = formData.get("uploadImg");
  console.log(img)
  console.log('ddddddddd',await img.arrayBuffer())
  if (!img) {
    return Response.json({ message: "there is no image" }, { status: 400 });
  }

  try {
    const buffer = Buffer.from(await img.arrayBuffer());
    const fileName =  Date.now() + img.name
    const imgPath = path.join(
      process.cwd(),
      "public/articles/",
       fileName
    );
    console.log("path", imgPath)
    await writeFile(imgPath, buffer);
    return Response.json(
      { message: "the image uploaded successfully",url: `http://localhost:3000/articles/${fileName}` },
      { status: 200 }
    );
  } catch (err) {
    return Response.json(
      { message: "the picture did not uploaded, something went wrong...  " },
      { status: 500 }
    );
  }
}

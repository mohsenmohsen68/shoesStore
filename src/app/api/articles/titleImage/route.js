
import path from 'path'
import { writeFile } from 'fs/promises'

export async function PUT(req) {

    try {
        const formData = await req.formData()
        const img = formData.get("img")
        const filename = String(Date.now()) + img.name
        console.log(filename)
        const imgPath = path.join(process.cwd(), "/public/uploads/articlesImg", filename)
        const buffer = Buffer.from(await img.arrayBuffer())
        console.log("dddd", img, filename, imgPath, buffer)
        await writeFile(imgPath, buffer)
        return Response.json({ data: filename},{status:200})  
    } catch (err) {
        return Response.json({ message: err }, { status: 500 })
    }

}
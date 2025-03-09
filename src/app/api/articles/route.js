import connectToDB from "@/configs/db";
import articlesModel from "@/root/models/article";

export async function GET() {
  connectToDB();
  try {
    const articles = await articlesModel.find({});
    return Response.json({
      message: "لیست دوره ها برایتان ارسال گردید.",
      status: 200,
      data: articles
    });
  } catch (err) {
    return Response.json({ message: "مشکلی بوجود آمده است...", status: 500 });
  }
}
export async function POST(req) {
  connectToDB();
  const { title, img, articleBody, user, date } = await req.json();
  console.log("articleBody : ",  title, img, articleBody, user, date);

  try {
    await articlesModel.create({
      title,
      img,
      articleBody,
      user,
      date,
      status: "notAccepted"
    });
    return Response.json({
      message: "course created successfully ...",
      status: 201
    });
  } catch (err) {
    return Response.json({ message:err, status: 500 });
  }
}
export async function PUT(req) {
  connectToDB();
  const body = await req.json();
  try {
    await articlesModel.findOneAndUpdate(
      { _id: body._id },
      {
        title: body.title,
        status: body.status,
        articleBody: body.articleBody,
        date: body.date,
        img: body.img,
      }
    );

    return Response.json({
      message: "the article updated successfully",
      status: 200
    });
  } catch (err) {
    return Response.json({
      message: "Oops, something went wrong ...",
      status: 500
    });
  }
}

export async function DELETE(req) {
  connectToDB();
  const myUrl = new URL(req.url);
  const articleID = myUrl.searchParams.get("articleID");
  console.log("request, userCode : ", articleID)
  const isArticleExist = await articlesModel.findOne({ _id:articleID });
  if (!isArticleExist) {
    return Response.json({
      message: "چنین مقاله ای وجود ندارد ...",
      status: 404
    });
  } else {
    await articlesModel.findOneAndDelete({ _id:articleID });
    return Response.json({
      message: "مقاله مورد نظر حذف گردید ...",
      status: 200
    });
  }
}

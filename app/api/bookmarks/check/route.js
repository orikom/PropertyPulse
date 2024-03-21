import connectDB from "@/config/database";
import User from "@/models/User";
import { getSessionUser } from "@/utils/getSessionUser";

export const dynamic = "force-dynamic";
// This route only check if in the initial render the property is already bookmarked or not.
export const POST = async (request) => {
  try {
    await connectDB();
    const { propertyId } = await request.json();
    const sessionUser = await getSessionUser();
    if (!sessionUser || !sessionUser.userId) {
      return new Response("User ID is required", { status: 401 });
    }
    const { userId } = sessionUser;

    // Find User in database
    const user = await User.findOne({ _id: userId });

    // Check if property is bookmarked
    let isBookmarked = user.bookmarks.includes(propertyId);

    return new Response(JSON.stringify({ isBookmarked }, { status: 200 }));
  } catch (error) {
    console.log(error);
    return new Response("something went wrong", { status: 500 });
  }
};

/* more explanation for "pull" method above:
When you retrieve documents from MongoDB using Mongoose's methods such as findById, findOne, etc., the documents returned are instances of Mongoose's Document class. These instances have additional methods and properties added to them by Mongoose.*/

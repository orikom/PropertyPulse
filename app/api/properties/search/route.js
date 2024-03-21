import connectDB from "@/config/database";
import Property from "@/models/Property";

// Get /api/properties/search

export const GET = async (request) => {
  try {
    await connectDB();
    const { searchParams } = new URL(request.url);
    const location = searchParams.get("location");
    const propertyType = searchParams.get("propertyType");

    // We want to create pattern NOT to be case case sensetive, hence "i".
    const locationPattern = new RegExp(location, "i");

    // Match location pattern against DB fields
    let query = {
      $or: [
        { name: locationPattern },
        { description: locationPattern },
        { "location.street": locationPattern },
        { "location.city": locationPattern },
        { "location.state": locationPattern },
        { "location.zipcode": locationPattern },
      ],
    };

    // Only check for property if its not "All"
    if (propertyType && propertyType !== "All") {
      const typePattern = new RegExp(propertyType, "i");
      query.type = typePattern;
    }
    const properties = await Property.find(query);

    console.log(location, propertyType);
    return new Response(JSON.stringify(properties), {
      status: 200,
    });
  } catch (error) {
    console.log(error);
    return new Response("Something went wrong", {
      status: 500,
    });
  }
};

/* for me: 
 The $or operator is specific to MongoDB queries, not JavaScript itself. It's used within MongoDB query syntax to perform logical OR operations. So, if you're working with MongoDB queries, you'll use $or, but it's not a native JavaScript operator like && or ||.

JavaScript doesn't throw a syntax error because $or is just a property name in an object literal, and JavaScript allows any string as a property name. It's not a reserved keyword in JavaScript syntax, so it's treated like any other string value.*/

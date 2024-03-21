//we are doing this for deployment - if we didnt initialize the environment variables on the server yet.
const apiDomain = process.env.NEXT_PUBLIC_API_DOMAIN || null;

// Fetch all properties
async function fetchProperties({ showFeatured = false } = {}) {
  try {
    //handle the case where the domain is not available yet:
    if (!apiDomain) {
      return [];
    }

    const res = await fetch(
      `${apiDomain}/properties${showFeatured ? "/featured" : ""}`,
      { cache: "no-store" }
    );
    if (!res.ok) {
      throw new Error("failed to fetch data");
    }
    return res.json();
  } catch (err) {
    console.log(err);
    return [];
  }
}

// Fetch single property
async function fetchProperty(id) {
  try {
    //handle the case where the domain is not available yet:
    if (!apiDomain) {
      return null;
    }

    const res = await fetch(`${apiDomain}/properties/${id}`);
    if (!res.ok) {
      throw new Error("failed to fetch data");
    }
    return res.json();
  } catch (err) {
    console.log(err);
    return null;
  }
}

export { fetchProperties, fetchProperty };

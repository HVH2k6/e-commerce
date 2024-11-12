import slugify from "slugify"

const createSlug = (text: string) => {
    const slug = slugify(text, {lower: true, strict: true, locale: "vi"});
    return slug
}

export default createSlug
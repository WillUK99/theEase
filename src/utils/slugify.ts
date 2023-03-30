const slugify = (text: string) => text.toLocaleLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)+/g, '');

export default slugify;
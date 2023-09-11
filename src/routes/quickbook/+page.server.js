/** @type {import('./$types').Actions} */
export const actions = {
    default: async ({ request }) => {
        let data = await request.formData();

        data.subject = data.get('title');
    }
}
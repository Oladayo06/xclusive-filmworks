import { defineField, defineType } from 'sanity'
export default defineType(
    {
        name: 'teamMember', title: 'Team Member', type: 'document', fields: [
            defineField({ name: 'name', title: 'Name', type: 'string' }),
            defineField({ name: 'role', title: 'Role / Title', type: 'string' }),
            defineField({ name: 'photo', title: 'Photo', type: 'image' }),
            defineField({
                name: 'brand', title: 'Department', type: 'string',
                options: {
                    list: ['Xclusive Filmworks', 'Xclusive Media', 'Xclusive Zone']

                }
            }),
            defineField({ name: 'order', title: 'Display Order', type: 'number' }),],
    })
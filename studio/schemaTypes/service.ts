import { defineField, defineType } from 'sanity'
export default defineType(
    {
        name: 'service', title: 'Service', type: 'document', fields: [
            defineField({ name: 'number', title: 'Number (e.g. 01)', type: 'string' }),
            defineField({ name: 'title', title: 'Title', type: 'string' }),
            defineField({ name: 'description', title: 'Description', type: 'text' }),
            defineField({
                name: 'brand', title: 'Belongs To', type: 'string',
                options: { 
                    list: ['Xclusive Filmworks', 'Xclusive Media', 'Xclusive Zone'] 

                }
            }),
            defineField({ name: 'order', title: 'Display Order', type: 'number' }),],
    })
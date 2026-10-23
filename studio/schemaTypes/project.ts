import { defineField, defineType } from 'sanity'

export default defineType({
  name: 'project',
  title: 'Project',
  type: 'document',
  fields: [
    defineField({ name: 'title', title: 'Title', type: 'string' }),
    defineField({ name: 'client', title: 'Client', type: 'string' }),
    defineField({
      name: 'category', title: 'Category', type: 'string',
      options: { list: ['Series', 'Documentary', 'Commercial', 'Film'] }
    }),
    defineField({ name: 'year', title: 'Year', type: 'string' }),
    defineField({
      name: 'slug', title: 'Slug', type: 'slug',
      options: { source: 'title' }
    }),
    defineField({ name: 'featured', title: 'Featured', type: 'boolean' }),
    defineField({ name: 'poster', title: 'Poster Image', type: 'image' }),
    defineField({ name: 'videoUrl', title: 'Video URL', type: 'url' }),
    defineField({
      name: 'brand',
      title: 'Belongs To',
      type: 'string',
      options: { list: ['Xclusive Filmworks', 'Xclusive Media', 'Xclusive Zone'] },
    }),
    defineField({
      name: 'description',
      title: 'Description / Synopsis',
      type: 'text',
    }),
    defineField({
      name: 'services',
      title: 'Services Delivered',
      type: 'array',
      of: [{ type: 'string' }],
    }),
    defineField({
      name: 'gallery',
      title: 'Gallery Images',
      type: 'array',
      of: [{ type: 'image' }],
    }),
  ],
})
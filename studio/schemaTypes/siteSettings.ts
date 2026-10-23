import { defineField, defineType } from 'sanity'
export default defineType(
    {
        name: 'siteSettings', title: 'Site Settings', type: 'document', fields: [
            defineField({ name: 'siteName', title: 'Site Name', type: 'string' }),
            defineField({ name: 'favicon', title: 'Favicon', type: 'image' }),
            defineField({
                name: 'brand', title: 'Belongs To', type: 'string',
                options: { 
                    list: ['Xclusive Filmworks', 'Xclusive Media', 'Xclusive Zone'] 

                }
            }), defineField({ name: 'accentColor', title: 'Accent Color (hex)', type: 'string' }), defineField({ name: 'instagramUrl', title: 'Instagram URL', type: 'url' }), defineField({ name: 'youtubeUrl', title: 'YouTube URL', type: 'url' }), defineField({ name: 'tiktokUrl', title: 'TikTok URL', type: 'url' }), defineField({ name: 'contactEmail', title: 'Contact Email', type: 'string' }),],
    })
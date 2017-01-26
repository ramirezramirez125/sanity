import createSchema from 'part:@sanity/base/schema-creator'


// Example of a custom slugify function that
// makes a slug-string and prefixes it with something from the
// schema and then calls the default slugify function.
function slugifyWithPrefix(prefix) {
  return function (type, slug, slugify) {
    let newSlug = slug
    if (slug.substring(0, prefix.length) === `${prefix}`) {
      newSlug = slug.substring(prefix.length, slug.length)
    }
    return slugify(type, `${prefix}-${newSlug}`)
      .substring(0, type.options.maxLength)
  }
}

export default createSchema({
  name: 'example-blog',
  types: [
    {
      name: 'blogpost',
      type: 'object',
      title: 'Blogpost',
      preview: {
          fields: {title: 'title', subtitle: 'lead'}
        },
      fields: [

        {
          name: 'selectMultipleStrings',
          title: 'Select multiple strings',
          type: 'array',
          options: {
            direction: 'vertical',
            list: [
              {title: 'Red', value: 'red'},
              {title: 'Green', value: 'green'},
              {title: 'Blue', value: 'blue'},
              {title: 'Black', value: 'black'},
            ]
          },
          of: [{
            type: 'string'
          }]
        },
        {
          name: 'title',
          title: 'Title',
          type: 'string',
          required: true
        },
        {
          name: 'mainImage',
          title: 'Main image',
          type: 'image',
          options: {
            hotspot: true
          }
        },
        {
          name: 'slug',
          title: 'Slug',
          description: 'The unique identifier for the blogpost in links and urls',
          type: 'slug',
          required: true,
          options: {
            source: 'title',
            maxLength: 64,
            slugifyFn: slugifyWithPrefix('creepy')
          }
        },
        {
          name: 'tags',
          title: 'tags',
          type: 'array',
          options: {
            layout: 'tags'
          },
          of: [
            {type: 'string'}
          ]
        },
        {
          name: 'arrayOfStrings',
          title: 'Array of strings',
          type: 'array',
          of: [
            {type: 'string'}
          ]
        },

        {
          name: 'priority',
          title: 'Priority',
          type: 'number'
        },
        {
          name: 'checked',
          title: 'Checked',
          type: 'boolean'
        },
        {
          name: 'imageGallery',
          title: 'Image gallery',
          type: 'array',
          options: {
            layout: 'grid',
            sortable: true
          },
          of: [
            {
              title: 'Image',
              type: 'image',
              preview: {
                fields: {
                  imageUrl: 'asset.url',
                  title: 'caption'
                }
              },
              fields: [
                {
                  name: 'caption',
                  type: 'string',
                  title: 'Caption',
                  options: {
                    isHighlighted: true
                  }
                }
              ]
            }
          ]
        },
        {
          name: 'select',
          title: 'Select string',
          type: 'string',
          options: {
            list: [
              {
                title: 'One (1)',
                value: 'one'
              },
              {
                title: 'Two (2)',
                value: 'two'
              },
              {
                title: 'Three (3)',
                value: 'three'
              }
            ]
          }
        },
        {
          name: 'selectObjectOfString',
          title: 'Select string in object',
          description: '',
          type: 'string',
          options: {
            list: ['one', 'two', 'three']
          }
        },
        {
          name: 'radioSelect',
          title: 'Select (layout: radio)',
          type: 'string',
          options: {
            layout: 'radio',
            list: [
              {
                title: 'One (1)',
                value: 'one'
              },
              {
                title: 'Two (2)',
                value: 'two'
              },
              {
                title: 'Three (3)',
                value: 'three'
              }
            ]
          }
        },
        {
          name: 'lead',
          title: 'Lead',
          type: 'text',
          format: 'html',
          required: true
        },
        {
          name: 'email',
          title: 'Email',
          type: 'email'
        },
        {
          name: 'location',
          title: 'Location',
          type: 'geopoint'
        },
        {
          name: 'content',
          title: 'Content tags',
          type: 'array',
          title: 'Content tags',
          of: [
            {
              title: 'String',
              type: 'string'
            }
          ]
        },
        {
          name: 'minimal',
          type: 'array',
          title: 'Blocks',
          editor: 'slate',
          of: [
            {
              title: 'Paragraph',
              type: 'paragraph',
            }
          ]
        },
        {
          name: 'authors',
          title: 'Authors',
          type: 'array',
          of: [
            {
              type: 'author'
            }
          ],
          required: true
        },
        {
          name: 'authorRef',
          title: 'Author reference',
          type: 'reference',
          to: {
            type: 'author'
          },
          required: true
        }
      ]
    },
    {
      name: 'author',
      type: 'object',
      title: 'Author',
      fields: [
        {
          name: 'name',
          title: 'Title',
          type: 'string'
        },
        {
          name: 'awards',
          title: 'Awards',
          type: 'array',
          of: [
            {
              type: 'string'
            }
          ]
        }
      ]
    }
  ]
})
